// Montagem da campanha: cada partida sorteia quais crises aparecem e em quais capítulos.

import { CAPITULOS_COM_CRISE } from "../dados/config.js";

export function embaralhar(lista, aleatorio = Math.random) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(aleatorio() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// A crise nunca é o primeiro evento do capítulo: ela interrompe um capítulo já em andamento.
export function montarCampanha(capitulos, crises, quantidade, aleatorio = Math.random) {
    const qtd = Math.min(quantidade, crises.length, CAPITULOS_COM_CRISE.length);
    const sorteadas = embaralhar(crises, aleatorio).slice(0, qtd);
    const capitulosComCrise = embaralhar(CAPITULOS_COM_CRISE, aleatorio).slice(0, qtd);

    return capitulos.map((capitulo) => {
        const eventos = [...capitulo.eventos];
        const indice = capitulosComCrise.indexOf(capitulo.numero);
        if (indice >= 0) {
            const posicao = 1 + Math.floor(aleatorio() * eventos.length);
            eventos.splice(posicao, 0, sorteadas[indice]);
        }
        return { ...capitulo, eventos };
    });
}
