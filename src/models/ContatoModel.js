const database = require('../database/database');
const validator = require('validator');

class Contato{
    constructor(body){
        this.body = body;
        this.erros = [];
        this.sucesso = [];
        this.contato = null;
        this.dados = [];
    }
    async register(){
        this.valida();
        if(this.erros.length > 0){
            return;
        } 
       await database.insert(this.body).table('contato').then(sucesso =>{       
           this.contato = sucesso;  
        }).catch(err => {
            console.log(err);    
        });
    }    
    async listar(){
        await database.select('*').table('contato').then(sucesso => { 
           sucesso.forEach(data => {               
            this.dados.push({'id': data.id, 'nome': data.nome, 'email': data.email, 'endereco': data.endereco});
           });         
        }).catch(err =>{
            console.log(err);
        })
    }
   
    valida(){
        this.cleanUp();
        if(!validator.isEmail(this.body.email)){
            this.erros.push('Email invalido');    
        } 
        if(this.body.nome.length < 3 || this.body.endereco.length > 50){
            this.erros.push('O nome e o endereço deve conter entre 3 a 50 caracteres');
        }
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        var data = new Date();
        this.body = {
            nome: this.body.nome,
            endereco: this.body.endereco,
            email: this.body.email,
            telefone: this.body.telefone,
            data: data.toLocaleDateString()
        };
    }
}

module.exports = Contato;