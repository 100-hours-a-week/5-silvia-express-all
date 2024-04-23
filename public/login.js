// 계정정보 api 가져오기
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch('/api/accounts')
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find(
          (account) => account.email === email && account.password === password
        );

        if (user) {
          alert('로그인 성공!');
          window.location.href = 'index.html';
        } else {
          alert('입력하신 계정 정보가 정확하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('Error loading accounts:', error);
        alert(
          'An error occurred while loading accounts. Please try again later.'
        );
      });
  });
});

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
    emptyBox.style.display = 'block';
  } else {
    helperText.style.display = 'none';
    emptyBox.style.display = 'none';
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
