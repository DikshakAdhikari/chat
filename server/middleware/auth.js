const jwt = require('jsonwebtoken');

exports.verifyJWT = (token, callback) => {
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return callback(err);
    }
    callback(null, decoded);
  });
};
