const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000', // 요청을 허용할 출처 명시
  credentials: true // 인증 정보를 포함한 요청 허용
}));

const authentication = require('./routes/auth');
const post = require('./routes/posts');

/// 쿠키쿠키세션세션 ////
// app.use(express.json()); // 이코드 왜 붙여야되는지 알아보셈
// // 세션의 초기값 (쿠키 설정 코드)
// app.use(session({
//     secret: "password486",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: 'none', 
//       secure : false, //HTTPS가 아닌 연결에서도 전송될수 있도록 
//       maxAge: 1000 * 60 * 60 // 1시간
//     },
//     store
  // }));
//////


// app.use('/', (req, res, next) => {
//     console.log(req.session);
//     next();
//   })

// authController.get('/login', function(req, res, next) {
//   console.log(req.session);
//   if(req.session.num === undefined) {
//     req.session.num = 1;
//   } else {
//     req.session.num = req.session.num + 1;
//   }
//   res.send(`View : ${req.session.num}`);
// })

app.use(authentication);
app.use(post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
