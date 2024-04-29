// 비밀번호 helper text
let password = '';

function goToPostPage() {
  window.location.href = "/post";
}

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
    emptyBox.style.display = 'none';
  } else {
    helperText.style.display = 'none';
    emptyBox.style.display = 'block';
  }
});

// 프로필 드롭박스
const toggleDropdown = () => {
  const dropdown = document.getElementById('myDropdown');
  dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
};

window.onclick = function (event) {
  if (!event.target.matches('.profile-circle')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
};

// 비밀번호 확인 helper text + 버튼 활성화
document
  .getElementById('password_check')
  .addEventListener('input', function () {
    var password_check = this.value;
    var helperText = document.getElementById('password-check-helper');
    var emptyBox = document.getElementById('password-check-empty');
    var submitButton = document.getElementById('submit_button');

    if (password_check === '') {
      helperText.textContent = '*비밀번호 확인을 입력해주세요.';
      helperText.style.display = 'block';
      submitButton.style.backgroundColor = '#ACA0EB';
    } else if (password_check !== password) {
      helperText.textContent = '*비밀번호가 일치하지 않습니다.';
      helperText.style.display = 'block';
      submitButton.style.backgroundColor = '#ACA0EB';
    } else {
      helperText.style.display = 'none';
      emptyBox.style.display = 'block';
      submitButton.style.backgroundColor = '#7F6AEE';
    }
  });

// 토스트 메시지 2초간
document.getElementById('submit_button').addEventListener('click', function () {
  var helperText = document.getElementById('password-check-helper');
  var password_check = document.getElementById('password_check').value;
  

  if (password_check === '') {
    alert('비밀번호를 확인해주세요.');
    return; 
  }
  

  if (password_check !== password) {
    alert('비밀번호가 일치하지 않습니다.');
    return; 
  }
  
  // 모든 조건을 통과한 경우 토스트 메시지 띄우기
  var submitMessage = document.querySelector('.submit-message');
  submitMessage.style.display = 'flex';
  setTimeout(function () {
    submitMessage.style.display = 'none';
  }, 2000);
});

