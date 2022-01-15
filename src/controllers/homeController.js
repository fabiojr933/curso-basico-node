const Contato = require('../models/ContatoModel');
exports.index = async (req, res) => {
  const contato = new Contato();
  await contato.listar(); 
  res.render('index', {dados: contato.dados});
};
