// Tela de fim de jogo: final da história, indicadores, pontuação e conceitos vistos.

import { DIFICULDADES } from "../dados/config.js";
import { $, criarChips, mostrarTela, preencherLista } from "./dom.js";

export function renderizarFim(jogo, recorde) {
    const { estado, final } = jogo;

    $("fim-titulo").textContent = final.titulo;
    $("fim-texto").textContent = final.texto;
    criarChips($("fim-indicadores"), estado.indicadores, false);

    $("fim-pontos").textContent = `${final.pontos} pontos · ${DIFICULDADES[estado.dificuldade].nome}`;
    let textoRecorde = "";
    if (recorde.novoRecorde) textoRecorde = "🏆 Novo recorde!";
    else if (recorde.recorde > 0) textoRecorde = `🏆 Recorde: ${recorde.recorde} pontos`;
    $("fim-recorde").textContent = textoRecorde;

    preencherLista($("fim-conceitos"), estado.conceitos);
    mostrarTela("tela-fim");
}
