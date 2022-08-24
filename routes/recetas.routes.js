const express = require('express');
const router = express.Router();

const usuarioscontroller = require('../controllers/recetas/usuarios');
const resetascontroller = require('../controllers/recetas/recetasquerys');

//USUARIOS
router.route('/usuarios').get((request,response) => {
  usuarioscontroller.getUsuarios().then(result => {
  response.json(result[0]);
  });
});

router.route('/getUsuario/:email').get((request,response)=>{
  usuarioscontroller.getUsuario(request.params.email).then(result => {
     response.json(result[0]);
  });
});


// RECETAS getTiposReceta, getProductos, getMetodo,    getCutivos,    getEmpresas,   
router.route('/getTiposReceta').get((request,response) => {
  resetascontroller.getTiposReceta().then(result => {
  response.json(result[0]);
  });
});
router.route('/getProductos').get((request,response) => {
  resetascontroller.getProductos().then(result => {
  response.json(result[0]);
  });
});
router.route('/getMetodo').get((request,response) => {
  resetascontroller.getMetodo().then(result => {
  response.json(result[0]);
  });
});
router.route('/getCutivos').get((request,response) => {
  resetascontroller.getCutivos().then(result => {
  response.json(result[0]);
  });
});
router.route('/getEmpresas').get((request,response) => {
  resetascontroller.getEmpresas().then(result => {
  response.json(result[0]);
  });
});
//RECETAS  getDosis, getSugerencias, getLocalidades, getSectores, 
router.route('/getDosis').get((request,response) => {
  resetascontroller.getDosis().then(result => {
  response.json(result[0]);
  });
});
router.route('/getSugerencias').get((request,response) => {
  resetascontroller.getSugerencias().then(result => {
  response.json(result[0]);
  });
});
router.route('/getLocalidades').get((request,response) => {
  resetascontroller.getSugerencias().then(result => {
  response.json(result[0]);
  });
});
router.route('/getSectores').get((request,response) => {
  resetascontroller.getSugerencias().then(result => {
  response.json(result[0]);
  });
});
// getCC, getRecetas,   getFoliosDetalles 
router.route('/getCC/:cc').get((request,response)=>{
  resetascontroller.getCC(request.params.cc).then(result => {
     response.json(result[0]);
  });
});
//
router.route('/getRecetas').post((request,response)=>{
  let params = {...request.body}
  resetascontroller.getRecetas(params).then(result => {
  response.status(201).json(result);
  });
});


module.exports = router;
