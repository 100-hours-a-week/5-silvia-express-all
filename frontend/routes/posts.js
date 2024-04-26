const express = require('express');
const { Router } = require('express');
const path = require('path');

const app = Router();
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath)); // 이 코드가 있어야 정적 파일 제공할때 어쩌고.. 암튼 이거 이썽야 css불러옴 왜지 왜지

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'post-main.html'));
});

app.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  res.sendFile(path.join(publicPath, `post-view.html`));
});


app.get('/new', (req, res) => {
  res.sendFile(path.join(publicPath, 'new-post.html'));
});

module.exports = app;






