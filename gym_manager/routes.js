const express = require('express');
const routes = express.Router();
const instructors = require('./controllers/instructors');
const members = require('./controllers/members');

//Verbos HTTP
//GET - Receber / RESOURCE
//POST - Criar ou Salvar
//PUT - Atualizar
//DELETE - Deletar

routes.get('/', function (req, res) {
  return res.redirect('/instructors'); //Redirecionar pagina para instrutors
});

routes.get('/instructors', instructors.index);
routes.get('instructors/create', instructors.create);
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

//***********************Rota members*****************************

routes.get('/members', members.index);
routes.get('/members/create', members.create);
//Rota para mostrar members
routes.get('/members/:id', members.show);
//Rota para editar members
routes.get('/members/:id/edit', members.edit);
//Rota para salvar members
routes.post('/members', members.post);
//Rota para atualizar members
routes.put('/members', members.put);
//Rota para deletar members
routes.delete('/members', members.delete);

module.exports = routes;
