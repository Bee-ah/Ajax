// import fetch from 'node-fetch'
//no javascript existe fetch e XMLHttpRequest, mais usado na programção AJAX.Fetch é mais limpo, evitando o multiplo uso de callbacks
let _data = {
    title: "teste de envio",
    body: "loren ipsum sit dolor amet consectur",
    userId: 5
}

const postContainer = document.getElementById('posts')
let postMarkup = ''
let postLength = 0

// Cadastra um post
function setPost(data) {

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),//transformando em string
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    })
    .then( response => response.json())
    .then( data => console.log(data))
    .catch(error => console.error(error))   //recomendado quando utilizar requisições assincronas
}

// Solicita todos os posts
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts/', {
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    })
    .then( response => response.json())
    .then( data => { 
        postLength = data.length
        console.log("Postlength é "+ postLength)
     })
    .catch(error => console.error(error))  
}

// Solicita um post por ID
function getPost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    })
    .then( response => response.json())
    .then( post => { 
            postMarkup += `
                <div class="posts-item" id="post-${post.id}">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `
            
        postContainer.innerHTML = postMarkup
     })
    .catch(error => console.error(error))  
}

let postIndex = 1;
getPosts()
getPost(postIndex)

const loadPost = document.getElementById('loadPost')

loadPost.addEventListener('click', function(e) {
    if(postIndex < postLength)
        getPost(postIndex += 1)
})
