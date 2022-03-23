const router = require('express').Router();
const Insulin = require('../models/insulin.model');

const verifyJWT = require('../middleware/auth');

router.post('/add/:userid', verifyJWT, async (req, res) => {
  const insulin = new Insulin({
    user: req.params.userid,
    date: req.body.date,
    time: req.body.time,
    units: req.body.units,
    type: req.body.type,
    note: req.body.note,
  });

  try {
    const newInsulin = await insulin.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Insulin.find({ user: req.user.id })
    .then((insulin) => res.json(insulin))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Insulin.findById(req.params.id).then((insulin) => {
    (insulin.date = req.body.date),
      (insulin.time = req.body.time),
      (insulin.units = req.body.units),
      (insulin.type = req.body.type),
      (insulin.note = req.body.note),
      insulin
        .save()
        .then(() => res.json('Insulin updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/:id', verifyJWT, async (req, res) => {
  Insulin.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
