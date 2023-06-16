const fs = require('fs/promises');
const { lerBancoDeDados } = require('../utils/lerBancoDados');

const caminhoArquivo = 'src/movies.json';

const listarFilmes = async (_req, res) => {
    const stringFilmes = await lerBancoDeDados(caminhoArquivo);
    const objFilmes = JSON.parse(stringFilmes);

    return res.status(200).json(objFilmes);
};

const listaFilmeId = async (req, res) => {
    const { id } = req.params;

    const stringFilmes = await lerBancoDeDados(caminhoArquivo);

    const objFilmes = JSON.parse(stringFilmes);

    const arrFilmes = Object.values(objFilmes);

    const filmeFiltrado = arrFilmes.find((filme) => Number(filme.id) === Number(id));

    return res.status(200).json(filmeFiltrado);
};

const cadastrarfilme = async (req, res) => {
    const corpo = req.body;
    const stringFilmes = await lerBancoDeDados(caminhoArquivo);
    const objFilmes = JSON.parse(stringFilmes);

    console.log(objFilmes)

    const ultimoFilme = objFilmes.length;

    const novoFilme = {
        id: ultimoFilme + 1,
        ...corpo
    };

    objFilmes.push(novoFilme)

    const objFilmesString = JSON.stringify(objFilmes);

    fs.writeFile(caminhoArquivo, objFilmesString);

    return res.status(201).json({ mensagem: 'Filme adicionado' });
};

const atualizarFilme = async (req, res) => {
    const { id } = req.params;
    const { movie, price } = req.body;
    const stringFilmes = await lerBancoDeDados(caminhoArquivo);
    const objFilmes = JSON.parse(stringFilmes);

    const filmeFiltrado = objFilmes.find((filme) => Number(filme.id) === Number(id));

    filmeFiltrado.movie = movie;
    filmeFiltrado.price = Number(price);

    const objFilmesString = JSON.stringify(objFilmes);

    fs.writeFile(caminhoArquivo, objFilmesString);

    return res.status(200).json({ mensagem: 'Filme atualizado com sucesso!' });
};

const deletarFilme = async (req, res) => {
    const { id } = req.params;
    const stringFilmes = await lerBancoDeDados(caminhoArquivo);
    const objFilmes = JSON.parse(stringFilmes);

    const filmeFiltrado = objFilmes.find((filme) => Number(filme.id) === Number(id));
    const index = objFilmes.indexOf(filmeFiltrado);

    objFilmes.splice(index, 1);

    const objFilmesString = JSON.stringify(objFilmes);
    fs.writeFile(caminhoArquivo, objFilmesString);

    return res.status(200).json({ mensagem: 'Filme deletado com sucesso!' });

};

module.exports = { listarFilmes, listaFilmeId, cadastrarfilme, atualizarFilme, deletarFilme };