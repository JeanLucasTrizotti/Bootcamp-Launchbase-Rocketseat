const fs = require('fs');
const data = require('./data.json');
const { age } = require('./utils');

//mostrar
exports.show = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });
  //Verficando se o instructor foi encontrado
  if (!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor, //colocando tudo que tem dentro do objeto instructor
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
      foundInstructor.created_at
    ),
  };

  return res.render('instructors/show', { instructor });
};

//CREATE
exports.post = function (req, res) {
  //req.query
  //req.body
  //Pega todos os campos
  const keys = Object.keys(req.body);

  //estrutura de Validação
  for (key of keys) {
    //req.body.avatar_url
    if (req.body[key] == '') {
      return res.send('Por favor, complete todos os campos!');
    }
  }

  //Pegando informações
  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now(); // Salvando data atual
  const id = Number(data.instructors.length + 1); // Campo id

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Teve um erro na gravação');

    return res.redirect('/instructors');
  });
};

//edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });
  //Verficando se o instructor foi encontrado
  if (!foundInstructor) return res.send('Instructor not found!');

  return res.render('instructors/edit', { instructor: foundInstructor });
};

//UPDATE

//DELETE
