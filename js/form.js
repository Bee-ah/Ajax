
const form = document.querySelector('#form');
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const rua = document.getElementById('rua');
const mensagem = document.querySelector('#mensagem');
const notNull = document.getElementsByClassName('not-null');

function isEmpty(elem){
    return elem.value.length < 1 ? `O campo <strong>${elem.name}</strong> não pode ser vazio.` : ''; 
}

function validaEmail(elem){
    //emailregex
    //pode fazer tanto no match quanto test
    return elem.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : `Digite um <strong>e-mail</strong> válido`;
}
//para validar cep
function validaCEP(elem){
    if(!elem.value.match(/^[0-9]{8}$/)) 
        return `Digite um <strong> CEP </strong> válido.`;
    else return '';
}

function updateAdress(data) {
    if( !('erro' in data)) {
        rua.value=(data.logradouro);
        bairro.value=(data.bairro);
        cidade.value=(data.localidade);
        uf.value=(data.uf);
        mensagem.innerHTML = '';
    } else {
        mensagem.innerHTML = `CEP não encontrado`;
    }
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    let msg = [];
    let markup = '';

   //pra pegar todos os elementos que tem essa classe
    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field);
        if(fieldState) 
            msg.push(fieldState);
    });
    //não é bom fazer muito uso de addEventListener = diminui a performance

    const isEmail = validaEmail(email);//validação do email
    if(isEmail) msg.push(isEmail); //se houver retorno , dá um push

    const isCEP = validaCEP(cep);
    if(isCEP.length > 0) {
        msg.push(isCEP);
    } else {  
        //injeção de script
        const script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/' + cep.value + '/json?callback=updateAdress';
        document.body.appendChild(script);//injeta o script no body
    }

    msg.forEach(item => {
        markup += `<p>${item}</p>` //retorna uma linha de parágrafo
    });

    
    if(msg.length == 0){
        form.submit(); //faz a o envio do formulário
    } 
    else{
        mensagem.innerHTML = markup;
    }

});