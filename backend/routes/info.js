const router = require('express').Router();
const Info = require('../models/info.model');

const verifyJWT = require('../middleware/auth');

router.post('/add-info/', verifyJWT, async (req, res) => {
  const info = new Info({
    user: req.user.id,
    type: req.body.type,
    sugarUnit: req.body.sugarUnit,
    minRange: req.body.minRange,
    maxRange: req.body.maxRange,
  });

  try {
    const newInfo = await info.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Info.findOne({ user: req.user.id })
    .then((info) => res.json(info))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update-info/', verifyJWT, async (req, res) => {
  Info.findOne({ user: req.user.id }).then((info) => {
    (info.type = req.body.type),
      (info.sugarUnit = req.body.sugarUnit),
      (info.minRange = req.body.minRange),
      (info.maxRange = req.body.maxRange);
    info
      .save()
      .then(() => res.json('Info updated'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

module.exports = router;
