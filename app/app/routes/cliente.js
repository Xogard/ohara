var express = require('express');
var router = express.Router();
var db     = require('../db/postgres')
var clienteModel = require('../model/cliente')

/* GET users listing. */
router.get('/', function(req, res, next) {
  getAllClientes(req, res, next);
});

router.get('/:cliente_id', (req,res,next) =>{
  
  try {
    let result = getClienteById(req.params.cliente_id);
    res.status(200) 
    .json({
       status: 'success',
       data:    result,
       message: 'Cliente' + req.params.id
    })
  } catch (error) {
    return next(err);
  }

});

router.post('/', function(req, res, next) {
  createCliente(req, res, next);
});

router.put('/:cliente_id',(req,res,next) =>{
  updateCliente(req,res,next);
});

async function getAllClientes(req, res, next){
  let result;
  try {
    result = await getAllClientesDB( );
    res.status(200) 
    .json({
       status: 'success',
       data: result,
       message: 'All clientes'
    })  

  } catch (error) {
    next(error);
  }

}

async function getAllClientesDB( ){

  return new Promise((resolve,reject) =>{

    try {
      let data = db.any('select * from t_cliente');
      resolve(data);  
    } catch (error) {
      reject(error);
    }
    });
  };

async function getClienteById( id ){

  return new Promise((resolve,reject)=>{
    try {
      let data = getClienteByIdDB( id );
      resolve(data);
    } catch (error) {
      reject(error);
    }  
  });

}

async function getClienteByIdDB( id ){

  return new Promise((resolve,reject) =>{
  try {
    let result = db.one('select * from t_cliente where' +
                      + ' t_cliente.cliente_id = $1', [id] );
    resolve(result);
    } catch (error) {
      reject(error);
    }
  }
)};

function createCliente(req, res, next){
  let cliente;
  cliente = new clienteModel(req.body);
  db.oneOrNone( cliente.getDbInsertQuery( ),
  cliente.getAttributes())
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

async function updateCliente(req,res,next){

  
  try {
    let result;
    let cliente = new clienteModel(req.body);
    db.none('')

    res.status(200)
    .json({status: 'sucess',
           message: 'Client updated'})
    
  } catch (error) {
    next(error);  
  }


}

module.exports = router;
