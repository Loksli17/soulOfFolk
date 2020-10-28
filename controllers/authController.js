const
    crypto = require('crypto'), 
    User   = require('../models/UserModel');


exports.actionLocalsControl = (req, res, next) => {
    res.locals._csrfToken = req.csrfToken();
    res.locals.user       = req.session.userIdentity;
    next();
}


exports.actionLogin = async (req, res) => {

    if(req.session.userIdentity != undefined){
        res.redirect('/admin/comments');
    }

    const
        POST = req.body;
       
    let
        userForm = POST.user,
        dbUser   = {};

    if(userForm == undefined){
        res.render('admin/login', {
            csrf: res.locals._csrfToken, 
        });
        return;
    }

    dbUser = await User.findOne({login: userForm.login}).exec();

    if(dbUser == undefined){
        res.render('admin/login', {
            csrf: res.locals._csrfToken,
            err : 'Неверное имя или пароль',
            user: userForm,
        });
        return;
    }

    if(crypto.createHash('sha256', '~1;3JklN,<az09T').update(userForm.password).digest('hex') == dbUser.password){
        req.flash('flash', {class: 'success', status: 'Успешно!', text: `Привествуем в панели администрации!`});
        req.session.userIdentity = userForm;
        res.redirect('/admin/comments');
    }else{
        res.render('admin/login', {
            csrf: res.locals._csrfToken,
            err : 'Неверное имя или пароль',
            user: userForm,
        });
        return;
    }
    
}
