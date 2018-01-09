class Cliente{

    constructor(req){
        this.nome			 = req.nome;
        this.dt_nascimento	 = req.dt_nascimento;
        this.cpf		     = req.cpf;		
        this.rg				 = req.rg;
        this.orgao_Exp		 = req.orgao_Exp;
        this.endereco_id     = req.endereco_id;		
        this.email			 = req.email;
        this.telefone		 = req.telefone;
        this.celular		 = req.celular;
    }

    get_nome( ){
        return this.nome;
    }

    get_dt_nascimento( ){
        return this.dt_nascimento;
    }

}

module.exports = Cliente;