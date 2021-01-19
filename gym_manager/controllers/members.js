const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

//---------------Index

exports.index = function (req, res) {
  return res.render('members/index', { members: data.members });
};

//---------------mostrar
exports.show = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });
  //Verficando se o member foi encontrado
  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember, //colocando tudo que tem dentro do objeto member
    age: age(foundMember.birth),
  };

  return res.render('members/show', { member });
};

exports.create = function (req, res) {
  return res.render('members/create');
};

//---------------Create
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
  const id = Number(data.members.length + 1); // Campo id

  data.members.push({
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

    return res.redirect('/members');
  });
};

//---------------Editar
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function (member) {
    return member.id == id;
  });
  //Verficando se o member foi encontrado
  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth),
    id: Number(req.body.id),
  };

  return res.render('members/edit', { member });
};

//---------------Atualizar
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });
  //Verficando se o member foi encontrado
  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write error!');

    return res.redirect(`/members/${id}`);
  });
};

//---------------Deletar
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function (member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('white file error!');
  });

  return res.redirect('/members');
};
