let nomeUsuario = [];
let nome;
let mensagens;
let participantes;

function Nome(){
    nome = prompt("Qual o seu lindo nome ?");
    let obj = {
        name: nome
    }
    console.log(obj);

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", obj);
    promise.then(carregarSala);
    promise.catch(alertaErro);
    // nomeUsuario.push(obj);
}
Nome();

function alertaErro(error) {
    console.log(error.response.status);
      alert("Já existe um usuário online com esse nome!");
    Nome();
  }

function carregarSala(){
    buscarDados();
    setInterval(statusUsuario, 4000);
}

function buscarDados (){
    
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(buscarMensagens); 
    console.log(promise);
}


function statusUsuario(){
    let obj = {
        name: nome
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", obj);
}

function buscarMensagens(){
    
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(popularMensagens);
    // mensagens = promise.data;
// console.log(mensagens);
// console.log(promise.data);
}


function popularMensagens(resposta){

    if(resposta.status === 200){
        console.log("Deuuu boooom");
    }
    mensagens = resposta.data;
    renderizarMensagens();
}

function renderizarMensagens(){
    let ulChat = document.querySelector("ul");
    
    for(let i = 0; i < mensagens.length; i++){
        
        if(mensagens[i].type === "status"){
            ulChat.innerHTML += `
            <li class="mensagem entrou-saiu">
                <p>${mensagens[i].time} - <span>${mensagens[i].from}</span> - ${mensagens[i].text}</p>
            </li>
        `;
        }
        if(mensagens[i].type === "message"){
            
            ulChat.innerHTML += `
            <li class="mensagem pessoa-todos">
                <p>${mensagens[i].time} - <span>${mensagens[i].from}</span> para <span>${mensagens[i].to}</span> : ${mensagens[i].text}</p>
            </li>
        `;
        }
    }
    console.log("test");
}





function enviarMensagem(){
    let text = document.querySelector("textarea").value;
    
    const msg = {
        from: nome,
        to: "Todos",
        text: text,
        type: "message" 
    }

    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg);

    promisse.then(buscarDados);
}














// function buscarNomes(resposta){
//     console.log(resposta.data);
//     nomesServidor = resposta.data;
// }

// function verificarNome(){

//     for(let i = 0; i < nomesServidor.length; i++){
//         if(nomeUsuario[0] === nomesServidor[i]){
//             console.log(i);

//             return true;
//         }
//            return false;
//     }
// }


// function ponto(){
//     while(verificarNome){
//         prompt("Nome de usuário já está online, escolha outro!")
//         Nome();
//     }
// }