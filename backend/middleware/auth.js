const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: 'Failed To Authenticate',
        });
      req.user = {};
      req.user.id = jwt.decode(token)._id;
      console.log(req.user.id);
      next();
    });
  } else {
    res.json({ message: 'Incorrect Token Given', isLoggedIn: false });
  }
};
