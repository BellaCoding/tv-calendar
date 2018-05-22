var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// var logger = function (req, res, next) {
//     console.log('Logging...');
//     next();
// }

// app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const Trakt = require('trakt.tv');

let options = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/auth',
    api_url: null,
    useragent: null,
    pagination: true
};
const trakt = new Trakt(options);

const traktAuthUrl = trakt.get_url();

// store in session in the future
let token = null;

app.get('/', function (req, res) {
    if (token) {
        trakt.import_token(token);

        trakt.calendars.my.shows()
            .then(results => {
                res.send(results)
            })
            .catch(console.error);
    } else {
        res.render('index', {
            login: traktAuthUrl
        });
    }
})

app.get('/auth', (req, res) => {
    trakt.exchange_code(req.query.code, req.query.state)
        .then(results => {
            token = trakt.export_token();

            res.redirect('/');
        })
        .catch(console.error);
});

app.get('/logout', (req, res) => {
    token = null;

    res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
})