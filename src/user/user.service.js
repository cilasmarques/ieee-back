const response = require('../../util/responses');
const User = require('./user.model');

const userService = (function () {
  const _saveUser = async function (user, callback) {
    try {
      const newUser = await User.create(user);

      return callback(response.ok(`Usuário ${newUser.name} criado com sucesso.`));

    } catch (err) {
      return callback(response.badRequest(err.message));
    }
  };

  const _getUserByEmail = async function (userEmail, callback) {
    try {
      const user = await User.find({ email : userEmail });

      if (user)
        return callback(response.ok('', user));

      else 
        return callback(response.notFound('Não foi possível encontrar usuário.'));

    } catch (err) {
      return callback(response.badRequest('Erro ao encontrar usuário.'));
    }
  };

  const _getAllUsers = async function (callback) {
    try {
      User.find({}, function (err, users) {
        if (err) 
          return callback(response.notFound('Não foi possível recuperar usuários.'));
        else 
          return callback(response.ok("", users));
      });

    } catch (err) {
      return callback(response.badRequest('Erro ao retornar usuários.'));
    }
  };

  const _updateUser = async function (userEmail, updatedInfo, callback) {
    try {      
      const user = await User.findOneAndUpdate({email: userEmail}, updatedInfo, err => {
        if (err) 
          return callback(response.badRequest('Não foi possível atualizar o usuário.'));
      });

      if (!user)
        return callback(response.notFound('Usuário não encontrado.'));

      return callback(response.ok('', user));

    } catch (err) {
      return callback(response.badRequest('Erro na atualização.'));
    }
  }

  const _removeUser = async function (userEmail, callback) {
    try {
      const user = await User.findOneAndDelete({email: userEmail});

      if (!user)
        return callback(response.notFound('Não foi possível encontrar usuário.'));

      return callback(response.ok('Usuário removido.'));

    } catch (err) {
      return callback (response.notFound('Remoção do usuário mal sucedida.'));
    }
  };

  return {
    saveUser: _saveUser,
    getUserByEmail: _getUserByEmail,
    getAllUsers: _getAllUsers,
    updateUser: _updateUser,
    removeUser: _removeUser,
  }
})();

module.exports = userService;