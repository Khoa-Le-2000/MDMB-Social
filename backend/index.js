require('dotenv').config();
const express = require('express');
const route = require('./routes/index');
const socket = require('./controllers/socket.index');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const session = require('express-session');
const passport = require('./middlewares/passport.middleware');
//
const cookieParse = require('cookie-parser')

app.use(express.json());
app.use(cookieParse())

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(passport.initialize())
app.use(session({
    secret: 'strange key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors(corsOptions));
const server = app.listen(PORT);
route(app);

console.log(`Server is running on port ${PORT}`);

socket(server);