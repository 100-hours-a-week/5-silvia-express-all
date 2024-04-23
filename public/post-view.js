const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

fetch('/post/api/posts')
  .then((response) => response.json())
  .then((data) => {
    function formatViews(views) {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
      } else if (views >= 100000) {
        return (views / 1000).toFixed(0) + 'k';
      } else if (views >= 10000) {
        return (views / 1000).toFixed(1) + 'k';
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k';
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
      document.getElementById('post-container').innerHTML = postDetails;

      // 댓글 생성
      const commentContainer = document.getElementById('comment-container');
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
            <button id="comment-edit-button">
              수정
            </button>
            <!-- 댓글 모달!@!!! -->
            <button id="comment-delete-button">삭제</button>
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
      const openButton = document.getElementById('account-delete-button');
      const post_modal = document.querySelector('.withdraw_modal');
      const closeBtn = document.getElementById('withdraw-modal-cancel');
      const submitBtn = document.getElementById('withdraw-modal-submit');

      const openModal = () => {
        post_modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      };
      const closeModal = () => {
        post_modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      };
      const submitModal = () => {
        alert('게시글이 삭제되었습니다.');
        window.location.href = 'index.html';
      };

      openButton.addEventListener('click', openModal);

      closeBtn.addEventListener('click', closeModal);
      submitBtn.addEventListener('click', submitModal);

      // 여기부터 ㅎㅎㅎ 댓글 관련임다 sdfsdfdsfasdfas
      document
        .getElementById('comment-edit-button')
        .addEventListener('click', function () {
          var inputField = document.querySelector('.comment-input-field');
          var commentText = ''; // Initialize an empty string
          var comments = document.querySelectorAll('.comment-content p'); // Select all comment paragraphs

          // Loop through each comment and check if it's the comment corresponding to the edit button clicked
          comments.forEach(function (comment) {
            if (
              comment.parentElement.querySelector('#comment-edit-button') ===
              this
            ) {
              commentText = comment.textContent.trim(); // Get the text content of the corresponding comment
            }
          }, this);

          inputField.value = commentText; // Set the placeholder with the comment text
          var submitButton = document.querySelector(
            '.comment-submit-button button'
          );
          var textarea = document.getElementById('comment_input');

          submitButton.textContent = '댓글 수정';
          submitButton.style.backgroundColor = '#ACA0EB';

          submitButton.onclick = function () {
            console.log(commentText);
            inputField.value = '';
            inputField.placeholder = '댓글을 남겨주세요!';
            submitButton.textContent = '댓글 등록';
            alert('댓글 수정 완료!');
          };
        });

      //댓글모달

      const commentOpenButton = document.getElementById(
        'comment-delete-button'
      );
      const commentModal = document.querySelector('.comment_withdraw_modal');
      const commentCloseBtn = document.getElementById(
        'comment-withdraw-modal-cancel'
      );
      const commentSubmitBtn = document.getElementById(
        'comment-withdraw-modal-submit'
      );

      const openCommentModal = () => {
        commentModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      };

      const closeCommentModal = () => {
        commentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      };

      const submitCommentModal = () => {
        alert('댓글이 삭제되었습니다.');
        closeCommentModal();
        document.querySelector('.comment-input-field').value = '';
      };

      commentOpenButton.addEventListener('click', openCommentModal);
      commentCloseBtn.addEventListener('click', closeCommentModal);
      commentSubmitBtn.addEventListener('click', submitCommentModal);
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    document.getElementById('postDetails').innerText =
      '데이터를 가져오는 중 오류가 발생했습니다.';
  });

// 뒤로가기
function goBack() {
  window.history.back();
}

// 댓글 버튼 색깔 변경
const commentInput = document.querySelector('.comment-input-field');

commentInput.addEventListener('input', function () {
  const comment = this.value.trim();
  const commentSubmitButton = document.querySelector(
    '.comment-submit-button button'
  );

  if (comment !== '') {
    commentSubmitButton.style.backgroundColor = '#7F6AEE';
  } else {
    commentSubmitButton.style.backgroundColor = '';
  }
});

// 댓글 에럴트
document
  .getElementById('comment_submit')
  .addEventListener('click', function () {
    var submitButton = document.querySelector('.comment-submit-button button');
    if (submitButton.textContent === '댓글 등록') {
      alert('댓글 작성 완료!');
    }
    document.querySelector('.comment-input-field').value = '';
    var submitButton = document.querySelector('.comment-submit-button button');
    submitButton.style.backgroundColor = '#ACA0EB';
  });

//드롭박스
function toggleDropdown() {
  var dropdown = document.getElementById('myDropdown');
  if (dropdown.style.display === 'none' || dropdown.style.display === '') {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';
  }
}

// 닫힌 상태에서 다른 곳을 클릭하면 드롭다운이 닫히도록
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
