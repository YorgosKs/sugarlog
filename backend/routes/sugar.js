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

router.get('/avg-hours', verifyJWT, async (req, res) => {
  try {
    const group00 = '00:00';
    const group05 = '05:59';
    const group1 = await Sugar.find({
      user: req.user.id,
      time: { $gte: group00, $lte: group05 },
    }).select('-_id level');

    const group06 = '06:00';
    const group11 = '11:59';
    const group2 = await Sugar.find({
      user: req.user.id,
      time: { $gte: group06, $lte: group11 },
    }).select('-_id level');

    const group12 = '12:00';
    const group17 = '17:59';
    const group3 = await Sugar.find({
      user: req.user.id,
      time: { $gte: group12, $lte: group17 },
    }).select('-_id level');

    const group18 = '18:00';
    const group24 = '23:59';
    const group4 = await Sugar.find({
      user: req.user.id,
      time: { $gte: group18, $lte: group24 },
    }).select('-_id level');

    const dataHrAvg = res.json([group1, group2, group3, group4]);
    return dataHrAvg;
  } catch (err) {
    res.json(err);
  }
});

router.get('/avg-data', verifyJWT, async (req, res) => {
  try {
    const date1 = new Date();
    date1.setDate(date1.getDate());
    const formattedDate1 = date1.toISOString().split('T')[0];
    const dayOne = await Sugar.find({
      user: req.user.id,
      date: formattedDate1,
    }).select('-_id date level user');

    const date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    const formattedDate2 = date2.toISOString().split('T')[0];
    const dayTwo = await Sugar.find({
      user: req.user.id,
      date: formattedDate2,
    }).select('-_id date level user');

    const date3 = new Date();
    date3.setDate(date3.getDate() - 2);
    const formattedDate3 = date3.toISOString().split('T')[0];
    const dayThree = await Sugar.find({
      user: req.user.id,
      date: formattedDate3,
    }).select('-_id date level user');

    const date4 = new Date();
    date4.setDate(date4.getDate() - 3);
    const formattedDate4 = date4.toISOString().split('T')[0];
    const dayFour = await Sugar.find({
      user: req.user.id,
      date: formattedDate4,
    }).select('-_id date level user');

    const date5 = new Date();
    date5.setDate(date5.getDate() - 4);
    const formattedDate5 = date5.toISOString().split('T')[0];
    const dayFive = await Sugar.find({
      user: req.user.id,
      date: formattedDate5,
    }).select('-_id date level user');

    const date6 = new Date();
    date6.setDate(date6.getDate() - 5);
    const formattedDate6 = date6.toISOString().split('T')[0];
    const daySix = await Sugar.find({
      user: req.user.id,
      date: formattedDate6,
    }).select('-_id date level user');

    const date7 = new Date();
    date7.setDate(date7.getDate() - 6);
    const formattedDate7 = date7.toISOString().split('T')[0];
    const daySeven = await Sugar.find({
      user: req.user.id,
      date: formattedDate7,
    }).select('-_id date level user');

    const dataAvg = res.json([
      dayOne,
      dayTwo,
      dayThree,
      dayFour,
      dayFive,
      daySix,
      daySeven,
    ]);
    return dataAvg;
  } catch (err) {
    console.log(err);
  }
});

// GET EDIT DATA

router.get('/update-data/:id', verifyJWT, async (req, res) => {
  Sugar.findById(req.params.id)
    .then((sugar) => res.json(sugar))
    .catch((err) => res.status(400).send(err));
});

router.post('/update/:id', verifyJWT, async (req, res) => {
  Sugar.findById(req.params.id).then((sugar) => {
    (sugar.level = req.body.level),
      (sugar.date = req.body.date),
      (sugar.time = req.body.time),
      (sugar.activity = req.body.activity),
      (sugar.medication = req.body.medication),
      (sugar.note = req.body.note),
      sugar
        .save()
        .then(() => res.json('Sugar level updated!'))
        .catch((err) => console.log(err));
  });
});

router.delete('/delete/:id', verifyJWT, async (req, res) => {
  console.log(req.params.id);
  Sugar.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch((err) => console.log(err));
});

module.exports = router;
