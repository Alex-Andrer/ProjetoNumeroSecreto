let listaNumerosSorteados = [];
let dificuldade = 10;
let numeroSecreto = gerarNumeroAleatorio(dificuldade);
let tentativa = 1;


function gerarNumeroAleatorio (dificuldade){
    let numeroEscolhido =  parseInt(Math.random() * (dificuldade) + 1);
    let qtdElementosLista = listaNumerosSorteados.length;

    if(qtdElementosLista == dificuldade){
        listaNumerosSorteados = {};
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    
    }
}

function exibirTextoTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML =  texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
function exibirMnesagemInicial (){
exibirTextoTela('h1', 'Jogo do número secreto');
exibirTextoTela('p', `Escolha um númmero entre 1 e ${dificuldade}`);
}
exibirMnesagemInicial();

let chute = document.getElementById('chutar').addEventListener('click', function(){
    verificaChute();
});

let reiniciar = document.getElementById('reiniciar').addEventListener('click', function(){
    reiniciarJogo();
});


verificaChute = () => {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoTela('h1', 'ACERTOU');
        let palavraTentiva = tentativa > 1 ? 'tentivas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativa} ${palavraTentiva}`;
        exibirTextoTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{

        if(chute > numeroSecreto){
            exibirTextoTela('p', 'O número secreto é menor');
        }else{
            exibirTextoTela('p', 'O número secreto é maior');
        }
        tentativa ++;
        limparCampo();
    }
}

function limparCampo(){
    chute =  document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio(dificuldade);
    limparCampo();
    tentativa = 1;
    exibirMnesagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}