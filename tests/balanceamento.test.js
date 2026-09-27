// Simula centenas de partidas completas com o conteúdo real para garantir que o jogo
// continue desafiador: não existe uma estratégia óbvia que sempre vence.

import { test } from "node:test";
import assert from "node:assert/strict";
import { novoJogo, jogarPartida, ESTRATEGIAS, aleatorioComSemente } from "./apoio/simulacao.js";

function distribuicao(partidas, dificuldade, estrategia) {
    const contagem = {};
    for (let semente = 1; semente <= partidas; semente++) {
        const escolher = typeof estrategia === "function" && estrategia.length === 0 ? estrategia() : estrategia;
        const jogo = jogarPartida(novoJogo({ semente, dificuldade }), escolher);
        contagem[jogo.final.tipo] = (contagem[jogo.final.tipo] || 0) + 1;
    }
    return contagem;
}

test("toda partida termina, em qualquer dificuldade e estratégia", () => {
    for (const dificuldade of ["facil", "normal", "dificil"]) {
        for (let semente = 1; semente <= 50; semente++) {
            const jogo = jogarPartida(novoJogo({ semente, dificuldade }), ESTRATEGIAS.aleatoria(aleatorioComSemente(semente)));
            assert.equal(jogo.fase, "fim");
            assert.ok(jogo.final.titulo && Number.isFinite(jogo.final.pontos));
        }
    }
});

test("escolher sempre a opção com mais Maturidade não garante a excelência no Normal", () => {
    const resultado = distribuicao(200, "normal", ESTRATEGIAS.gananciosaMaturidade);
    assert.equal(resultado.excelencia || 0, 0, JSON.stringify(resultado));
    assert.ok((resultado.derrota || 0) > 0, "ignorar os recursos precisa ter risco de derrota");
});

test("a excelência é alcançável no Normal", () => {
    const resultado = distribuicao(200, "normal", ESTRATEGIAS.gananciosaRecursos);
    assert.ok((resultado.excelencia || 0) > 0, JSON.stringify(resultado));
});

test("jogar no acaso raramente leva ao Nível 5", () => {
    const aleatorio = aleatorioComSemente(42);
    const resultado = distribuicao(1000, "normal", ESTRATEGIAS.aleatoria(aleatorio));
    const nivel5 = (resultado.excelencia || 0) + (resultado.vitoria || 0) + (resultado.apertada || 0);
    assert.ok(nivel5 / 1000 < 0.05, JSON.stringify(resultado));
});

test("a dificuldade muda a taxa de derrota: Fácil < Normal < Difícil", () => {
    const taxa = (dificuldade) => (distribuicao(200, dificuldade, ESTRATEGIAS.gananciosaMaturidade).derrota || 0) / 200;
    const [facil, normal, dificil] = ["facil", "normal", "dificil"].map(taxa);
    assert.ok(facil < normal && normal < dificil, JSON.stringify({ facil, normal, dificil }));
});
