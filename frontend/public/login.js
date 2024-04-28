function goToPostPage() {
  window.location.href = "/post";
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 방지

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch('http://localhost:3001/api/accounts')
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find(
          (account) => account.email === email && account.password === password
        );

        if (user) {
          alert('로그인 성공!');
          // 여기서 login 함수 호출
          login(email, password); 
          
          window.location.href = '/post'; // 페이지 리다이렉션
        } else {
          alert('입력하신 계정 정보가 정확하지 않습니다.');
        }
      });
  });
});

function login(a, b) {
  fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: a,
      password: b
    }),
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}



// 이메일 helper text
document.getElementById('email').addEventListener('input', function () {
  var email = this.value;
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var helperText = document.getElementById('email-helper');
  var emptyBox = document.getElementById('empty');

  if (!emailRegex.test(email)) {
    helperText.style.display = 'block';
    helperText.textContent =
      '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
    // emptyBox.style.display = 'block';
  } else {
    helperText.style.display = 'none';
    // emptyBox.style.display = 'none';
  }
});

// 비밀번호 helper text
document.getElementById('password').addEventListener('input', function () {
  var password = this.value;
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  var helperText = document.getElementById('password-helper');
  var submitButton = document.getElementById('login-button');

  if (!passwordRegex.test(password)) {
    helperText.style.display = 'block';
    helperText.textContent =
      '*비밀번호는 8자 이상, 20자 이하이며, 대소문자, 숫자, 특수문자를 각각 최소 1개씩 포함해야 합니다.';
  } else {
    helperText.style.display = 'none';
    submitButton.style.backgroundColor = '#7F6AEE';
  }
});



