const express = require('express');
const { Router } = require('express');
const path = require('path');
const postController = require('../controllers/postController');

const app = Router();
const publicPath = path.join(__dirname, '../public');

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'post-main.html'));
});

app.use('/', postController);
app.use(express.static(publicPath));

app.get('/new', (req, res) => {
  res.sendFile(path.join(publicPath, 'new-post.html'));
});

module.exports = app;