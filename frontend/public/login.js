function goToPostPage() {
  window.location.href = "/post";
}

// 페이지 로드 완료 시 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  // 로그인 폼 제출 이벤트 핸들러
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼 제출 방지

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    login(email, password); // 로그인 함수 호출
  });

  // 이메일 입력 필드 이벤트 리스너
  document.getElementById('email').addEventListener('input', function () {
    validateEmail(this.value);
  });

  // 비밀번호 입력 필드 이벤트 리스너
  document.getElementById('password').addEventListener('input', function () {
    validatePassword(this.value);
  });
});

// 로그인 함수
function login(email, password) {
  const options = {
    method: 'POST',
    credentials: 'include', // 쿠키 포함
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  };

  fetch('http://localhost:3001/login', options)
    .then(response => {
      if (response.ok) {
        alert('로그인 성공!');
        window.location.href = '/post'; // 페이지 이동
      } else {
        return response.text().then(message => {
          alert(`인증 실패: ${message}`);
        });
      }
    })
    .catch(error => {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    });
}

// 이메일 유효성 검사 함수
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const helperText = document.getElementById('email-helper');

  if (!emailRegex.test(email)) {
    helperText.style.display = 'block';
    helperText.textContent = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
  } else {
    helperText.style.display = 'none';
  }
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const helperText = document.getElementById('password-helper');
  const submitButton = document.getElementById('login-button');

  if (!passwordRegex.test(password)) {
    helperText.style.display = 'block';
    helperText.textContent = '*비밀번호는 8자 이상, 20자 이하이며, 대소문자, 숫자, 특수문자를 각각 최소 1개씩 포함해야 합니다.';
  } else {
    helperText.style.display = 'none';
    submitButton.style.backgroundColor = '#7F6AEE'; // 유효한 비밀번호 입력 시 버튼 스타일 변경
  }
}



