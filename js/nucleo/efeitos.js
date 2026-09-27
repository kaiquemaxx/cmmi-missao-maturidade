// Funções puras sobre indicadores e efeitos.

import { INDICADORES, MAXIMOS, INDICADORES_CRITICOS, MORAL_BAIXA } from "../dados/config.js";

export function limitar(valor, maximo) {
    return Math.max(0, Math.min(maximo, valor));
}

export function somarEfeitos(...listas) {
    const total = {};
    listas.forEach((efeitos) => {
        Object.entries(efeitos || {}).forEach(([chave, delta]) => {
            total[chave] = (total[chave] || 0) + delta;
        });
    });
    Object.keys(total).forEach((chave) => total[chave] === 0 && delete total[chave]);
    return total;
}

// Aplica os efeitos e devolve os novos indicadores e a variação que realmente aconteceu
// (depois de limitar entre 0 e o máximo).
export function aplicarEfeitos(indicadores, efeitos) {
    const novos = { ...indicadores };
    const aplicados = {};

    Object.entries(efeitos || {}).forEach(([chave, delta]) => {
        if (!INDICADORES.includes(chave)) throw new Error(`Indicador desconhecido: ${chave}`);
        novos[chave] = limitar(indicadores[chave] + delta, MAXIMOS[chave]);
        const real = novos[chave] - indicadores[chave];
        if (real !== 0) aplicados[chave] = real;
    });

    return { indicadores: novos, aplicados };
}

export function condicaoAtendida(condicional, indicadores) {
    if (!condicional) return false;
    const valor = indicadores[condicional.indicador];
    if (condicional.minimo !== undefined && valor < condicional.minimo) return false;
    if (condicional.maximo !== undefined && valor > condicional.maximo) return false;
    return true;
}

// Com a equipe desmotivada, os ganhos de maturidade rendem menos.
export function ajustarPorMoral(efeitos, moral) {
    const ajustados = { ...efeitos };
    if (moral <= MORAL_BAIXA && ajustados.maturidade > 0) {
        ajustados.maturidade -= 1;
        if (ajustados.maturidade === 0) delete ajustados.maturidade;
        return { efeitos: ajustados, penalizado: true };
    }
    return { efeitos: ajustados, penalizado: false };
}

export function indicadorZerado(indicadores) {
    return INDICADORES_CRITICOS.find((chave) => indicadores[chave] <= 0) || null;
}

export function nivelDeMaturidade(maturidade) {
    if (maturidade >= 15) return 5;
    if (maturidade >= 12) return 4;
    if (maturidade >= 9) return 3;
    if (maturidade >= 6) return 2;
    return 1;
}
