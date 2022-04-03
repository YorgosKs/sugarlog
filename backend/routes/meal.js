const router = require('express').Router();
const Meal = require('../models/meal.model');

const verifyJWT = require('../middleware/auth');

router.post('/add/', verifyJWT, async (req, res) => {
  const meal = new Meal({
    user: req.user.id,
    date: req.body.date,
    time: req.body.time,
    carbs: req.body.carbs,
    protein: req.body.protein,
    fats: req.body.fats,
    note: req.body.note,
  });

  try {
    const newMeal = await meal.save();
    res.send('Done!');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', verifyJWT, async (req, res) => {
  Meal.find({ user: req.user.id })
    .then((meal) => res.json(meal))
    .catch((err) => res.status(400).send('Error: ' + err));
});

router.get('/:id', verifyJWT, async (req, res) => {
  Meal.findById(req.params.id)
    .then((sugar) => res.json(sugar))
    .catch((err) => res.status(400).send(err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Meal.findById(req.params.id).then((meal) => {
    (meal.date = req.body.date),
      (meal.time = req.body.time),
      (meal.carbs = req.body.carbs),
      (meal.protein = req.body.protein),
      (meal.fats = req.body.fats),
      (meal.note = req.body.note),
      meal
        .save()
        .then(() => res.json('Meal updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });
});

router.delete('/delete/:id', verifyJWT, async (req, res) => {
  Meal.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
