

const initOptions = {/* initialization options */};
const pgp = require('pg-promise')();
var connectionString = 'postgres://localhost:5432/ohara';
var db = pgp(connectionString);


module.exports = db;