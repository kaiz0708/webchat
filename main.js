const express = require('express');
const app = express();
const create = require('express-handlebars');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const passport = require('passport');
const session = require('express-session')
const gethomepage = require('./web/web');
const socketchat = require('./socket/socket');
const APIuser = require('./web/APIuser');
app.use(require('cookie-parser')());
const authenticate = require('./authenticate/passport_tradition');
const Authenticatefacebook = require('./authenticate/passport_facebook');
const Authenticategoogle = require('./authenticate/passport_google');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));
require('dotenv').config();
app.use(session({
    secret: 'kyanh0708',
    resave: false,
    saveUninitialized: true,
    cookie:{originalMaxAge: 4000000000}
}))
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
app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
gethomepage(app , passport);
APIuser(app);
authenticate(passport);
Authenticatefacebook(passport);
Authenticategoogle(passport);
socketchat(io);
server.listen(process.env.PORT);