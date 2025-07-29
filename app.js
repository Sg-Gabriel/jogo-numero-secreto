let listaNumSorteado = [];
let numeroLimite = 100;
let numSecreto = gerarNum();
let tentativas = 1;
let teclaEnter = true;

console.log(numSecreto);

mensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}
function mensagemInicial() {
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}`);

}
document.addEventListener("keypress", function(e) {
    
    if(e.key === "Enter" && teclaEnter == true) {
         return verificarChute();
    }
})

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numSecreto) {

        let palavratentativa = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavratentativa}`;
        exibirTextoNaTela("h1", "Você acertou!");
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("chute").setAttribute("disabled", true);
        document.getElementById("reiniciar").removeAttribute("disabled");
        teclaEnter = false;
    }
    else {
        if (chute > numSecreto && chute <= numeroLimite) {
            exibirTextoNaTela("h1", `O número é menor do que ${chute}`);
        }
        else {
            if (chute < numSecreto && chute != "" && chute > 0) {
                exibirTextoNaTela("h1", `O número é maior do que ${chute}`);
            } else {
                if (chute > numeroLimite) {
                    exibirTextoNaTela("h1", "número inválido");
                    exibirTextoNaTela("p", "Escolha um número entre 1 e " + numeroLimite);
                } else {
                    exibirTextoNaTela("h1", "Digite um número para jogar");
                    tentativas = 0;
                }
            }
        }

    }
    tentativas++;
    limparCampo();

}

function gerarNum() {
    let numEscolhidoAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantDeElementNaLista = listaNumSorteado.length;

    if (quantDeElementNaLista == numeroLimite) {
        listaNumSorteado = [];
    }

    if (listaNumSorteado.includes(numEscolhidoAleatorio)) {
        return gerarNum();
    } else {
        listaNumSorteado.push(numEscolhidoAleatorio);
        return numEscolhidoAleatorio;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}
function reiniciarJogo() {
    numSecreto = gerarNum();
    limparCampo();
    tentativas = 0;
    mensagemInicial();
    verificarChute();
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("chute").removeAttribute("disabled");
    teclaEnter = true;
}