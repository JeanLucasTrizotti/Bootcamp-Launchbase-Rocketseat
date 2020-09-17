const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');

//Verbos HTTP
//GET - Receber / RESOURCE
//POST - Criar ou Salvar
//PUT - Atualizar
//DELETE - Deletar

routes.get('/', function (req, res) {
  return res.redirect('/instructors'); //Redirecionar pagina para instrutors
});

routes.get('/instructors', instructors.index);

routes.get('/instructors/create', function (req, res) {
  return res.render('instructors/create');
});
//Rota para mostrar instructor
routes.get('/instructors/:id', instructors.show);

//Rota para editar instructor
routes.get('/instructors/:id/edit', instructors.edit);

//Rota para salvar instrutor
routes.post('/instructors', instructors.post);

//Rota para atualizar instructor
routes.put('/instructors', instructors.put);

//Rota para deletar instructor
routes.delete('/instructors', instructors.delete);

routes.get('/members', function (req, res) {
  return res.send('members');
});

module.exports = routes;
