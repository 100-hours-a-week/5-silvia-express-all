const express = require('express');
const path = require('path');
const fs = require('fs');

const postsFilePath = path.join(__dirname, '../models/posts.json');

const postController = express.Router();

postController.get('/api/posts', (req, res) => {
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }

    try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});

module.exports = postController;
