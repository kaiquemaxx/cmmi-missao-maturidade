// Cartão de consequência: efeitos da decisão, avisos, consequências atrasadas e explicação do conceito.

import { $, alternar, criarChips, focar, preencherLista } from "./dom.js";

export function renderizarResultado(jogo) {
    const resultado = jogo.estado.resultado;
    const { opcao } = resultado;

    $("resultado-titulo").textContent = opcao.texto;
    $("resultado-texto").textContent = opcao.resultado;
    criarChips($("resultado-efeitos"), resultado.efeitos, true);

    const avisos = [];
    if (resultado.condicional) avisos.push(`✨ ${resultado.condicional}`);
    if (resultado.moralPenalizou) avisos.push("😓 Com a moral baixa, a equipe absorveu menos a mudança: a Maturidade rendeu 1 ponto a menos.");
    if (resultado.reservaUsada) avisos.push("💰 A Reserva de Orçamento evitou a perda de orçamento desta decisão.");
    if (opcao.efeitoAtrasado) avisos.push("⏳ Esta decisão ainda terá consequências mais adiante.");
    preencherLista($("resultado-avisos"), avisos);

    alternar($("resultado-tardios"), resultado.tardios.length > 0);
    preencherLista($("resultado-tardios-lista"), resultado.tardios, (tardio) => {
        const texto = document.createElement("span");
        texto.textContent = `${tardio.texto} (decisão em "${tardio.origem}") `;
        const chips = document.createElement("span");
        chips.className = "efeitos efeitos-inline";
        criarChips(chips, tardio.efeitos, true);
        return [texto, chips];
    });

    $("explicacao-conceito").textContent = opcao.conceito;
    $("explicacao-texto").textContent = opcao.explicacao;
    $("botao-proximo").textContent = resultado.proximo;

    alternar($("cartao-evento"), false);
    alternar($("cartao-resultado"), true);
    window.scrollTo(0, 0);
    focar($("resultado-titulo"));
}
