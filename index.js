const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const {newsRoutes, usersRoutes} = require('./src/routes/index');
const {Database, User} = require('./src/models');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use('/news', newsRoutes);
app.use('/users', usersRoutes)
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets')));

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});