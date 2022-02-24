const router = require('express').Router();
const Info = require('../models/info.model');

const verifyJWT = require('../middleware/auth');

router.post('/add-info/:userid', verifyJWT, async (req, res) => {
  const info = new Info({
    user: req.params.userid,
    type: req.body.type,
    sugarUnit: req.body.sugarUnit,
    weightUnit: req.body.weightUnit,
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

router.get('/:userid', verifyJWT, async (req, res) => {
  Info.findOne({ user: req.params.userid })
    .then((info) => res.json(info))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update-info/:userid', verifyJWT, async (req, res) => {
  Info.findOne({ user: req.params.userid }).then((info) => {
    (info.type = req.body.type),
      (info.sugarUnit = req.body.sugarUnit),
      (info.weightUnit = req.body.weightUnit),
      (info.minRange = req.body.minRange),
      (info.maxRange = req.body.maxRange);

    info
      .save()
      .then(() => res.json('Info updated'))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});

module.exports = router;
