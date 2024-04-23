const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const authentication = require('./routes/auth');
const post = require('./routes/posts');

const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.use(authentication);

app.use('/post', post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
