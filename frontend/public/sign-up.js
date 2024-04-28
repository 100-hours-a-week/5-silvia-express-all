function goToPostPage() {
  window.location.href = "/post";
}


function goBack() {
  window.history.back();
}

// 이메일 헬퍼
document.getElementById('email').addEventListener('input', function () {
  var email = this.value;
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var helperText = document.getElementById('email-helper');
  var emptyBox = document.getElementById('email-empty');

  if (email === '') {
    helperText.textContent = '*이메일을 입력해주세요.';
    helperText.style.display = 'block'; 
  } else if (!emailRegex.test(email)) {
    helperText.textContent = '*올바른 이메일 형식을 입력해주세요.(예: example@example.com)';
    helperText.style.display = 'block'; 
  } else {
    helperText.style.display = 'none';
    emptyBox.style.display = 'none';
  }
});


// 비밀번호 helper text
var password = ''; 

document.getElementById('password').addEventListener('input', function () {
  password = this.value;
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  var helperText = document.getElementById('password-helper');
  var emptyBox = document.getElementById('password-empty');

  if (password === '') {
    helperText.textContent = '*비밀번호를 입력해주세요.';
    helperText.style.display = 'block';
    emptyBox.style.display = 'none';
  } else if (!passwordRegex.test(password)) {
    helperText.textContent =
      '*비밀번호는 8자 이상, 20자 이하이며, 대소문자, 숫자, 특수문자를 각각 최소 1개씩 포함해야 합니다.';
    helperText.style.display = 'block';
    emptyBox.style.display = 'block';
  } else {
    helperText.style.display = 'none';
    emptyBox.style.display = 'none';
  }
});

// 비밀번호 확인 helper text
document
  .getElementById('password_check')
  .addEventListener('input', function () {
    var password_check = this.value;
    var helperText = document.getElementById('password-check-helper');

    if (password_check === '') {
      helperText.textContent = '*비밀번호 확인을 입력해주세요.';
      helperText.style.display = 'block';
    } else if (password_check !== password) {
      helperText.textContent = '*비밀번호가 일치하지 않습니다.';
      helperText.style.display = 'block';
    } else {
      helperText.style.display = 'none'; 
    }
  });

document.getElementById('name').addEventListener('input', function () {
  var nickname = this.value;
  var helperText = document.getElementById('nickname-helper');
  var submitButton = document.querySelector('.submit-button');

  if (nickname === '') {
    helperText.textContent = '*닉네임을 입력해주세요.';
    helperText.style.display = 'block';
    submitButton.style.backgroundColor = '#ACA0EB';
  } else if (nickname.length > 10) {
    helperText.textContent = '*닉네임은 최대 10자 까지 작성 가능합니다.';
    helperText.style.display = 'block';
    submitButton.style.backgroundColor = '#ACA0EB';
  } else if (nickname.includes(' ')) {
    helperText.textContent = '*띄어쓰기를 없애주세요.';
    helperText.style.display = 'block';
    submitButton.style.backgroundColor = '#ACA0EB';
  } else {
    helperText.style.display = 'none';
    submitButton.style.backgroundColor = '#7F6AEE';
  }
});

// 동그라미에 이미지 채우기
document.getElementById('file-upload').onchange = function (event) {
  const file = event.target.files[0]; 
  const reader = new FileReader(); 
  var cross = document.getElementById('cross-shape');
  var helperText = document.getElementById('image-helper');

  // 파일 읽기가 완료되면 호출되는 콜백 함수
  reader.onload = function (e) {
    document.getElementById('upload-btn').style.backgroundImage =
      `url(${e.target.result})`;
    cross.style.display = 'none';
    helperText.style.display = 'none';
  };
  reader.readAsDataURL(file);
};



// 이메일 중복 검사
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('signup-form');
  const loginButton = document.querySelector(".login-button");

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value.trim();

   
    fetch('http://localhost:3001/api/accounts')
      .then((response) => response.json())
      .then((data) => {
        const users = data.users;
        const user = users.find((account) => account.email === email);

        if (user) {
          alert('중복된 이메일 입니다.');
        } else {
          alert('회원가입 성공!');
          window.location.href = 'login.html';
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      });
  });
});




document.addEventListener("DOMContentLoaded", function() {
  var loginButton = document.querySelector(".login-button");

  loginButton.addEventListener("click", function() {
    window.location.href = "login.html";
  });
});
