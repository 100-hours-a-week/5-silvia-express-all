const { Router } = require('express');
const path = require('path');
const app = Router();
const authController = require('../controllers/authController');
// const publicPath = path.join(__dirname, '../public');

app.use('/', authController);


// app.get('/accounts', (req, res) => {
//   const accounts = authController.loadAccounts();
//   res.json(accounts);
// });


module.exports = app;
