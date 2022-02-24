const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token']?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: 'Failed To Authenticate',
        });
      req.user = {};
      req.user.id = decoded.id;
      next();
    });
  } else {
    res.json({ message: 'Incorrect Token Given', isLoggedIn: false });
  }
};
