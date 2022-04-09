const { PORT } = require("./link/math.js");
const express = require('express');
const gethomePage = require("./web/web");
const getAPIs = require("./web/api");
const fs = require("fs");
const bodyParser = require('body-parser');
// const path = require('path');
const create = require('express-handlebars');
const { nextTick } = require("process")
const app = express();
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

gethomePage(app);
getAPIs(app);

app.listen(PORT); 



// app.set('views' , path.join(__dirname , '.....'));

