var currentUrl = window.location.href;
var postId = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
console.log(postId);

// 프로필 드롭박스
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
  } else {
      dropdown.style.display = "none";
  }
}

window.onclick = function(event) {
  if (!event.target.matches('.profile-circle')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === "block") {
              openDropdown.style.display = "none";
          }
      }
  }
}
//////

function goToPostPage() {
  window.location.href = "/post";
}

let inputField = document.querySelector(".comment-input-field");
let currentCommentText = "";
let editedCommentText = "";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3001/api/posts");
    const data = await response.json();
    const post = data[postId];
    if (post) {
      const postDetails = `
      <div class="title-content">
      <input
        id="titleInput"
        type="text"
        class="title-content-input"
        value="${post.postTitle}"
        placeholder=""제목을 입력해주세요. (최대 26글자)"
        oninput="checkTitleLength(this)"
      />
    </div>
  </div>
  <div class="post-sentence">
    <div class="text-box">
      <div class="small-text">내용</div>
      <div class="small-text">*</div>
    </div>
    <div class="sentence-content">
      <p>
        <textarea
          id="contentInput"
          class="sentence-content-input"
          placeholder="내용을 입력해주세요."
        >${post.postContents}</textarea>
      </p>
    </div>
  </div>
  <div class="post-image">
    <div class="small-text">이미지</div>
    <div class="file-upload-button">
          <input
            type="file"
            id="file-input"
            style="display: none"
            onchange="displayFileName(this)"
          />
          <label for="file-input" class="image-button">파일 선택</label>
          <p id="file-info">파일을 선택해주세요.</p>
        </div>
  </div>
      `;
      document.getElementById("post-edit-container").innerHTML = postDetails;
    }
  } catch (error) {}
}

fetchData();

// 뒤로가기
function goBack() {
  window.history.back();
}

//드롭박스
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

// 닫힌 상태에서 다른 곳을 클릭하면 드롭다운이 닫히도록
window.onclick = function (event) {
  if (!event.target.matches(".profile-circle")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

// 제목 글자수 제한
function checkTitleLength(input) {
  const maxLength = 26;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
    alert("최대 26글자까지만 입력할 수 있습니다.");
  }
}

// 파일 등록
function displayFileName(input) {
  const fileInfo = document.getElementById('file-info');
  const fileName = input.files[0].name;
  fileInfo.textContent = fileName;
}

// 수정하기 버튼 클릭
document.addEventListener('DOMContentLoaded', function() {
  var editButton = document.querySelector('[type="edit-button"]');
  editButton.addEventListener('click', function() {
      alert('수정이 완료되었습니다.');
      window.location.href = '/post';
  });
});
