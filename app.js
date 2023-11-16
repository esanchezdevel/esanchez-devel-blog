const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'esanchez devel'});
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});