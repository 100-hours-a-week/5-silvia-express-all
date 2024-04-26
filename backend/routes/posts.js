const express = require('express');
const { Router } = require('express');
// const path = require('path');
const postController = require('../controllers/postController');

const app = Router();
// const publicPath = path.join(__dirname, '../public');


app.use('/', postController);
// app.use(express.static(publicPath));



module.exports = app;




