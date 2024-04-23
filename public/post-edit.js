function goBack() {
  window.history.back();
}

var editButton = document.querySelector('button[type="edit-button"]');
editButton.addEventListener('click', function () {
  alert('게시글 수정이 완료되었습니다!');
});
