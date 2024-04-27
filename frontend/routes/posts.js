const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const app = express(); // express()로 애플리케이션을 만듭니다.

app.use(express.static(publicPath));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'post-main.html'));
});

// 게시글 수정 페이지 라우터 추가
app.get('/edit/:postId', (req, res) => {
  const postId = req.params.postId;
  // const postId = req.params.postId;
  // 게시글 수정 페이지를 보여주는 로직을 여기에 추가
  res.sendFile(path.join(publicPath, `post-edit.html`));
});

app.get('/new', (req, res) => {
  res.sendFile(path.join(publicPath, 'new-post.html'));
});



app.get('/:postId', (req, res) => {
  const postId = req.params.postId;
  res.sendFile(path.join(publicPath, `post-view.html`));
});


module.exports = app;