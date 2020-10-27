const
    mongoose   = require('../../lib/database'),
    DateModule = require('../../lib/dateModule'),
    Pagination = require('../../lib/pagination'),
    config     = require('../../config'),
    Order      = require('../../models/OrderModel');


exports.actionIndex = async (req, res) => {

    const
        GET = req.query,
        url = req.originalUrl;

    let
        orders     = [],
        pagination = {},
        flash      = [],
        count      = 0;
        
    count = await Order.countDocuments().exec();

    pagination = new Pagination({
        pageSize   : config.app.pagination.pageSize,
        limit      : config.app.pagination.limit,
        page       : GET.page,
        url        : url,
        count      : count,
        endButton  : true,
        startButton: true,
    });

    orders = await Order.find().
        limit(pagination.limit).
        skip(pagination.skip).
        sort({number: -1}).
        exec();

    for(let i = 0; i < orders.length; i++){
        orders[i].dateView = DateModule.formatViewDate(orders[i].date);
    }

    flash = req.flash('flash')[0];

    res.render('admin/order/index.hbs', {
       layout   : 'layouts/admin',
       orders   : orders,
       flash    : flash == '' ? false : flash,
       countInfo: pagination.getCountInfo(),
       pages    : pagination.getPages(),
       linkCss  : ['/css/admin/search.css', '/css/admin/pages.css', '/css/flash.css', '/css/admin/header.css', '/css/admin/table.css', '/css/admin/order/index.css'],
       csrf     : res.locals._csrfToken,
    });
}


exports.actionViewOrder = async (req, res) => {

    if(!req.xhr){
        res.render('server/error.hbs', {
            layout : null,
            code   : '404',
            message: 'Страница не найдена',
        });
        return;
    }
    
    const
        POST = req.body;

    let
        id    = POST.id,
        order = {};

    if(id == undefined){
        res.status(404).send({message: 'Заказ не найден'});
    }
    
    order = await Order.findById(id);

    if(order == undefined){
        res.status(404).send({message: 'Заказ не найден'});
    }

    order.viewStatus = false;

    await Order.findByIdAndUpdate(id, order);

    res.status(200).send({message: 'Заказ считается просмотренным'});
}


exports.actionDelete = async (req, res) => {

    const
        GET = req.query;

    let
        id    = GET.id,
        order = {};

    if(id == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            code   : '404',
            message: 'Заказ не найден',
        });
        return;
    }
    
    order = await Order.findById(id);

    if(order == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            code   : '404',
            message: 'Заказ не найден',
        });
        return;
    }

    await Order.findByIdAndDelete(id);
    
    req.flash('flash', {class: 'success', status: 'Успешно!', text: `Заказ c id ${order.number} успешно удален.`});
    res.redirect('/admin/orders');

}


exports.actionSearch = async (req, res) => {
        
    if(!req.xhr){
        res.render('server/error.hbs', {
            layout : null,
            code   : '404',
            message: 'Страница не найдена',
        });
        return;
    }

    const
        POST = req.body;
        
    let
        searchData = POST.searchData,
        orders     = [];

    if(searchData == undefined){
        res.status(404).send({message: 'Некоректные данные'});
    }

    if(isNaN(Number(searchData))){
        searchObj = {
            $or: [
                {bundle          : {$regex: searchData}},
                {'name.lastName' : {$regex: searchData}},
                {'name.firstName': {$regex: searchData}},
                {'name.firstName': {$regex: searchData}},
                {phone           : {$regex: searchData}},
            ],
        }
    }else{
        //number data
        searchObj = {number: {searchData}}
    }

    orders = await Order.find(searchObj).lean().exec();

    for(let i = 0; i < orders.length; i++){
        orders[i].dateView = DateModule.formatViewDate(orders[i].date);
    }

    res.status(200).send({data: orders});
}


exports.actionGetNewOrders = async (req, res, next) => {

    let
        countOrder = [];

    countOrder = await Order.countDocuments({viewStatus: true}).exec();

    res.locals.countNewOrders = countOrder ? countOrder : false;    
    next();
}