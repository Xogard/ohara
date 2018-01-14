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

router.get('/:cliente_id', (req,res,next) =>{
  
  getClienteById(req.params.cliente_id)
  .then((result)=>{
    res.status(200) 
    .json({
       status: 'success',
       data: result,
       message: 'Cliente' + req.params.id
    })
  })
  .catch((err)=>{
    return next(err);
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
    });

  }
)};

async function getClienteById( id ){

  return new Promise((resolve,reject)=>{
    try {
      let data = getClienteById( id );
      resolve(data);
    } catch (error) {
      reject(error);
    }  
  });

}

async function getClienteById( id ){

  return new Promise((resolve,reject) =>{
    db.one('select * from t_cliente where t_cliente.cliente_id = $1', [id] )
    .then((data) => {
      resolve(data);
    })
    .catch((err)  => {
      reject(err);
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
