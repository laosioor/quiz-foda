const audio = document.getElementById("audio");
const disco = document.getElementsByClassName("disco");
const questao = document.getElementById("questao");
const escolhas = Array.from(document.getElementsByClassName('choice-text'));
const questaoBloco = document.getElementsByClassName('question');
const img = questaoBloco[0].getElementsByTagName('img')[0];
let contadorQ = 0;
let questaoAtual = {};
let questoesDispo = [
    {"tipo": "cena",
     "tema": "filme", 
     "nome": "pulp-fiction", 
     "questao": "De qual filme essas cenas são?", 
     "esc1": "Cães de Aluguel", 
     "esc2": "Fargo", 
     "esc3": "Os Bons Companheiros", 
     "esc4": "Pulp Fiction", 
     "correta": "4"},

    {"tipo": "disco",
     "tema": "musica",
     "nome": "audio",
     "questao": "Da onde é essa música?",
     "esc1": "Cu kkk",
     "esc2": "não sei",
     "esc3": "ãn?",
     "esc4": "Star Wars :D"}
    ];

//ajeitar path pra cada coisa, ajeitar a parada do disco tbm

var pathMus = 'http://127.0.0.1:5500/conteudo/musicas/';
var pathFil = 'http://127.0.0.1:5500/conteudo/filmes/';
var pathSer = 'http://127.0.0.1:5500/conteudo/series/';
var pathJog = 'http://127.0.0.1:5500/conteudo/jogos/';
var pathArt = 'http://127.0.0.1:5500/conteudo/artes/';

qualPath = (tema) => {
    switch (tema) {
        case "filme":
            return pathFil;
            break;
        case "serie":
            return pathSer;
            break;
        case "jogo":
            return pathJog;
            break;
        default:
            return null;
            break;
    }
}

revelaResp = () => {
    let escondResp = document.getElementsByClassName('hidden-answer');
    Array.prototype.forEach.call(escondResp, function(el) {
        el.style.color = 'white';
    });
}
mudaCena = (e) => {
    let nome = questaoAtual.nome;
    let cena = e.target;
    let path = qualPath(questaoAtual.tema);
    switch(cena.src) {
        case (`${path}${nome}.jpeg`): 
            cena.src = `${path}${nome}1.jpeg`;
            break
        case (`${path}${nome}1.jpeg`):
            cena.src = `${path}${nome}2.jpeg`;
            break
        case (`${path}${nome}2.jpeg`):
            revelaResp();
            break
        default:
            break
    }
}

rodaDisco = () => {
    if (!audio.paused){
        console.log(audio.currentTime);
    } else {
        console.log("começou");
        audio.play();
        if (!disco[0].classList.contains("gira-gira")) {
            disco[0].classList.add("gira-gira");
        } 
    }
}

pausouMusica = () => {
    disco[0].classList.remove("gira-gira");
    setTimeout(function() {
        revelaResp();
    }, 1000) // ou isso, ou ativa um listener que quando apertar um botão libera as respostas
}

pegaQuestão = () => {
    contadorQ++;
    const indexQ = Math.floor(Math.random() * questoesDispo.length);
    questaoAtual = questoesDispo[indexQ];

    
    img.classList.remove('hidden');
    switch(questaoAtual.tipo) {
        case ("cena"):
            img.src = `${pathFil}${questaoAtual.nome}.jpeg`;
            img.classList.add('cena');
            img.addEventListener('click', (null, mudaCena));
            break;
        case ("disco"):
            img.src = `${pathMus}disco.png`;
            audio.src = `${pathMus}audio.wav`;
            audio.addEventListener('pause', (null, pausouMusica));
            img.classList.add('disco');
            img.addEventListener('click', (null, rodaDisco));
            break;
        default:
            break;
    }
    questao.innerHTML = questaoAtual.questao;
    console.log(questao);

    escolhas.forEach((escolha) => {
        const numero = escolha.dataset['number'];
        escolha.innerHTML = questaoAtual['esc' + numero];
    });
    questoesDispo.splice(indexQ, 1);
};

pegaQuestão();