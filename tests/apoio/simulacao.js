// Utilitários para simular partidas completas nos testes.

import { Jogo } from "../../js/nucleo/motor.js";
import { CAPITULOS } from "../../js/dados/capitulos.js";
import { CRISES } from "../../js/dados/crises.js";
import { DESAFIO_FINAL } from "../../js/dados/desafio-final.js";

// Gerador pseudoaleatório com semente (mulberry32), para testes reproduzíveis.
export function aleatorioComSemente(semente) {
    let a = semente >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function novoJogo({ semente = 1, dificuldade = "normal", capitulos = CAPITULOS, crises = CRISES } = {}) {
    return new Jogo({ capitulos, crises, desafioFinal: DESAFIO_FINAL, dificuldade, aleatorio: aleatorioComSemente(semente) });
}

// Joga uma partida inteira. `escolher(jogo)` devolve o índice da opção visível.
export function jogarPartida(jogo, escolher, { antesDeDecidir } = {}) {
    let passos = 0;
    while (jogo.fase !== "fim") {
        if (++passos > 500) throw new Error("Partida não terminou");
        if (jogo.fase === "capitulo" || jogo.fase === "desafio") jogo.comecarEtapa();
        else if (jogo.fase === "decisao") {
            antesDeDecidir?.(jogo);
            jogo.decidir(escolher(jogo));
        } else if (jogo.fase === "resultado") jogo.avancar();
    }
    return jogo;
}

const soma = (efeitos) => Object.values(efeitos).reduce((a, b) => a + b, 0);

function melhorPor(jogo, pontuar) {
    const opcoes = jogo.estado.opcoesVisiveis;
    let melhor = 0;
    opcoes.forEach((opcao, i) => {
        if (pontuar(jogo.calcularEfeitos(opcao).efeitos, opcao) > pontuar(jogo.calcularEfeitos(opcoes[melhor]).efeitos, opcoes[melhor])) melhor = i;
    });
    return melhor;
}

export const ESTRATEGIAS = {
    // Sempre a opção que mais aumenta a Maturidade agora (desempate pela soma dos efeitos).
    gananciosaMaturidade: (jogo) =>
        melhorPor(jogo, (efeitos, opcao) => (opcao.desfecho ? -100 : 0) + (efeitos.maturidade || 0) * 100 + soma(efeitos)),
    // Sempre a opção com maior soma imediata dos efeitos.
    gananciosaRecursos: (jogo) => melhorPor(jogo, (efeitos, opcao) => (opcao.desfecho ? -100 : 0) + soma(efeitos)),
    aleatoria: (aleatorio) => (jogo) => Math.floor(aleatorio() * jogo.estado.opcoesVisiveis.length)
};
