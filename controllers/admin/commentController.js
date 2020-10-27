const
    mongoose   = require('../../lib/database'),
    DateModule = require('../../lib/dateModule'),
    Pagination = require('../../lib/pagination'),
    config     = require('../../config'),
    fs         = require('fs'),
    Comment    = require('../../models/CommentModel');


exports.actionIndex = async (req, res) => {

    const
        GET = req.query,
        url = req.originalUrl;

    let
        comments   = [],
        pagination = {},
        flash      = [],
        count      = 0;

    count = await Comment.countDocuments().exec();

    pagination = new Pagination({
        pageSize   : config.app.pagination.pageSize,
        limit      : config.app.pagination.limit,
        page       : GET.page,
        url        : url,
        count      : count,
        endButton  : true,
        startButton: true,
        prev       : {content: '&larr;', class: 'step-a'},
        next       : {content: '&rarr;', class: 'step-a'},
    });

    comments = await Comment.find().
        limit(pagination.limit).
        skip(pagination.skip).
        sort({number: -1}).
        lean().
        exec();

    for(let i = 0; i < comments.length; i++){
        comments[i].text     = `${comments[i].text.slice(0, 30)}...`;
        comments[i].type     = comments[i].type == 'eng' ? 'Английский' : 'Русский';
        comments[i].isActive = comments[i].isActive ? 'Да' : 'Нет'; 
    }

    flash = req.flash('flash')[0];

    res.render('admin/comment/index.hbs', {
       layout   : 'layouts/admin',
       comments : comments,
       flash    : flash == '' ? false : flash,
       countInfo: pagination.getCountInfo(),
       pages    : pagination.getPages(),
       linkCss  : ['/css/admin/search.css', '/css/admin/pages.css', '/css/flash.css', '/css/admin/header.css', '/css/admin/table.css'],
       csrf     : res.locals._csrfToken,
    });
}


exports.actionDelete = async (req, res) => {

    const
        GET = req.query;

    let
        id      = GET.id,
        comment = {};

    if(id == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            err   : '404',
            message: 'Отзыв не найден',
        });
        return;
    }
    
    comment = await Comment.findById(id);

    if(comment == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            err    
            : '404',
            message: 'Заказ не найден',
        });
        return;
    }

    await Comment.findByIdAndDelete(comment._id);
    if(fs.existsSync(`public/img/comments/${comment.img}`)) fs.unlinkSync(`public/img/comments/${comment.img}`);

    req.flash('flash', {class: 'success', status: 'Успешно!', text: `Отзыв c id ${comment.number} успешно удален.`});
    res.redirect('/admin/comments');
    
}


exports.actionCreate = async (req, res) => {
    
    const
        POST = req.body;

    let
        commentForm  = {},
        lastCommment = await Comment.findOne().limit(1).sort({number: -1}).exec(),
        comment      = {};

    if(POST.comment == undefined){
        res.render('admin/comment/create', {
            layout : 'layouts/admin',
            comment: comment,
            title  : 'Панель администрации: Редактирование комментария',
            linkCss: ['/css/admin/form.css', '/css/admin/header.css'],
            csrf   : res.locals._csrfToken,
            submitValue: 'Редактировать отзыв',

        });
        return;
    }

    commentForm = POST.comment;

    comment = new Comment({
        name: {
            firstName : commentForm.firstName,
            lastName  : commentForm.lastName,
        },
        img     : 'default-customer.jpg',
        bundle  : commentForm.bundle,
        number  : lastCommment.number + 1,
        type    : commentForm.type,
        isActive: commentForm.isActive == undefined ? false : true,
        text    : commentForm.text,
    });

    try{
        await comment.save({runValidators: true});
        req.flash('flash', {class: 'success', status: 'Успешно!', text: `Отзыв c id ${comment.number} успешно создан.`});
        res.redirect('/admin/comments');
    }catch(error){
        //обработать ошибки
        req.flash('flash', {class: 'fail', status: 'Ошибка!', text: `Отзыв c id ${comment.number} не был удален.`});
        res.render('admin/comment/create', {
            layout : 'layouts/admin',
            comment: comment,
            title  : 'Панель администрации: Редактирование комментария',
            linkCss: ['/css/admin/form.css', '/css/admin/header.css'],
            csrf   : res.locals._csrfToken,
            submitValue: 'Добавить отзыв',
        });
    }
}


exports.actionEdit = async (req, res) => {

    const
        POST = req.body, 
        GET  = req.query;

    let
        commentForm = {},
        id          = GET.id,
        comment     = {};

    if(id == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            err   : '404',
            message: 'Отзыв не найден',
        });
        return;
    }
    
    try {
        comment = await Comment.findById(id).exec();
    }catch(err) {
        res.status(404).render('server/error.hbs', {
            layout : null,
            err    : '404',
            message: 'Заказ не найден',
        });
        return;
    }
    
    comment.typeEng = comment.type == 'eng' ? true : false;

    if(POST.comment == undefined){
        res.render('admin/comment/edit', {
            layout : 'layouts/admin',
            comment: comment,
            title  : 'Панель администрации: Редактирование комментария',
            linkCss: ['/css/admin/form.css', '/css/admin/header.css'],
            csrf   : res.locals._csrfToken,
            submitValue: 'Редактировать отзыв',

        });
        return;
    }

    commentForm = POST.comment;

    comment.text           = commentForm.text;
    comment.name.lastName  = commentForm.lastName;
    comment.name.firstName = commentForm.firstName;
    comment.isActive       = commentForm.isActive == undefined ? false : true;
    comment.type           = commentForm.type;
    comment.bundle         = commentForm.bundle;

    try{
        await Comment.findByIdAndUpdate(comment._id, comment, {runValidators: true});
        req.flash('flash', {class: 'success', status: 'Успешно!', text: `Отзыв c id ${comment.number} успешно изменен.`});
        res.redirect('/admin/comments');
    }catch(error){
        //обработать ошибки
        req.flash('flash', {class: 'fail', status: 'Успешно!', text: `Отзыв c id ${comment.number} не был изменен.`});
        console.log(error);
        res.render('admin/comment/edit', {
            layout : 'layouts/admin',
            comment: comment,
            title  : 'Панель администрации: Редактирование комментария',
            linkCss: ['/css/admin/form.css', '/css/admin/header.css'],
            csrf   : res.locals._csrfToken,
            submitValue: 'Редактировать отзыв',

        });
    }
}


exports.actionView = async (req, res) => {

    const
        GET = req.query;

    let
        id      = GET.id,
        comment = {};

    if(id == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            err    : '404',
            message: 'Отзыв не найден',
        });
        return;
    }

    try{
        comment = await Comment.findById(id).lean().exec();
    }catch(err){
        comment = undefined;
    }

    if(comment == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            err    : '404',
            message: 'Заказ не найден',
        });
        return;
    }

    comment.isActive = comment.isActive      ? 'Да' : 'Нет';
    comment.type     = comment.type == 'eng' ? 'Английский' : 'Русский';

    res.render('admin/comment/view.hbs', {
       layout   : 'layouts/admin',
       comment  : comment,
       linkCss  : ['/css/admin/order/index.css', '/css/admin/header.css', '/css/admin/comments/view.css'],
    });
}


exports.actionSearch = async (req, res) => {
    
    if(!req.xhr){
        res.render('server/error.hbs', {
            layout : null,
            err    : '404',
            message: 'Страница не найдена',
        });
        return;
    }

    const
        POST = req.body;
        
    let
        searchData = POST.searchData,
        comments   = [];

    if(searchData == undefined){
        res.status(404).send({message: 'Некоректные данные'});
    }

    if(isNaN(Number(searchData))){
        //string data
        if(searchData == 'Да'){
            searchObj = {isActive: true};
        }else if(searchData == 'Нет'){
            searchObj = {isActive: false};
        }else{
            searchObj = {
                $or: [
                    {text            : {$regex: searchData}},
                    {bundle          : {$regex: searchData}},
                    {'name.lastName' : {$regex: searchData}},
                    {'name.firstName': {$regex: searchData}},
                    {type            : {$regex: searchData}},
                ],
            }
        }

    }else{
        //number data
        searchObj = {number: {searchData}}
    }

    comments = await Comment.find(searchObj).lean().exec();

    for(let i = 0; i < comments.length; i++){
        comments[i].text     = `${comments[i].text.slice(0, 30)}...`;
        comments[i].type     = comments[i].type == 'eng' ? 'Английский' : 'Русский';
        comments[i].isActive = comments[i].isActive ? 'Да' : 'Нет'; 
    }

    res.status(200).send({data: comments});

}