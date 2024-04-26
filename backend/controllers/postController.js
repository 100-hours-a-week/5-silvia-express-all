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

// 게시물 api
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
    // 해당 포스트의 댓글만 추출하여 반환
    const comments = post.comments.filter(comment => comment !== null);
    // 수정: 해당 포스트의 댓글 전체를 반환
    res.json(post.comments);
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
postController.delete('/api/posts/:postId/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  
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
      
      const comments = posts[postId].comments;
      const commentIndex = comments.findIndex(comment => comment.commentId === parseInt(commentId));
      
      if (commentIndex === -1) {
        return res.status(404).send('코멘트를 찾을 수 없음');
      }
      
      comments.splice(commentIndex, 1);
      
      fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('서버 오류');
        }
        res.status(200).send('코멘트가 삭제되었습니다.');
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});

// 댓글작성
postController.post('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const newComment = { commentText: req.body.commentText }; // Modify to extract commentText

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

      // Add new comment to the post
      if (!posts[postId].comments) {
        posts[postId].comments = []; // Initialize comments array if not exists
      }
      posts[postId].comments.push(newComment);

      fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('서버 오류');
        }
        res.status(201).send('댓글이 작성되었습니다.');
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});


// 댓글 수정
postController.patch('/api/posts/:postId/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const updatedComment = req.body; // Assuming the updated comment is sent in the request body

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

      const comments = posts[postId].comments;
      const commentIndex = comments.findIndex(comment => comment.commentId === parseInt(commentId));

      if (commentIndex === -1) {
        return res.status(404).send('코멘트를 찾을 수 없음');
      }

      // Update the comment
      comments[commentIndex] = { ...comments[commentIndex], ...updatedComment };

      fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('서버 오류');
        }
        res.status(200).send('코멘트가 업데이트되었습니다.');
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('파일 파싱 오류');
    }
  });
});




module.exports = postController;
