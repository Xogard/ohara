var express = require('express');
var router = express.Router();
var db     = require('../db/postgres')
var clienteModel = require('../model/cliente')

/* GET users listing. */
router.get('/', function(req, res, next) {
   
  getAllClientes( )
  .then((result) => {
    res.status(200) 
    .json({
       status: 'success',
       data: result,
       message: 'All clientes'
    })
  })
  .catch((error) => {
    return next(error);
  });

});

router.post('/', function(req, res, next) {
  createCliente(req, res, next);

//  res.send('Cliente OK');
});

async function getAllClientes( ){

  
  return new Promise((resolve,reject)=>{
    try {
      var data = getAllClientesDB( );
      resolve(data);
    } catch (error) {
      reject(error);
    }  
  });

}


async function getAllClientesDB( ){

  return new Promise((resolve,reject) =>{
    db.any('select * from t_cliente')
    .then((data) => {
      resolve(data);
    })
    .catch((err)  => {
      reject(err);
      //return next(err);
    });

  }
)};

function createCliente(req, res, next){
  let cliente;
  cliente = new clienteModel(req.body);
  db.oneOrNone( cliente.getDbInsertQuery( ),
  cliente.getAttribures())
   .then(() => {
       console.log('Dados inseridos');
       res.status(200)
       .json({
          status: 'success',
          message: 'Insert cliente'
       })
   })
   .catch((err) =>{
       console.log('Erro: ' + err);
       return next(err)
   })


}


module.exports = router;
