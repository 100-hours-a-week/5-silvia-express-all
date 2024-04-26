var currentUrl = window.location.href;

// URL에서 마지막 '/'를 찾아서 그 뒤의 부분을 postId로 설정합니다.
var postId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

console.log(postId);


function goToPostPage() {
  window.location.href = "/post";
}


let currentCommentText = "";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3001/api/posts");
    const data = await response.json();

    function formatViews(views) {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "M";
      } else if (views >= 100000) {
        return (views / 1000).toFixed(0) + "k";
      } else if (views >= 10000) {
        return (views / 1000).toFixed(1) + "k";
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "k";
      } else {
        return views.toString();
      }
    }

    const post = data[postId];
    if (post) {
      const postDetails = `
        <div class="post-top">
            <h2>${post.postTitle}</h2>
            <div class="post-detail">
            <div class="gray-circle" style="background-image: url(${post.authorImage})"></div>
                <div class="author">${post.author}</div>
                <p>${post.date}</p>
                <div class="buttons">
                    <button id="edit-button" onclick="window.location.href = 'post-edit.html'">수정</button>
                    <button id="account-delete-button">삭제</button>
                    <div class="withdraw_modal hidden">
            <div class="modal_overlay"></div>
            <div class="modal_content">
                <h3>게시글을 삭제하시겠습니까?</h3>
                <p>삭제한 내용은 복구할 수 없습니다.</p>
                <div class="modal-buttons">
                    <button id="withdraw-modal-cancel">취소</button>
                    <button id="withdraw-modal-submit">확인</button>
                </div>
            </div>
        </div>
                </div>
            </div>
        </div>
        <hr class="post-line" />
        <div class="post-content">
            <div class="post-image" style="width: 544px; height: 306px; overflow: hidden;">
                <img src="${post.postImage}" alt="Post Image" style="width: 100%; height: auto;">
            </div>
            <div class="post-content-text">
                ${post.postContents}
            </div>
        
            <div class="post-count">
                <div class="view-count">
                <div class="bold-text">${formatViews(post.views)}</div>
                    <div>조회수</div>
                </div>
                <div class="comment-count">
                    <div class="bold-text">${formatViews(post.comments.length)}</div>
                    <div>댓글</div>
                </div>
            </div>
        </div>
        <hr class="post-line" />
      `;
      document.getElementById("post-container").innerHTML = postDetails;

      // 댓글 생성
      const commentContainer = document.getElementById("comment-container");
      post.comments.forEach((comment) => {
        const commentDetails = `
        
          <div class="comment">
            <div class="comment-author">
            <div class="gray-circle" style="background-image: url(${comment.commenterImage})"></div>
              <div class="comment-author-name">${comment.commenter}</div>
              <div class="comment-date">${comment.commentDate}</div>
            </div>
            <!-- 댓글 버튼!@!!! -->
        <div class="comment-content">
          <p>${comment.commentText}</p>
          <div class="comment-button">
            <button class="comment-edit-button-${comment.commentId}" onclick="saveCommentText('${comment.commentText}')">
              수정
            </button>
            <!-- 댓글 모달!@!!! -->
            <button class="comment-delete-button-${comment.commentId}">삭제</button>
            <div class="comment_withdraw_modal hidden">
                <div class="modal_overlay"></div>
                <div class="modal_content">
                    <h3>댓글을 삭제하시겠습니까?</h3>
                    <p>삭제한 내용은 복구할 수 없습니다.</p>
                    <div class="modal-buttons">
                        <button id="comment-withdraw-modal-cancel">취소</button>
                        <button id="comment-withdraw-modal-submit">확인</button>
                    </div>
                </div>
            </div>
          </div>
        `;
        commentContainer.innerHTML += commentDetails;
      });

      // 모달
      const openButton = document.getElementById("account-delete-button");
      const post_modal = document.querySelector(".withdraw_modal");
      const closeBtn = document.getElementById("withdraw-modal-cancel");
      const submitBtn = document.getElementById("withdraw-modal-submit");

      const openModal = () => {
        post_modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      };
      const closeModal = () => {
        post_modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      };

      // 모달 - 게시글 삭제
      const submitModal = async () => {
        try {
          const deleteResponse = await fetch(
            `http://localhost:3001/api/posts/${postId}`,
            {
              method: "DELETE",
            }
          );
          if (deleteResponse.ok) {
            alert("게시글이 삭제되었습니다.");
            window.location.href = "/post";
          } else {
            alert("게시글 삭제에 실패했습니다.");
          }
        } catch (error) {
          console.error("게시글 삭제 중 오류 발생:", error);
          alert("게시글 삭제 중 오류가 발생했습니다.");
        }
      };

      openButton.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);
      submitBtn.addEventListener("click", submitModal);

      // 댓글 수정버튼//////////

      const commentEditButtons = document.querySelectorAll(
        '[class^="comment-edit-button-"]'
      );
      commentEditButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const commentId = button.classList[0].replace(
            "comment-edit-button-",
            ""
          );
          const inputField = document.querySelector(".comment-input-field");
          const submitButton = document.querySelector(
            ".comment-submit-button button"
          );
          const commentContent =
            button.parentElement.parentElement.querySelector(
              ".comment-content p"
            );

          currentCommentText = commentContent.textContent.trim();

          inputField.value = currentCommentText;
          submitButton.textContent = "댓글 수정";
          submitButton.style.backgroundColor = "#ACA0EB";

          
          

          submitButton.onclick = () => {
            var submitButton = document.querySelector(".comment-submit-button button");

            printUserInput();
            inputField.placeholder = "댓글을 남겨주세요!";
            submitButton.textContent = "댓글 등록";
            alert("댓글 수정 완료!");
          };
        });
      });

      ///////////////////////
      // 여기부터 댓글  수정

      // document
      //   .getElementById('comment-edit-button')
      //   .addEventListener('click', function () {
      //     var inputField = document.querySelector('.comment-input-field');
      //     var commentText = '';
      //     var comments = document.querySelectorAll('.comment-content p');

      //     comments.forEach(function (comment) {
      //       if (
      //         comment.parentElement.querySelector('#comment-edit-button') ===
      //         this
      //       ) {
      //         commentText = comment.textContent.trim();
      //       }
      //     }, this);

      //     inputField.value = commentText;
      //     var submitButton = document.querySelector(
      //       '.comment-submit-button button'
      //     );
      //     var textarea = document.getElementById('comment_input');

      //     submitButton.textContent = '댓글 수정';
      //     submitButton.style.backgroundColor = '#ACA0EB';

      // submitButton.onclick = function () {
      //   console.log(commentText);
      //   inputField.value = '';
      //   inputField.placeholder = '댓글을 남겨주세요!';
      //   submitButton.textContent = '댓글 등록';
      //   alert('댓글 수정 완료!');
      // };

      //   });
      //////////////////

      //댓글모달
      // 댓글 삭제 버튼을 선택합니다.

      // const commentOpenButton = document.getElementById(
      //   'comment-delete-button'
      // );
      const commentModal = document.querySelector(".comment_withdraw_modal");
      const commentCloseBtn = document.getElementById(
        "comment-withdraw-modal-cancel"
      );
      const commentSubmitBtn = document.getElementById(
        "comment-withdraw-modal-submit"
      );

      const openCommentModal = () => {
        commentModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      };

      const closeCommentModal = () => {
        commentModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      };

      const submitCommentModal = () => {
        alert("댓글이 삭제되었습니다.");
        closeCommentModal();
        document.querySelector(".comment-input-field").value = "";
      };

      const commentOpenButton = document.querySelectorAll(
        '[class^="comment-delete-button-"]'
      );

      Array.from(commentOpenButton).forEach((button) => {
        const commentId = button.classList[0].replace("comment-delete-button-");
        button.addEventListener("click", () => {
          console.log(commentId);
          alert(`클릭했습니다. commentId: ${commentId}`);
          openCommentModal();
        });
      });

      // commentOpenButton.addEventListener('click', openCommentModal);
      commentCloseBtn.addEventListener("click", closeCommentModal);
      commentSubmitBtn.addEventListener("click", submitCommentModal);
    }
  } catch (error) {}
}

function saveCommentText(commentText) {
  currentCommentText = commentText;
  console.log(currentCommentText);
}

fetchData();

// 뒤로가기
function goBack() {
  window.history.back();
}

function printUserInput() {
  var textarea = document.getElementById('comment_input');
  var userInput = textarea.value;
  console.log(userInput);
}

// 댓글 버튼 색깔 변경
const commentInput = document.querySelector(".comment-input-field");

commentInput.addEventListener("input", function () {
  const comment = this.value.trim();
  const commentSubmitButton = document.querySelector(
    ".comment-submit-button button"
  );

  if (comment !== "") {
    commentSubmitButton.style.backgroundColor = "#7F6AEE";
  } else {
    commentSubmitButton.style.backgroundColor = "";
  }
});


// document.getElementById("comment_submit").addEventListener("click", function () {
//   // 댓글 입력 필드에서 입력값 가져오기
//   var commentInput = document.querySelector(".comment-input-field").value;
  
 

// 댓글 에럴트///////
document
  .getElementById("comment_submit")
  .addEventListener("click", function () {
    var submitButton = document.querySelector(".comment-submit-button button");
    if (submitButton.textContent === "댓글 등록") {
      alert("댓글 작성 완료!");
      const commentText = "새로운 댓글 텍스트";
      commentPost('2', commentText);
    }
    document.querySelector(".comment-input-field").value = "";
    var submitButton = document.querySelector(".comment-submit-button button");
    submitButton.style.backgroundColor = "#ACA0EB";
  });
  //////////////////

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
}


// 댓글 작성 함수

const commentPost = async (postId, commentText) => {
  try {
    const addCommentResponse = await fetch(
      `http://localhost:3001/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ commentText }) // Modify to use the provided commentText
      }
    );
    if (addCommentResponse.ok) {
      alert("댓글이 성공적으로 추가되었습니다.");
    } else {
      alert("댓글 추가에 실패했습니다.");
    }
  } catch (error) {
    console.error("댓글 추가 중 오류 발생:", error);
    alert("댓글 추가 중 오류가 발생했습니다.");
  }
}

// const commentPost = async () => {
//   try {
//     // 현재 존재하는 댓글 목록을 가져옵니다.
//     const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
//     const comments = await response.json();
//     const lastComment = comments[comments.length - 1];
//     const lastCommentId = lastComment.commentId;

//     // 새로운 댓글의 데이터를 구성합니다.
//     const newComment = {
//       commentId: lastCommentId + 1, // 이전 commentId에서 1을 더합니다.
//       commentText: "ㅋㅋㅋ", // 새로운 commentText
//       commenter: "KKS 공주님", // commenter 이름
//       commenterImage: "https://randomuser.me/api/portraits/women/4.jpg", // commenter 이미지
//       commentDate: "2024-04-02 09:10:33" // comment 날짜
//     };

//     // 댓글을 추가하는 요청을 보냅니다.
//     const postResponse = await fetch(
//       `http://localhost:3001/api/posts/${postId}/comments`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newComment)
//       }
//     );

//     // 요청의 성공 여부를 확인합니다.
//     if (postResponse.ok) {
//       console.log("댓글이 성공적으로 추가되었습니다.");
//     } else {
//       console.error("댓글 추가에 실패했습니다.");
//     }
//   } catch (error) {
//     console.error("오류 발생:", error);
//   }



