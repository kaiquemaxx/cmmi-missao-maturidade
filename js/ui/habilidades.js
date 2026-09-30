// Botões de habilidades e a mensagem de retorno.

import { HABILIDADES } from "../dados/config.js";
import { $, alternar } from "./dom.js";

const ICONES = { auditoria: "🔍", reserva: "💰", replanejamento: "📅" };

export function montarHabilidades(aoUsar) {
    $("habilidades-botoes").replaceChildren(
        ...Object.entries(HABILIDADES).map(([chave, habilidade]) => {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "habilidade";
            botao.dataset.habilidade = chave;
            botao.title = habilidade.descricao;
            botao.append(`${ICONES[chave]} ${habilidade.nome} `);

            const usos = document.createElement("span");
            usos.className = "habilidade-usos";
            botao.appendChild(usos);

            botao.addEventListener("click", () => aoUsar(chave));
            return botao;
        })
    );
}

export function renderizarHabilidades(jogo) {
    document.querySelectorAll(".habilidade").forEach((botao) => {
        const chave = botao.dataset.habilidade;
        botao.querySelector(".habilidade-usos").textContent = `${jogo.estado.usos[chave]}x`;
        botao.disabled = !jogo.podeUsarHabilidade(chave);
        botao.classList.toggle("ativa", chave === "reserva" && jogo.estado.reservaAtiva);
    });
}

export function mostrarMensagem(texto) {
    const mensagem = $("habilidade-mensagem");
    mensagem.textContent = texto || "";
    alternar(mensagem, Boolean(texto));
}
