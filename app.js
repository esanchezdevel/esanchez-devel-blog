const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// configure express to serve files in "public" folder like .css or .js files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { 
        title: 'esanchez devel', 
        description: 'Programador experto en Java con una gran afici&oacute;n por seguir aprendiendo cosas nuevas.'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});