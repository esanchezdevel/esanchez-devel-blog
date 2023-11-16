const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();
const siteConfigurationService = require('./site-configuration-service');

const port = 4200;

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// configure express to serve files in "public" folder like .css or .js files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {

    try {
        const siteConfiguration = await siteConfigurationService.getSiteConfiguration();
        res.render('index', {
            siteConfiguration: siteConfiguration
        });
    } catch (error) {
        console.error('Error rendering the view:', error);
        res.status(500).send('Internal Server Error');
    }

    res.render('index', { 
        title: 'Aprende con esanchez', 
        description: 'Programador experto en Java con una gran afici&oacute;n por seguir aprendiendo cosas nuevas.',
        footer: 'esanchezdevel.com &copy;2023<br>Creada por Enrique S&aacute;nchez'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});