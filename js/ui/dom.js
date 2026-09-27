// Utilitários de DOM compartilhados pelos componentes de interface.

import { INDICADORES, NOMES_INDICADORES } from "../dados/config.js";

export const $ = (id) => document.getElementById(id);

export function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach((tela) => tela.classList.remove("ativa"));
    const tela = $(id);
    tela.classList.add("ativa");
    window.scrollTo(0, 0);
    focar(tela.querySelector("h1, h2"));
}

// Leva o foco do teclado (e do leitor de tela) para o novo conteúdo.
export function focar(elemento) {
    elemento?.focus({ preventScroll: true });
}

export function alternar(elemento, visivel) {
    elemento.classList.toggle("oculto", !visivel);
}

export function formatarEfeito(valor) {
    return valor > 0 ? `+${valor}` : `${valor}`;
}

// comSinal: mostra variações (+1/-2) e esconde as nulas; sem sinal: mostra valores absolutos.
export function criarChips(container, valores, comSinal) {
    container.replaceChildren();
    INDICADORES.forEach((chave) => {
        const valor = valores[chave];
        if (valor === undefined || (comSinal && valor === 0)) return;

        const chip = document.createElement("span");
        chip.className = "chip";
        if (comSinal) chip.classList.add(valor > 0 ? "positivo" : "negativo");
        chip.textContent = `${NOMES_INDICADORES[chave]} ${comSinal ? formatarEfeito(valor) : valor}`;
        container.appendChild(chip);
    });
}

export function preencherLista(lista, itens, criar = (texto) => texto) {
    lista.replaceChildren(
        ...itens.map((item) => {
            const li = document.createElement("li");
            const conteudo = criar(item);
            if (typeof conteudo === "string") li.textContent = conteudo;
            else li.append(...[].concat(conteudo));
            return li;
        })
    );
}
