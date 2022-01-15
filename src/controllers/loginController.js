const Login = require('../models/LoginModel');

exports.index = (req, res) => {   
    res.render('login');
}
exports.register = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
              return res.redirect('back');
            });
            return;
        }
        req.flash('sucesso', 'Usuario criado com sucesso');
        req.session.save(function () {
          return res.redirect('back');
        });
    } catch (error) {
        console.log(error);
    }
}

exports.entrar = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.entrar();

        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
              return res.redirect('back');
            });
            return;
        }
        req.flash('sucesso', 'Usuario logado com sucesso');
        req.session.user = login.user;       
        req.session.save(function () {
          return res.redirect('/');
        });
    } catch (error) {
        console.log(error);
    }
}
exports.sair = async function (req, res) {
    req.session.destroy();
    res.redirect('/login');
}