// Ponto de entrada: liga o motor do jogo aos componentes de interface.
// Cada ação do jogador chama o motor e depois redesenha a tela da fase atual.

import { CAPITULOS } from "./dados/capitulos.js";
import { CRISES } from "./dados/crises.js";
import { DESAFIO_FINAL } from "./dados/desafio-final.js";
import { Jogo } from "./nucleo/motor.js";
import { registrarPontuacao } from "./nucleo/recorde.js";
import { $, mostrarTela } from "./ui/dom.js";
import { montarHud, renderizarHud } from "./ui/hud.js";
import { montarHabilidades, renderizarHabilidades, mostrarMensagem } from "./ui/habilidades.js";
import { renderizarCapitulo } from "./ui/capitulo.js";
import { renderizarEvento, atualizarPrevias } from "./ui/evento.js";
import { renderizarResultado } from "./ui/resultado.js";
import { renderizarFim } from "./ui/fim.js";
import { montarDificuldades, dificuldadeEscolhida, renderizarRecorde } from "./ui/inicio.js";

function obterArmazenamento() {
    try {
        return window.localStorage;
    } catch {
        return undefined;
    }
}

const armazenamento = obterArmazenamento();
let jogo = null;

function renderizar() {
    switch (jogo.fase) {
        case "capitulo":
        case "desafio":
            renderizarCapitulo(jogo);
            return;
        case "decisao":
            mostrarTela("tela-jogo");
            renderizarEvento(jogo, decidir);
            mostrarMensagem(jogo.estado.reservaAtiva ? "Reserva de Orçamento ativa: a próxima perda de orçamento será evitada." : "");
            break;
        case "resultado":
            renderizarResultado(jogo);
            mostrarMensagem("");
            break;
        case "fim":
            renderizarFim(jogo, registrarPontuacao(armazenamento, jogo.estado.dificuldade, jogo.final.pontos));
            return;
    }
    renderizarHud(jogo);
    renderizarHabilidades(jogo);
}

function iniciarJogo() {
    jogo = new Jogo({ capitulos: CAPITULOS, crises: CRISES, desafioFinal: DESAFIO_FINAL, dificuldade: dificuldadeEscolhida() });
    renderizar();
}

function decidir(indice) {
    if (jogo.decidir(indice)) renderizar();
}

function usarHabilidade(chave) {
    const mensagem = jogo.usarHabilidade(chave);
    if (!mensagem) return;
    mostrarMensagem(mensagem);
    atualizarPrevias(jogo);
    renderizarHud(jogo);
    renderizarHabilidades(jogo);
}

montarHud();
montarHabilidades(usarHabilidade);
montarDificuldades(armazenamento);

$("botao-iniciar").addEventListener("click", iniciarJogo);
$("botao-reiniciar").addEventListener("click", iniciarJogo);
$("botao-comecar-capitulo").addEventListener("click", () => jogo.comecarEtapa() && renderizar());
$("botao-proximo").addEventListener("click", () => jogo.avancar() && renderizar());
$("botao-como-jogar").addEventListener("click", () => mostrarTela("tela-como-jogar"));
document.querySelectorAll(".botao-voltar").forEach((botao) => {
    botao.addEventListener("click", () => {
        renderizarRecorde(armazenamento);
        mostrarTela("tela-inicial");
    });
});
