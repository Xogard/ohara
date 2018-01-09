
let pgp;
let connectionString;
let db;

pgp = require('pg-promise');
connectionString = 'postgres://localhost:5432/puppies';
db = pgp(connectionString);

// add query functions

module.exports = {

};


function getAllContratos(req, res, next){
    //db.a


}