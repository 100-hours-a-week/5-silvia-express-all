const express = require('express');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const path = require('path');
const app = express();
const port = 3000;

const authentication = require('./routes/auth');
const post = require('./routes/posts');

const publicPath = path.join(__dirname, 'public');

// 세셔션세션

//

app.use(express.static(publicPath));

app.use(authentication);

app.use('/post', post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
