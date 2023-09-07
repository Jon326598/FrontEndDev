

class Membro {
    constructor(obj){
        obj = obj || {};

        this.id = obj.id;
        this.nome = obj.nome;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.email = obj.email;
        this.telefone = obj.telefone;
        // this.sexo = obj.sexo;
        // this.dataNasc = obj.dataNasc;
        // this.dataCadastro = obj.dataCadastro;
    
    }
}