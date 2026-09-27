// Cartão do evento com as opções de decisão, e a prévia revelada pela Auditoria.

import { NOMES_TIPOS } from "../dados/config.js";
import { $, alternar, criarChips, focar } from "./dom.js";

export function renderizarEvento(jogo, aoDecidir) {
    const { estado } = jogo;
    const evento = jogo.evento;

    $("evento-tipo").textContent = NOMES_TIPOS[evento.tipo];
    $("evento-tipo").className = `etiqueta etiqueta-${evento.tipo}`;
    $("evento-progresso").textContent = estado.noDesafioFinal
        ? ""
        : `Evento ${estado.eventoAtual + 1} de ${jogo.capitulo.eventos.length}`;
    $("evento-titulo").textContent = evento.titulo;
    $("evento-falante").textContent = evento.falante;
    $("evento-descricao").textContent = evento.descricao;

    $("opcoes").replaceChildren(
        ...estado.opcoesVisiveis.map((opcao, indice) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "opcao";
            botao.addEventListener("click", () => aoDecidir(indice));

            const texto = document.createElement("span");
            texto.textContent = opcao.texto;

            const previa = document.createElement("span");
            previa.className = "opcao-previa efeitos oculto";

            botao.append(texto, previa);
            return botao;
        })
    );

    alternar($("cartao-resultado"), false);
    alternar($("cartao-evento"), true);
    atualizarPrevias(jogo);
    focar($("evento-titulo"));
}

// A prévia mostra os efeitos que realmente seriam aplicados agora (condições, moral e reserva incluídas).
export function atualizarPrevias(jogo) {
    const previas = document.querySelectorAll("#opcoes .opcao-previa");
    jogo.estado.opcoesVisiveis.forEach((opcao, indice) => {
        const previa = previas[indice];
        criarChips(previa, jogo.calcularEfeitos(opcao).efeitos, true);
        if (previa.childElementCount === 0) previa.textContent = "Sem efeito imediato";
        alternar(previa, jogo.estado.auditoriaUsada);
    });
}
