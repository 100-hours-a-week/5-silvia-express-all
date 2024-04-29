function goToPostPage() {
  window.location.href = "/post";
}

// 프로필 드롭박스
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

function logout() {
  fetch('http://localhost:3001/logout', {
      method: 'POST', // HTTP 메소드 지정
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: 'include' // 쿠키를 포함시키기 위해 필요
  })
  .then(response => {
      if(response.ok) {
          console.log('로그아웃 성공');
          // 로그아웃 성공 후 처리, 예를 들어 로그인 페이지로 리다이렉트
          window.location.href = '/login';
      } else {
          console.log('로그아웃 실패');
      }
  })
  .catch(error => console.error('로그아웃 중 에러 발생:', error));
}


// ------------------------ 여기부터 fetch  -----------------------

fetch('http://localhost:3001/api/posts')
  .then(response => response.json())
  .then(posts => {
    const html = Object.keys(posts)
      .map((postId) => {
        const {
          author,
          postImage,
          postTitle,
          postContents,
          views,
          likes,
          comments,
          date,
          authorImage,
        } = posts[postId];
        const commentCount = comments.length;
        const likeCommentViewsStr = `좋아요 ${likes} 댓글 ${commentCount} 조회수 ${views}`;
        return `
        <button class="post-card" onclick="window.location.href = '/post/${postId}'">
          <div class="card-top">
            <h2 class="post-title">${postTitle}</h2>
            <div class="like-date">
              <p class="like-comment">${likeCommentViewsStr}</p>
              <p class="post-date">${date}</p>
            </div>
          </div>
          <hr>
          <div class="author">
          <div class="gray-circle" style="background-image: url(${authorImage})"></div>
            <p class="author_name">${author}</p>
          </div>
        </button>
      `;
      })
      .join(''); 

    document.getElementById('json-container').innerHTML = html;
  });

