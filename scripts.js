function openModal() {
    const modal = document.querySelector('#modal');
    if (modal.classList.contains('modal-open')) {
        modal.classList.remove('modal-open');
    } else {
        modal.classList.add('modal-open');
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
  
const newPostForm = document.getElementById('newPost')
newPostForm.addEventListener('submit', (e) => {
    const post = {
        author: `Usuário #${getRandomInt(1000, 9999)}`,
        message: e.target.message.value,
        authorAvatar: `https://picsum.photos/${getRandomInt(200, 780)}`,
        postId: getRandomInt(100000, 999999)
    }
    postList.push(post)
    updateLocalStorage(postList)
    openModal()
})

function createPost(post) {
    const postList = document.querySelector('.postList')

    const p = document.createElement('p');
    p.classList.add('postMessage');
    p.textContent = post.message;

    const h3 = document.createElement('h3');
    h3.classList.add('postAuthorName');
    h3.textContent = post.author;

    const div = document.createElement('div');
    div.insertAdjacentElement('beforeend', h3);
    div.insertAdjacentElement('beforeend', p);

    const img = document.createElement('img');
    img.classList.add('postAuthorAvatar');
    img.src = post.authorAvatar;

    const li = document.createElement('li');
    li.classList.add('postItem');
    li.insertAdjacentElement('beforeend', img);
    li.insertAdjacentElement('beforeend', div);

    postList.insertAdjacentElement('afterbegin', li);
}

function updateLocalStorage(list) {
    localStorage.setItem('postList', JSON.stringify(postList));
}

const localStoragePostList = JSON.parse(localStorage.getItem('postList'));
let postList = localStorage.getItem('postList') !== null ? localStoragePostList : []

postList.forEach((post) => {
    createPost(post)
})
