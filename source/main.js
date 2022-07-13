function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function toggleModal () {
    const modal = document.querySelector('#modal');
    if (modal.classList.contains('modal-open')) {
        modal.classList.remove('modal-open');
    } else {
        modal.classList.add('modal-open');
    }
}
  
const insertPost = (post) => {
    const postList = document.querySelector('.postList')

    const closeButton = document.createElement('button');
    closeButton.classList.add('button');
    closeButton.classList.add('btn-trash');
    closeButton.setAttribute('postid', post.postId);
    closeButton.addEventListener('click', () => removePost(post.postId));

    const postMessage = document.createElement('p');
    postMessage.classList.add('postMessage');
    postMessage.textContent = post.message;

    const postAuthorName = document.createElement('h3');
    postAuthorName.classList.add('postAuthorName');
    postAuthorName.textContent = post.author;

    const div = document.createElement('div');
    div.insertAdjacentElement('beforeend', postAuthorName);
    div.insertAdjacentElement('beforeend', postMessage);

    const postAuthorAvatar = document.createElement('img');
    postAuthorAvatar.classList.add('postAuthorAvatar');
    postAuthorAvatar.src = post.authorAvatar;

    const postItem = document.createElement('li');
    postItem.classList.add('postItem');
    postItem.insertAdjacentElement('beforeend', postAuthorAvatar);
    postItem.insertAdjacentElement('beforeend', div);
    postItem.insertAdjacentElement('beforeend', closeButton);

    postList.insertAdjacentElement('afterbegin', postItem);
}

const updateLocalStorage = (list) => {
    localStorage.setItem('postList', JSON.stringify(list));
    location.reload(true);
}

const localStoragePostList = JSON.parse(localStorage.getItem('postList'));
let postList = localStorage.getItem('postList') !== null ? localStoragePostList : [{
    author: 'Boas vindas!',
    message: 'Seja o primeiro à publicar aqui.',
    authorAvatar: 'https://picsum.photos/200',
    postId: 777
}]

console.log(postList)

postList.forEach((post) => {
    insertPost(post)
})

const postForm = document.getElementById('newPost')
postForm.addEventListener('submit', addNewPost)

function addNewPost(e) {
    const post = {
        author: `Usuário #${getRandomInt(1000, 9999)}`,
        message: e.target.message.value,
        authorAvatar: `https://picsum.photos/${getRandomInt(200, 780)}`,
        postId: getRandomInt(100000, 999999)
    }
    postList.push(post)
    updateLocalStorage(postList)
}

function removePost(post) {
    postList.forEach(itemPost => {
        if (post === itemPost.postId) {
            let index = postList.indexOf(itemPost);
            postList.splice(index, 1);
            updateLocalStorage(postList)
        }
    })
}

function cleanPosts() {
    localStorage.clear()
    location.reload()
}