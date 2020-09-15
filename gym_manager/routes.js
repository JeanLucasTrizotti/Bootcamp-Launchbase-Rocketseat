const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');

routes.get('/', function (req, res) {
  return res.redirect('/instructors'); //Redirecionar pagina para instrutors
});

routes.get('/instructors', function (req, res) {
  return res.render('instructors/index');
});

routes.get('/instructors/create', function (req, res) {
  return res.render('instructors/create');
});
//Rota para mostrar instructor
routes.get('/instructors/:id', instructors.show);

//Rota para editar instructor
routes.get('/instructors/:id/edit', instructors.edit);

//Rota para salvar instrutor
routes.post('/instructors', instructors.post);

routes.get('/members', function (req, res) {
  return res.send('members');
});

module.exports = routes;
