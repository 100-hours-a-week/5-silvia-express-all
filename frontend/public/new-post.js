
var titleInputValue = document.getElementById('titleInput').value;
var contentInputValue = document.getElementById('contentInput').value;

function goToPostPage() {
  window.location.href = "/post";
}

// 뒤로가기
function goBack() {
  window.history.back();
}

// 제목 글자수 제한
function checkTitleLength(input) {
  const maxLength = 26;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength); 
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
  // 함수 내에서 직접 입력값을 조회
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
  addPost();
  // addPost();
}
);

// 게시글 추가
function addPost() {
  // 이 부분을 수정하여 실시간으로 입력 값을 가져옵니다.
  // var titleInputValue = document.getElementById('titleInput').value;
  // var contentInputValue = document.getElementById('contentInput').value;

  const postData = {
    author: '사용자명', // 예시 값, 실제 구현에서는 사용자 정보를 활용하세요.
    authorImage: '사용자 이미지 URL', // 예시 값
    postImage: '게시글 이미지 URL', // 예시 값
    postTitle: 'ㅎㅇㅎㅇ', // 수정된 부분
    date: "2024-02-28 17:55:10",
    postContents: 'ㅎㅇㅎㅇㅎㅇ', // 수정된 부분
    views: 0, // 초기 조회수
    likes: 0, // 초기 좋아요 수
    comments: [] // 초기 댓글 배열
  };

  fetch('http://localhost:3001/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('게시글이 추가되었습니다:', data);
    alert('게시글이 성공적으로 추가되었습니다!');
    // 성공적으로 게시글이 추가된 후의 로직을 여기에 작성하세요.
  })
  .catch((error) => {
    console.error('게시글 추가 중 오류 발생:', error);
  });
}
