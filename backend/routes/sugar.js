const router = require('express').Router();
const Sugar = require('../models/sugar.model');

const verifyJWT = require('../middleware/auth');
const { json } = require('body-parser');

router.post('/add/', verifyJWT, async (req, res) => {
  const sugar = new Sugar({
    user: req.user.id,
    level: req.body.level,
    date: req.body.date,
    time: req.body.time,
    period: req.body.period,
    activity: req.body.activity,
    medication: req.body.medication,
    note: req.body.note,
  });

  try {
    const newSugar = await sugar.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Sugar.find({ user: req.user.id })
    .then((sugar) => res.json(sugar))
    .catch((err) => res.status(400).send(err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Sugar.findById(req.params.id).then((sugar) => {
    (sugar.level = req.body.level),
      (sugar.date = req.body.date),
      (sugar.time = req.body.time),
      (sugar.period = req.body.period),
      (sugar.activity = req.body.activity),
      (sugar.medication = req.body.medication),
      (sugar.note = req.body.note),
      sugar
        .save()
        .then(() => res.json('Sugar level updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/delete/:id', verifyJWT, async (req, res) => {
  console.log(req.params.id);
  Sugar.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => console.log(err));
});

module.exports = router;
