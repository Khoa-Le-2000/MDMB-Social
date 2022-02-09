require('dotenv').config();
const express = require('express');
const route = require('./routes/index');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
const server = app.listen(PORT);
route(app);

console.log(`Server is running on port ${PORT}`);