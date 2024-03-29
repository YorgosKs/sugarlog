const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult, body } = require('express-validator');
const User = require('../models/user.model');
const Session = require('../models/session.model');
const verifyJWT = require('../middleware/auth');

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
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) return res.status(400).send('Email already exists');

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        infoComplete: false,
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
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.json(401);

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.json(403);

      const payload = { _id: user._id };

      if (user && validPass) {
        const token = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          (err, token) => {
            if (err) return res.json({ message: err });
            return res
              .cookie('token', token, {
                domain: 'backend-b94ud.ondigitalocean.app',
                path: '/',
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                expiresIn: 86400,
              })
              .status(200)
              .json({ message: 'Login success!' });
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

router.get('/', verifyJWT, (req, res) => {
  User.findOne({ _id: req.user.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).send('Error: ' + err));
});

// Check if email exists
router.post('/check', async (req, res) => {
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) return res.json(400);
  else return res.json(200);
});

// Turn off info modal
router.post('/info-modal', verifyJWT, async (req, res) => {
  User.findById(req.user.id).then((user) => {
    (user.infoComplete = req.body.infoComplete),
      user
        .save()
        .then(() => res.json('User updated!'))
        .catch((err) => console.log(err));
  });
});

router.post('/update-email', verifyJWT, async (req, res) => {
  User.findByIdAndUpdate(req.user.id).then((user) => {
    user.email = req.body.email;
    user
      .save()
      .then(() => res.json('Email updated!'))
      .catch((err) => console.log(err));
  });
});

router.post('/update-password', verifyJWT, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  User.findByIdAndUpdate(req.user.id).then((user) => {
    user.password = hashedPassword;
    user
      .save()
      .then(() => res.json('Password updated!'))
      .catch((err) => console.log(err));
  });
});

router.post('/change-password', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);
  User.findOne({ email: req.body.email }).then((user) => {
    user.password = hashedPassword;
    user
      .save()
      .then(() => res.json('Password updated!'))
      .catch((err) => console.log(err));
  });
});

router.get('/logout', verifyJWT, (req, res) => {
  if (req.cookies.token) {
    try {
      res.clearCookie('token', {
        domain: 'backend2-kgr8s.ondigitalocean.app',
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.status(200);
      res.json({ message: 'Logout success' });
      res.end();
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
