// Painel superior: indicadores, capítulo atual e consequências pendentes.

import { INDICADORES, NOMES_INDICADORES, MAXIMOS, INDICADORES_CRITICOS, LIMIAR_PERIGO } from "../dados/config.js";
import { $, alternar } from "./dom.js";

export function montarHud() {
    const container = $("indicadores");
    container.replaceChildren(
        ...INDICADORES.map((chave) => {
            const indicador = document.createElement("div");
            indicador.className = "indicador";
            indicador.dataset.indicador = chave;
            indicador.innerHTML = `
                <div class="indicador-topo">
                    <span>${NOMES_INDICADORES[chave]}</span>
                    <span class="indicador-valor"></span>
                </div>
                <div class="barra" role="progressbar" aria-label="${NOMES_INDICADORES[chave]}" aria-valuemin="0" aria-valuemax="${MAXIMOS[chave]}">
                    <div class="barra-preenchimento"></div>
                </div>`;
            return indicador;
        })
    );
}

export function renderizarHud(jogo) {
    const { estado } = jogo;

    document.querySelectorAll(".indicador").forEach((elemento) => {
        const chave = elemento.dataset.indicador;
        const valor = estado.indicadores[chave];
        const maximo = MAXIMOS[chave];

        elemento.querySelector(".indicador-valor").textContent = `${valor}/${maximo}`;
        elemento.querySelector(".barra-preenchimento").style.width = `${(valor / maximo) * 100}%`;
        elemento.querySelector(".barra").setAttribute("aria-valuenow", valor);
        elemento.classList.toggle("perigo", INDICADORES_CRITICOS.includes(chave) && valor <= LIMIAR_PERIGO);
    });

    const capitulo = jogo.capitulo;
    $("capitulo").textContent =
        estado.noDesafioFinal || !capitulo
            ? "Avaliação final"
            : `Capítulo ${capitulo.numero} – ${capitulo.nome} · Meta: ${capitulo.meta} de Maturidade`;

    const pendentes = estado.pendentes.length;
    $("pendentes").textContent = `⏳ ${pendentes} ${pendentes === 1 ? "consequência a caminho" : "consequências a caminho"}`;
    alternar($("pendentes"), pendentes > 0);
}
