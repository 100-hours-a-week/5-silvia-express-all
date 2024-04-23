//드롭박스
function toggleDropdown() {
  var dropdown = document.getElementById('myDropdown');
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}

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

document
  .getElementById('withdraw-modal-submit')
  .addEventListener('click', function () {
    alert('회원탈퇴가 완료되었습니다.');
    window.location.href = 'login.html';
    
  });

//모달
const openButton = document.getElementById('account-delete-button');
const post_modal = document.querySelector('.withdraw_modal');
const closeBtn = document.getElementById('withdraw-modal-cancel');
const openModal = () => {
  post_modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  post_modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};
openButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

//helper text

document.getElementById('name').addEventListener('input', function () {
  var nickname = this.value;
  var helperText = document.getElementById('name-helper');
  var submitButton = document.querySelector('.edit-button');
  

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





document.getElementById('edit_submit').addEventListener('click', function () {
  var submitMessage = document.querySelector('.submit-message');
  submitMessage.style.display = 'flex';
  setTimeout(function () {
    submitMessage.style.display = 'none';
  }, 2000);
});

// 프로필 이미지 등록
document.addEventListener('DOMContentLoaded', function () {
  var upload = document.getElementById('upload');
  var preview = document.getElementById('preview');
  var avatar_name = document.getElementById('name');
  var defaultImageSrc = 'images/icon.png';
  showDefaultImage();
  upload.addEventListener('change', handleFiles, false);

  function handleFiles() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      var imageUrl = event.target.result;

      while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }

      var img = document.createElement('img');
      img.src = imageUrl;
      img.className = 'avatar_img';
      window.getSelection().removeAllRanges();

      avatar_name.textContent = file.name;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  }

  function showDefaultImage() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    var img = document.createElement('img');
    img.src = defaultImageSrc;
    img.className = 'avatar_img';

    avatar_name.textContent = 'Default Avatar';
    preview.appendChild(img);
  }
});
