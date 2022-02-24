const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult, body } = require('express-validator');
const User = require('../models/user.model');

const verifyJWT = require('../middleware/auth');
// const validate = require('./validate');

// REGISTER
router.post(
  '/register',
  [
    check('email', 'Your email is not valid').isEmail().not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      // res.send({});

      // Check data in DB

      // const emailExist = await User.findOne({ email: req.body.email });
      // if (emailExist) return res.status(400).send('Email already exists');

      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) return res.status(400).send('Email already exists');

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      try {
        const newUser = await user.save();
        res.json({ user: user._id });
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Your email is not valid').isEmail().not().isEmpty(),
    check('password', 'Password is empty').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('Email is wrong');

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send('Password is wrong');

      const payload = { _id: user._id };

      if (user && validPass) {
        const token = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) return res.json({ message: err });
            return res.json({
              message: 'Success',
              token: 'Bearer ' + token,
              id: user._id,
            });
          }
        );
      } else {
        return res.json({
          message: 'Something went wrong',
        });
      }
    }
  }
);

router.get('/:userId', verifyJWT, (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).send('Error: ' + err));
});

module.exports = router;
