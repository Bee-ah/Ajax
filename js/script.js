
const url = 'https://api.github.com/users';
const main = document.getElementById('main')
// let user = 'marcelocant'
let text = ''

function getUser(user) {

    fetch(`${url}/${user}`, { //passando apenas o primeiro parametro tem como padrão o metodo get
        method: 'GET', //passa informações adicionais
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            text += `<p>${data.name} possui ${data.public_repos} repositórios públicos no GitHub como ${data.login}</p>`
            main.innerHTML = text
        })
        .catch((error) => console.error('Erro: ', error.message || error))

}

const userInput = document.getElementById('username')

userInput.addEventListener('focusout', function(event){
    getUser(event.target.value)
})


