const express = require('express');
const { listarFilmes, listaFilmeId, cadastrarfilme, atualizarFilme, deletarFilme } = require('../controllers/controladores');
const rota = express.Router();

rota.get('/movies', listarFilmes);
rota.get('/movies/:id', listaFilmeId);
rota.post('/movies', cadastrarfilme);
rota.put('/movies/:id', atualizarFilme);
rota.delete('/movies/:id', deletarFilme);


module.exports = rota;