const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },             // Payload: what we store inside the token
    process.env.JWT_SECRET,     // Secret key to sign it
    { expiresIn: process.env.JWT_EXPIRE } // Token expires in 7 days
  );
};

module.exports = generateToken;