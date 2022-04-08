const { check, validationResult } = require('express-validator');

module.exports = function (req, res, next) {
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
