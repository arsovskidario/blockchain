const express = require('express');
const https = require('https');
const routes = require('./routes');

const app = express();

app.use(routes);

app.get('/', function (req, res) {
    res.send('Opa')
});

app.listen(5000, () => console.log('App is running on port 5000'));

