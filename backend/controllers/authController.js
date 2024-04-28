const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const authController = express.Router();
const postsFilePath = path.join(__dirname, '../models/accounts.json');

authController.use(express.json());
authController.use(express.urlencoded({ extended: true }));
authController.use(bodyParser.json());

authController.use(cors({
  origin: 'http://localhost:3000', // 요청을 허용할 출처 명시
  credentials: true // 인증 정보를 포함한 요청 허용
}));


// 세션 설정
authController.use(session({
  secret: 'password486',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    secure: false,
    maxAge: 1000 * 60 * 60 // 1시간
  },
  store: new FileStore()
}));

// 사용자 목록
const users = [
  {
    nickname: "user1",
    email: "user1@gmail.com",
    password: "Aaaa1234!!",
  }
  // 다른 사용자 계정 추가 가능
];

// 계정 정보 조회
authController.get('/api/accounts', (req, res) => {
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

// 로그인 처리
authController.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    req.session.is_logined = true;
    req.session.nickname = user.nickname; 
    res.send('로그인 성공!');
  } else {
    res.status(401).send('인증 실패: 이메일 또는 비밀번호가 정확하지 않습니다.');
  }
});


// 세션 정보를 가져오는 API 엔드포인트
authController.get('/login/session', (req, res) => {
  if (req.session.is_logined) {
    res.json({
      isLogined: true,
      nickname: req.session.nickname
    });
  } else {
    res.json({ isLogined: false });
  }
});

// 로그아웃 처리
authController.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('세션 삭제 중 에러 발생:', err);
      return res.status(500).send('로그아웃 실패');
    }
    res.clearCookie('connect.sid', {path: '/'}).status(200).send('로그아웃 성공');
  });
});

module.exports = authController;



// authController.get('/login', function(req, res, next) {
//   console.log(req.session);
//   if(req.session.num === undefined) {
//     req.session.num = 1;
//   } else {
//     req.session.num = req.session.num + 1;
//   }
//   res.send(`View : ${req.session.num}`);
// })


