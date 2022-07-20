require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(morgan('tiny'));
app.use(express.json({limit: '1024mb'}));

module.exports = app;
