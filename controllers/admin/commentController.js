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
    });

    comments = await Comment.find().
        limit(pagination.limit).
        skip(pagination.skip).
        sort({number: -1}).
        exec();

    for(let i = 0; i < comments.length; i++){
        comments[i].text = `${comments[i].text.slice(0, 30)}...`;
        comments[i].type = comments.type == 'eng' ? 'Английский' : 'Русский';
    }

    flash = req.flash('flash')[0];

    res.render('admin/comment/index.hbs', {
       layout   : 'layouts/admin',
       comments : comments,
       flash    : flash == '' ? false : JSON.stringify(flash),
       countInfo: pagination.getCountInfo(),
       pages    : pagination.getPages(),
       linkCss  : ['/css/admin/comment/index.css'],
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
            code   : '404',
            message: 'Отзыв не найден',
        });
        return;
    }
    
    comment = await Comment.findById(id);

    if(comment == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            code   : '404',
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
            code   : '404',
            message: 'Отзыв не найден',
        });
        return;
    }
    
    comment = await Comment.findById(id);

    if(comment == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            code   : '404',
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
            linkCss: ['/css/admin/form.css'],
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
        console.log(error);
        res.render('admin/comment/edit', {
            layout : 'layouts/admin',
            comment: comment,
            title  : 'Панель администрации: Редактирование комментария',
            linkCss: ['/css/admin/form.css'],
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
            code   : '404',
            message: 'Отзыв не найден',
        });
        return;
    }
    
    comment = await Comment.findById(id);

    if(comment == undefined){
        res.status(404).render('server/error.hbs', {
            layout : null,
            code   : '404',
            message: 'Заказ не найден',
        });
        return;
    }

    comment.isActive = comment.isActive      ? 'Да' : 'Нет';
    comment.type     = comment.type == 'eng' ? 'Английский' : 'Русский';

    res.render('admin/comment/view.hbs', {
       layout   : 'layouts/admin',
       comment  : comment,
       linkCss  : ['/css/admin/order/index.css'],
    });
}


exports.actionSearch = async (req, res) => {
    
}