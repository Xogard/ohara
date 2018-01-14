class Cliente{

    

    _setValues(req){
        Object.entries(req).forEach(
            ([key, value]) =>{
                if(key === "dt_nascimento"){
                    this[key] = new Date( Date.now( ) ).toISOString();
                }
                else{
                    this[key] = value;
                }
            }  );
    }
    constructor(req){
        this.nome			    = "";
        this.dt_nascimento	    = new Date( Date.now( ) ).toISOString();
        this.cpf		            = "";		
        this.rg				    = "";
        this.orgao_Exp		    = "";
        this.endereco_id         = "";		
        this.email			    = "";
        this.telefone		    = "";
        this.celular		        = "";

        this._setValues(req);
    }

    getAttribures(){
        return this;
    }

    _getTable(){
        return "t_cliente";
    }


    getDbInsertQuery( ){

        let str;
        let fields = "";
        let values = "";

        str = "INSERT INTO " + this._getTable() + "(";
        
        Object.entries(this).forEach(
            ([key, value]) => {
                if(fields===""){
                    fields =  key; 
                    values = "${" + key + "}";
                }  
                else{
                    fields = fields   + ", " + key;
                    values = values + ", " + "${" + key + "}";
                }
            });
            
            fields = fields + ")";
            values = values + ")";
            
        str = str + fields + ' VALUES(' + values;
        return str;
    }

}

module.exports = Cliente;