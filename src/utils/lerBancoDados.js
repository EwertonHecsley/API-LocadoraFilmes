const fs = require('fs/promises');

const lerBancoDeDados = async (caminho) => {
    const texto = (await fs.readFile(caminho)).toString();
    return texto;
};


module.exports = { lerBancoDeDados };

