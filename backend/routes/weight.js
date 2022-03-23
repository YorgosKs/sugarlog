const router = require('express').Router();
const Weight = require('../models/weight.model');

const verifyJWT = require('../middleware/auth');

router.post('/add/:userid', verifyJWT, async (req, res) => {
  const weight = new Weight({
    user: req.params.userid,
    date: req.body.date,
    time: req.body.time,
    weightNum: req.body.weightNum,
    note: req.body.note,
  });

  try {
    const newWeight = await weight.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Weight.find({ user: req.user.id })
    .then((weight) => res.json(weight))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Weight.findById(req.params.id).then((weight) => {
    (weight.date = req.body.date),
      (weight.time = req.body.time),
      (weight.weightNum = req.body.weightNum),
      (weight.note = req.body.note),
      weight
        .save()
        .then(() => res.json('Weight updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/:id', verifyJWT, async (req, res) => {
  Weight.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
