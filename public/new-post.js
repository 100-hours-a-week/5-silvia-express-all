// 뒤로가기
function goBack() {
  window.history.back();
}

// 제목 글자수 제한
function checkTitleLength(input) {
  const maxLength = 26;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength); /
    alert('최대 26글자까지만 입력할 수 있습니다.');
  }
}

// 파일 등록
function displayFileName(input) {
  const fileInfo = document.getElementById('file-info');
  const fileName = input.files[0].name;
  fileInfo.textContent = fileName;
}

// 제목 내용 helper text
function checkInputs() {
  var titleInputValue = document.getElementById('titleInput').value;
  var contentInputValue = document.getElementById('contentInput').value;
  var helperText = document.getElementById('postHelper');
  var editButton = document.getElementById('edit-button');

  if (titleInputValue === '' || contentInputValue === '') {
    helperText.style.display = 'block';
    
  } else {
    helperText.style.display = 'none';
    editButton.style.backgroundColor = '#7F6AEE';
  }
}

document.getElementById('titleInput').addEventListener('input', checkInputs);
document.getElementById('contentInput').addEventListener('input', checkInputs);


document.getElementById('edit-button').addEventListener('click', function () {
  alert("게시글 작성 완료!");
});