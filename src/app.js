const express = require('express');
const rota = require('./routers/router');
const app = express();

app.use(express.json());

app.use('/', rota);


module.exports = app;

