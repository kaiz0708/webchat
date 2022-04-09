const express = require('express');
const app = express();
require('dotenv').config('./.env');
const create = require('express-handlebars');
const passport = require('passport');
const authenticate = require('./nodemake/passport');
app.use(require('cookie-parser')());
const session = require('express-session');
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
const flash    = require('connect-flash');
app.use(flash());
const gethomePage = require("./web/web");
const getAPIs = require('./web/api');
const formidable = require('formidable')
const connection =  require('./configs/connectingDB');
const bodyParser = require('body-parser');
const hbs = create.create({
    helpers: {
        sayHello: function () { alert("Hello World") },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        }
    },
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
gethomePage(app,passport);
authenticate(passport);
getAPIs(app);
app.listen(process.env.PORT);