const router = require('express').Router();
const Activity = require('../models/activity.model');

const verifyJWT = require('../middleware/auth');

router.post('/add/:userid', verifyJWT, async (req, res) => {
  const activity = new Activity({
    user: req.params.userid,
    date: req.body.date,
    type: req.body.type,
    distance: req.body.distance,
    calories: req.body.calories,
    note: req.body.note,
  });

  try {
    const newActivity = await activity.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:userid', verifyJWT, async (req, res) => {
  Activity.find({ user: req.params.userid })
    .then((activity) => res.json(activity))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Activity.findById(req.params.id).then((activity) => {
    (activity.date = req.body.date),
      (activity.type = req.body.type),
      (activity.distance = req.body.distance),
      (activity.calories = req.body.calories),
      (activity.note = req.body.note),
      activity
        .save()
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/:id', verifyJWT, async (req, res) => {
  Activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
