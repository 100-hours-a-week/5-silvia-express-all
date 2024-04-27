const express = require('express');
const path = require('path');
const fs = require('fs');
const postController = express.Router();

const postsFilePath = path.join(__dirname, '../models/posts.json');

// 게시물 api
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

// 게시물 id별 api
postController.get('/api/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }
    const posts = JSON.parse(data);
    const post = posts[postId];
    if (!post) {
      return res.status(404).send('포스트를 찾을 수 없음');
    }
    res.json(post);
  });
});

// 댓글 api
postController.get('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }
    const posts = JSON.parse(data);
    const post = posts[postId];
    if (!post) {
      return res.status(404).send('포스트를 찾을 수 없음');
    }
    const comments = post.comments.filter(comment => comment !== null);
    res.json(post.comments);
  });
});

// 댓글 id별 api
postController.get('/api/posts/:postId/comments/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }
    const posts = JSON.parse(data);
    const post = posts[postId];
    if (!post) {
      return res.status(404).send('포스트를 찾을 수 없음');
    }
    const comment = post.comments.find(comment => comment.commentId === parseInt(commentId));
    if (!comment) {
      return res.status(404).send('댓글을 찾을 수 없음');
    }
    res.json(comment);
  });
});



// 게시글 삭제
postController.delete('/api/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }
    try {
      let posts = JSON.parse(data);
      if (!posts[postId]) {
        return res.status(404).send('포스트를 찾을 수 없음');
      }
      delete posts[postId];
      fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('서버 오류');
        }
        res.status(200).send('게시글이 삭제되었습니다.');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});




//댓글 api
postController.get('/api/posts/:postId/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }
    
    try {
      const posts = JSON.parse(data);
      
      if (!posts[postId]) {
        return res.status(404).send('포스트를 찾을 수 없음');
      }
      
      const comments = posts[postId].comments;
      const comment = comments.find(comment => comment.commentId === parseInt(commentId));
      
      if (!comment) {
        return res.status(404).send('코멘트를 찾을 수 없음');
      }
      
      res.json(comment);
      
    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});

// 댓글 삭제

// 댓글작성

//게시글 작성

// 게시글 추가


module.exports = postController;
