const database = require('../database/database');
const validator = require('validator');
const bcryptjs  = require('bcryptjs');

class Login{
    constructor(body){
        this.body = body;
        this.erros = [];
        this.sucesso = [];
        this.user = null;
    }
    async register(){
        this.valida();
        if(this.erros.length > 0){
            return;
        }  
        await this.userExiste();
        if(this.erros.length > 0) {
            return;
        };       
        if(this.erros.length > 0) {
            console.log('mais de 1')
            return
        };           
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);     
        database.insert(this.body).table('login').then(sucesso =>{         
        }).catch(err => {
            console.log(err);    
        });
    }
    async entrar(){
        this.valida();
        if(this.erros.length > 0) return;
        await database.select(['login', 'senha']).table('login').where({login: this.body.login}).then(sucesso => {
            this.user = sucesso[0].login;          
            if(!sucesso[0].login){              
                this.erros.push('Usuario ja existe!');   
                return;            
            }  
            if(!bcryptjs.compareSync(this.body.senha, sucesso[0].senha)){              
                this.erros.push('senha invalida!');   
                this.user = null;
                return;            
            }
                    
        }).catch(err => {
            console.log(err);
        })
    }
    async userExiste(){
     await database.select(['login']).table('login').where({login: this.body.login}).then(sucesso => {          
            if(sucesso[0].login){              
                this.erros.push('Usuario ja existe!');               
            }           
        }).catch(err => {
            console.log(err);
        })
    }

    valida(){
        this.cleanUp();      
        if(!validator.isEmail(this.body.login)){
            this.erros.push('Email invalido');    
        } 
        if(this.body.senha.length < 3 || this.body.senha.length > 50){
            this.erros.push('A senha deve conter entre 3 a 50 caracteres');
        }
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            login: this.body.login,
            senha: this.body.senha
        };
    }
}
module.exports = Login;