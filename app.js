let listaNumSorteado = [];
let limiteTentativa = 100;
let numSecreto = gerarNum();
let tentativas = 1;

mensagemInicial()

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}
function mensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e " + limiteTentativa);

}

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numSecreto) {

        let palavratentativa = tentativas == 1 ? "tentativa" : "tentativas";
        let mensagemTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavratentativa}`;
        exibirTextoNaTela("h1", "Você acertou!");
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("chute").setAttribute("disabled", true)
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else {
        if (chute > numSecreto && chute <= limiteTentativa) {
            exibirTextoNaTela("h1", `O número é menor do que ${chute}`);
        }
        else {
            if (chute < numSecreto && chute != "" && chute > 0) {
                exibirTextoNaTela("h1", `O número é maior do que ${chute}`);
            } else {
                if (chute > limiteTentativa) {
                    exibirTextoNaTela("h1", "número inválido");
                    exibirTextoNaTela("p", "Escolha um número entre 1 e " + limiteTentativa);
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
    let numEscolhidoAleatorio = parseInt(Math.random() * limiteTentativa + 1);
    let quantDeElementNaLista = listaNumSorteado.length;

    if (quantDeElementNaLista == limiteTentativa) {
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

}