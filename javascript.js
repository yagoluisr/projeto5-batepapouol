let nome;
let mensagens;

function Nome(){
    nome = prompt("Qual o seu lindo nome ?");
    let obj = {
        name: nome
    }
    console.log(obj);

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", obj);
    promise.then(carregarSala);
    promise.catch(alertaErro);
    
}
Nome();

function alertaErro(error) {
    console.log(error.response.status);
      alert("Já existe um usuário online com esse nome!");
    Nome();
  }

function carregarSala(){
    buscarDados();
    setInterval(buscarDados, 3000);
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
    promise.then(renderizarMensagens);
}

function reload(){
    window.location.reload();
}

let ulChat;

function renderizarMensagens(resposta){
    mensagens = resposta.data;
    let ulChat = document.querySelector("ul");
    
    ulChat.innerHTML = "";
    
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
        if(mensagens[i].type === "private_message" && (mensagens[i].to === nome || mensagens[i].from === nome)){
            
            ulChat.innerHTML += `
            <li class="mensagem reservadamente">
                <p>${mensagens[i].time} - <span>${mensagens[i].from}</span> reservadamente para <span>${mensagens[i].to}</span> : ${mensagens[i].text}</p>
            </li>
        `;
        }
    }
    scrollToBottom();
}

function enviarMensagem(){

    let text = document.querySelector("textarea").value;
    document.querySelector("textarea").value = "";
    const msg = {
        from: nome,
        to: "Todos",
        text: text,
        type: "message" 
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg);

    promise.then(buscarDados);
    promise.catch(reload);

    
}

function scrollToBottom() {
    let ultimaMsg = document.querySelector(".chat").lastElementChild;
    ultimaMsg.scrollIntoView();
  }