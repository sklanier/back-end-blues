const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.SECRET;

// quickly see what this file exports
module.exports = {
  makeToken,
  authenticate,
};

// implementation details
function makeToken(user){
  const payload = {
    sub: user.id,
    name: user.username,
  };
  const options = {
    expiresIn: '2h'
  };
  return jwt.sign(payload, jwtKey, options);
};

function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}