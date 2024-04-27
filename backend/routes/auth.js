const { Router } = require('express');
const path = require('path');
const app = Router();
const authController = require('../controllers/authController');

app.use('/', authController);

module.exports = app;
