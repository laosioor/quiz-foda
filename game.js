const audio = document.getElementById("audio");
const disco = document.getElementById("disco");
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
     "questao": "De qual filme, ganhador do prêmio Melhor Roteiro Original essas cenas são?", 
     "esc1": "Cães de Aluguel", 
     "esc2": "Fargo", 
     "esc3": "Os Bons Companheiros", 
     "esc4": "Pulp Fiction", 
     "correta": "4"},

    {"tipo": "album",
     "tema": "musica",
     "nome": "dark-side-of-the-moon",
     "questao": "De qual banda é este álbum?",
     "esc1": "Led Zeppelin",
     "esc2": "Pink Floyd",
     "esc3": "Pixies",
     "esc4": "Radiohead"}
    ];



var path = 'http://127.0.0.1:5500/imagens/entretenimento/';



revelaResp = () => {
    let escondResp = document.getElementsByClassName('hidden-answer');
    Array.prototype.forEach.call(escondResp, function(el) {
        el.style.color = 'black';
    });
}
mudaCena = (e) => {
    let nome = questaoAtual.nome;
    let cena = e.target;
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
        if (!disco.classList.contains("gira-gira")) {
            disco.classList.add("gira-gira");
        }
    }
}

pausouMusica = () => {
    disco.classList.remove("gira-gira");
}

pegaQuestão = () => {
    contadorQ++;
    const indexQ = Math.floor(Math.random() * questoesDispo.length);
    questaoAtual = questoesDispo[indexQ];

    img.src = `${path}${questaoAtual.nome}.jpeg`;
    img.classList.remove('hidden');
    switch(questaoAtual.tipo) {
        case ("cena"):
            img.classList.add('cena');
            img.addEventListener('click', (null, mudaCena));
            break;
        case ("album"):
            img.classList.add('album');
            img.addEventListener('click', (null, revelaResp));
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
