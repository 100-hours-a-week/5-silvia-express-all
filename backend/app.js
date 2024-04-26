const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

const authentication = require('./routes/auth');
const post = require('./routes/posts');

app.use(cors());


// app.use(express.static(publicPath));

app.use(authentication);

app.use(post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
