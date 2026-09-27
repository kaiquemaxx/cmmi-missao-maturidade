import { test } from "node:test";
import assert from "node:assert/strict";
import { embaralhar, montarCampanha } from "../js/nucleo/campanha.js";
import { CAPITULOS } from "../js/dados/capitulos.js";
import { CRISES } from "../js/dados/crises.js";
import { aleatorioComSemente } from "./apoio/simulacao.js";

test("embaralhar mantém os elementos e não altera a lista original", () => {
    const lista = [1, 2, 3, 4, 5];
    const resultado = embaralhar(lista, aleatorioComSemente(3));
    assert.deepEqual([...resultado].sort(), lista);
    assert.deepEqual(lista, [1, 2, 3, 4, 5]);
});

for (const quantidade of [1, 2, 3]) {
    test(`montarCampanha insere ${quantidade} crise(s) distintas, nunca no capítulo 1 nem como primeiro evento`, () => {
        for (let semente = 1; semente <= 200; semente++) {
            const campanha = montarCampanha(CAPITULOS, CRISES, quantidade, aleatorioComSemente(semente));
            const crises = campanha.flatMap((c) => c.eventos.filter((e) => e.tipo === "crise").map((e) => ({ id: e.id, cap: c.numero, pos: c.eventos.indexOf(e) })));

            assert.equal(crises.length, quantidade);
            assert.equal(new Set(crises.map((c) => c.id)).size, quantidade);
            assert.equal(new Set(crises.map((c) => c.cap)).size, quantidade, "no máximo uma crise por capítulo");
            crises.forEach((c) => {
                assert.notEqual(c.cap, 1);
                assert.ok(c.pos >= 1);
            });
        }
    });
}

test("a crise pode aparecer em qualquer posição depois da primeira, inclusive no fim do capítulo", () => {
    const posicoes = new Set();
    for (let semente = 1; semente <= 300; semente++) {
        montarCampanha(CAPITULOS, CRISES, 1, aleatorioComSemente(semente)).forEach((c) =>
            c.eventos.forEach((e, i) => e.tipo === "crise" && posicoes.add(i))
        );
    }
    assert.deepEqual([...posicoes].sort(), [1, 2, 3]);
});

test("montarCampanha não altera os capítulos originais", () => {
    const antes = CAPITULOS.map((c) => c.eventos.length);
    montarCampanha(CAPITULOS, CRISES, 3, aleatorioComSemente(9));
    assert.deepEqual(CAPITULOS.map((c) => c.eventos.length), antes);
});
