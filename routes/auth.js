const { Router } = require('express');
const path = require('path');
const app = Router();
const authController = require('../controllers/authController');
const publicPath = path.join(__dirname, '../public');

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.use('/', authController);

app.get('/signup', (req, res) => {
  res.sendFile(path.join(publicPath, 'sign-up.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(publicPath, 'edit-profile.html'));
});

app.get('/accounts', (req, res) => {
  const accounts = authController.loadAccounts();
  res.json(accounts);
});

module.exports = app;
