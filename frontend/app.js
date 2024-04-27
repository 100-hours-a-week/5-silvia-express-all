const express = require('express');
const session = require('express-session');
const MemoryStore = new session.MemoryStore();
const path = require('path');
const app = express();
const port = 3000;

const authentication = require('./routes/auth');
const post = require('./routes/posts');

const publicPath = path.join(__dirname, 'public');

// 세셔션세션
app.use(express.json()); // 이코드 왜 붙여야되는지 알아보셈

// 세션의 초기값
app.use(session({
  secret: "password486",
  resave: false,
  saveUninitialized: false,
  cookie: {secure : false},
  store: MemoryStore,
}))

app.use('/', (req, res, next) => {
  console.log(req.session);
  next();
})

//

app.use(express.static(publicPath));

app.use(authentication);

app.use('/post', post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
