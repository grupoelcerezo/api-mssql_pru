
var Usuarios = require('./usuario');
const dboperations = require('./dboperatios');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { request, response } = require('express');
var app = express();
//var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
//app.use('/api', router);

//Middlewares
app.use((request,reponse,next) => {
  reponse.header('Access-Control-Allow-Origin', '*');
  reponse.header('Access-Control-Allow-Headers', 'autorizacion, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  reponse.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  reponse.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  console.log('middleware');
  next();
});


//Base Routes
const recetas_route = require('./routes/recetas.routes');

//Routes
app.use('/api',recetas_route);


var port = process.env.PORT || 3501;
app.listen(port);
console.log(' La app esta corriendo en el puerto ' + port);



