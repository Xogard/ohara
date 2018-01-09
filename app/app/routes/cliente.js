var express = require('express');
var router = express.Router();
var db     = require('../db/postgres')
var clienteModel = require('../model/cliente')

/* GET users listing. */
router.get('/', function(req, res, next) {
    getAllClientes(req, res, next);

//  res.send('Cliente OK');
});

router.post('/', function(req, res, next) {
  createCliente(req, res, next);

//  res.send('Cliente OK');
});



function getAllClientes(req,res,next){
  db.any('select * from t_cliente')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL clientes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function createCliente(req, res, next){
  let cliente;
  cliente = new clienteModel(req.body);
  console.log('Log ' + req.body.nome );
  db.oneOrNone('insert into t_cliente(nome, endereco_id)' +
    'values(${nome}, ${endereco_id})',
    req.body)
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
