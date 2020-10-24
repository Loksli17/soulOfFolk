const
    express    = require('express'),
    fileUpload = require('express-fileupload'),
    session    = require('express-session'),
    cookie     = require('cookie-parser'),
    hbs        = require('hbs'),
    helmet     = require('helmet'),
    bodyParser = require('body-parser'),
    flash      = require('connect-flash'),
    csurf      = require('csurf');

const
    config = require('./config');