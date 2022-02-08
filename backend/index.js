require('dotenv').config();
const express = require('express');
const route = require('./routes/index');
const app = express();
const PORT = process.env.PORT||8080;

app.use(express.json());

const server = app.listen(PORT);
route(app);

console.log(`Server is running on port ${PORT}`);