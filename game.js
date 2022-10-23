var audio = document.getElementById("audio");
var disco = document.getElementById("disco");
var EntretenimentoQ = [{"tipo": "cena", "tema": "filme", "pergunta": "De qual filme ganhador do prêmio Melhor Roteiro Original essas cenas são?", "resp1": "cu"}, {"tipo":"questão"}, {"tipo": "imagem"}];
localStorage.MusicaQuestoes = JSON.stringify(MusicaQuestoes);
var path = 'http://127.0.0.1:5500/imagens/entretenimento/';
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
    
    console.log(localStorage.MusicaQuestoes);
}

pegaQuestão();



revelaResp = () => {
    let escondResp = document.getElementsByClassName('hidden-answer');
    Array.prototype.forEach.call(escondResp, function(el) {
        el.style.color = 'black';
    });
}
mudaCena = (cena) => {
    let nome = 'pulp-fiction';
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