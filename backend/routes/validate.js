const { check, validationResult } = require('express-validator');

module.exports = function (req, res, next) {
  //   const token = req.headers['x-access-token']?.split(' ')[1];

  //   if (token) {
  //     jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
  //       if (err)
  //         return res.json({
  //           isLoggedIn: false,
  //           message: 'Failed To Authenticate',
  //         });
  //       req.user = {};
  //       req.user.id = decoded.id;
  //       next();
  //     });
  //   } else {
  //     res.json({ message: 'Incorrect Token Given', isLoggedIn: false });
  //   }
  let email = req.body.email;
  check(email)
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter a valid email'),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    };

  next();
};
