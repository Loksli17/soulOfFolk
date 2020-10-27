const
    express    = require('express'),
    fileUpload = require('express-fileupload'),
    session    = require('express-session'),
    cookie     = require('cookie-parser'),
    hbs        = require('hbs'),
    bodyParser = require('body-parser'),
    flash      = require('connect-flash'),
    csurf      = require('csurf');

const
    config = require('./config');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookie());
app.use(csurf({cookie: true}));
app.use(flash());
app.use(fileUpload({
    createParentPath: true,
}));

app.use(session({
    secret : config.secret.session,
    resave : true,
    rolling: true,
    cookie : {
        maxAge: 60 * 1000,
    }
}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('style', (arr) => {
    let str = ``;
    if(arr == undefined) return str;
    for(let i = 0; i < arr.length; i++){
        str += `<link rel="stylesheet" href="${arr[i]}"/>`
    }
    return str;
});
hbs.registerHelper('title', (title) => {
    return title;
});

// app.use(require('./controllers/authController').actionAuthControl);

//locals
app.use(require('./controllers/authController').actionLocalsControl);
app.use(require('./controllers/admin/orderController').actionGetNewOrders);

app.use('/', require('./routers/indexRouter'));

app.use('/admin/orders',   require('./routers/admin/orderRouter'));
app.use('/admin/comments', require('./routers/admin/commentRouter'));

app.use((req, res) => {
    res.status(404);
    res.render('server/error', {
        layout : null,
        err    : 404,
        message: 'Страница не найдена'
    });
});

app.use((err, req, res) => {
    console.log(err);
    res.status(500);
    res.render('server/error', {
        layout : null,
        err    : 500,
        message: 'Внутреняя ошибка сервера',
    });
});

app.set('port', process.env.PORT || config.app.port);

app.listen(app.get('port') || 3000, () => {
    console.log(`SOF is working on port ${config.app.port}.`);
});