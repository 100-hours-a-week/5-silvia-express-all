const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const authController = express.Router();
const postsFilePath = path.join(__dirname, '../models/accounts.json');

// 미들웨어 설정
authController.use(express.json());
authController.use(express.urlencoded({ extended: true }));
authController.use(bodyParser.json());
authController.use(cookieParser());

authController.use(helmet());

// CORS 설정
authController.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 세션 설정
authController.use(session({
  secret: 'password486',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: false,
    maxAge: 1000 * 60 * 60
  }
}));

// 사용자 목록
const users = [
  {
    nickname: "user1",
    email: "user1@gmail.com",
    password: "Aaaa1234!!",
  }
];

// 계정 정보 조회
authController.get('/api/accounts', (req, res) => {
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('서버 오류');
    }
    try {
      const posts = JSON.parse(data);
      res.json(posts);
    } catch (error) {
      res.status(500).send('파일 파싱 오류');
    }
  });
});

// 로그인
authController.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.cookie('isLogined', true, { maxAge: 1000 * 60 * 60 });
    res.cookie('nickname', user.nickname, { maxAge: 1000 * 60 * 60 });
    res.send('로그인 성공!');
  } else {
    res.status(401).send('인증 실패: 이메일 또는 비밀번호가 정확하지 않습니다.');
  }
});

// 사용자 세션 확인
// authController.get('/session', (req, res) => {
//   if (req.cookies.isLogined) {
//     res.json({ isLogined: true, nickname: req.cookies.nickname });
//   } else {
//     res.json({ isLogined: false });
//   }
// });

// 로그아웃 처리
authController.post('/logout', (req, res) => {
  res.cookie('isLogined', false);
  res.clearCookie('nickname', { path: '/' });
  res.status(200).send('로그아웃 성공');
});

module.exports = authController;
