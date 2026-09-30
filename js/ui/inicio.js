// Tela inicial: escolha de dificuldade e recorde.

import { DIFICULDADES, DIFICULDADE_PADRAO } from "../dados/config.js";
import { lerRecorde } from "../nucleo/recorde.js";
import { $ } from "./dom.js";

export function montarDificuldades(armazenamento) {
    $("opcoes-dificuldade").replaceChildren(
        ...Object.entries(DIFICULDADES).map(([chave, dificuldade]) => {
            const rotulo = document.createElement("label");
            rotulo.className = "dificuldade";

            const entrada = document.createElement("input");
            entrada.type = "radio";
            entrada.name = "dificuldade";
            entrada.value = chave;
            entrada.checked = chave === DIFICULDADE_PADRAO;
            entrada.addEventListener("change", () => renderizarRecorde(armazenamento));

            const nome = document.createElement("strong");
            nome.textContent = dificuldade.nome;
            const descricao = document.createElement("small");
            descricao.textContent = dificuldade.descricao;

            rotulo.append(entrada, nome, descricao);
            return rotulo;
        })
    );
    renderizarRecorde(armazenamento);
}

export function dificuldadeEscolhida() {
    return document.querySelector('input[name="dificuldade"]:checked')?.value || DIFICULDADE_PADRAO;
}

export function renderizarRecorde(armazenamento) {
    const dificuldade = dificuldadeEscolhida();
    const recorde = lerRecorde(armazenamento, dificuldade);
    $("recorde-inicial").textContent = recorde
        ? `🏆 Recorde no ${DIFICULDADES[dificuldade].nome}: ${recorde} pontos`
        : "";
}
