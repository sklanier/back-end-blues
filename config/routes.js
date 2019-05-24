const axios = require('axios');
const Users = require('../users/user-model.js');
const bcrypt = require('bcryptjs');

const { authenticate, makeToken } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.put('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  //take in user data, hash pw, save to database
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash
  Users.add(newUser)
    .then(user => {
      const token = makeToken(user);
      res.status(201).json({user, token});
    })
    .catch(err => res.status(500).json(err))
}

function login(req, res) {
  // implement user login
  //find by username, check input pw against stored pw, return token
  let { username, password } = req.body;
  Users.findBy({ username }).first()
    .then(user => {
      if(bcrypt.compareSync(password, user.password)){
        const token = makeToken(user);
        res.status(200).json({username, token});
      } else {
        res.status(401).json({ msg: 'incorrect pw'});
      }
    })
    .catch(err => res.status(500).json({ msg: 'user not found', err}));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}