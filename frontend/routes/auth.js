const { Router } = require('express');
const path = require('path');
// const session = require('express-session');
// const fileStore = require('session-file-store')(session);
const app = Router();
const publicPath = path.join(__dirname, '../public');



// // 로그인 처리
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username && password) {
//     if (req.session.authenticated) {
//       res.json(req.session);
//     } else {
//       if (password === "123") {
//         req.session.authenticated = true;
//         req.session.user = { username };
//         res.json(req.session);
//       } else {
//         res.status(403).json({ msg: "Bad credentials" });
//       }
//     }
//   } else {
//     res.status(403).json({ msg: "Bad credentials" });
//   }
// });

///////////////////


app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(publicPath, 'sign-up.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(publicPath, 'edit-profile.html'));
});

app.get('/accounts', (req, res) => {
  const accounts = authController.loadAccounts();
  res.json(accounts);
});

app.get('/password', (req, res) => {
  res.sendFile(path.join(publicPath, 'edit-password.html'));
});

module.exports = app;
