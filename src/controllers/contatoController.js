const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {   
    res.render('contato');
}
exports.register = async (req, res) => {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.erros.length > 0) {
        req.flash('erros', contato.erros);
        req.session.save(() => res.redirect('back'));
        return;
    }
    req.flash('sucesso', 'Contato cadastrado com sucesso');
    req.session.save(() => res.redirect('/'));
    return;
}