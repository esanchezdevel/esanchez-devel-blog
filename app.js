const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes');

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// configure express to serve files in "public" folder like .css or .js files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
    secret: config.adminCookieSecret, 
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 24* 60 * 60 * 1000 // The admin session expires in one day
    }
}));

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});