const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const verifyJWT = require('./middleware/auth');

var compression = require('compression');

var helmet = require('helmet');

// ROUTES
const userRoute = require('./routes/user');
const infoRoute = require('./routes/info');
const sugarRoute = require('./routes/sugar');
const insulinRoute = require('./routes/insulin');
const weightRoute = require('./routes/weight');
const mealRoute = require('./routes/meal');
const activityRoute = require('./routes/activity');
const pressureRoute = require('./routes/pressure');
const { verify } = require('crypto');
const cookieParser = require('cookie-parser');

// PORT CONNECTION
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

// CONNECT TO DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo connected successfully!');
});

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://sugarlog.xyz',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: 'http://localhost:3000/',
//     methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
//     credentials: true,
//   })
// );

// origin: 'https://sugarlog.xyz',
// ROUTES MIDDLEWARE

app.use('/api/users', userRoute);
app.use('/api/users/info', infoRoute);
app.use('/api/users/sugar', sugarRoute);
app.use('/api/users/insulin', insulinRoute);
app.use('/api/users/weight', weightRoute);
app.use('/api/users/meal', mealRoute);
app.use('/api/users/activity', activityRoute);
app.use('/api/users/pressure', pressureRoute);
