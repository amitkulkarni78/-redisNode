const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
app.use(bodyParser.raw());


const PORT = 3400;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.send("welcome");
});

app.use('/v1', routes);

app.listen(PORT, () => {
    console.log('App listening on port',PORT);
});


