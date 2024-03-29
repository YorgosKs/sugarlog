const router = require('express').Router();
const Pressure = require('../models/pressure.model');

const verifyJWT = require('../middleware/auth');

router.post('/add/', verifyJWT, async (req, res) => {
  const pressure = new Pressure({
    user: req.user.id,
    date: req.body.date,
    time: req.body.time,
    systolic: req.body.systolic,
    diastolic: req.body.diastolic,
    pulse: req.body.pulse,
    note: req.body.note,
  });

  try {
    const newPressure = await pressure.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Pressure.find({ user: req.user.id })
    .then((pressure) => res.json(pressure))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.get('/:id', verifyJWT, async (req, res) => {
  Pressure.findById(req.params.id)
    .then((sugar) => res.json(sugar))
    .catch((err) => res.status(400).send(err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Pressure.findById(req.params.id).then((pressure) => {
    (pressure.date = req.body.date),
      (pressure.time = req.body.time),
      (pressure.systolic = req.body.systolic),
      (pressure.diastolic = req.body.diastolic),
      (pressure.pulse = req.body.pulse),
      (pressure.note = req.body.note),
      pressure
        .save()
        .then(() => res.json('Pressure updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/delete/:id', verifyJWT, async (req, res) => {
  Pressure.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
