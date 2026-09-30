import { test } from "node:test";
import assert from "node:assert/strict";
import { calcularFinal, calcularPontuacao } from "../js/nucleo/finais.js";

const estado = (indicadores, extra = {}) => ({
    dificuldade: "normal",
    metasAlcancadas: 5,
    desfecho: null,
    noDesafioFinal: true,
    indicadores: { maturidade: 15, qualidade: 7, prazo: 7, orcamento: 7, moral: 7, ...indicadores },
    ...extra
});

test("excelência exige todos os indicadores em 6 ou mais, inclusive a moral", () => {
    assert.equal(calcularFinal(estado({})).tipo, "excelencia");
    assert.equal(calcularFinal(estado({ moral: 5 })).tipo, "vitoria");
});

test("vitória apertada quando algum indicador está em 3 ou menos", () => {
    assert.equal(calcularFinal(estado({ orcamento: 3 })).tipo, "apertada");
});

test("derrota tem prioridade sobre qualquer desfecho", () => {
    assert.equal(calcularFinal(estado({ prazo: 0 }, { desfecho: "reprovado" })).tipo, "derrota");
});

test("final por nível quando a campanha termina sem 15 de Maturidade", () => {
    const final = calcularFinal(estado({ maturidade: 10 }, { noDesafioFinal: false }));
    assert.equal(final.tipo, "nivel");
    assert.match(final.titulo, /Nível 3/);
});

test("derrota comum não menciona o Nível 5", () => {
    const final = calcularFinal(estado({ qualidade: 0 }, { noDesafioFinal: false }));
    assert.doesNotMatch(final.titulo, /Nível 5/);
});

test("pontuação cresce com o resultado e com a dificuldade", () => {
    const normal = calcularPontuacao(estado({}));
    const dificil = calcularPontuacao(estado({}, { dificuldade: "dificil" }));
    const facil = calcularPontuacao(estado({}, { dificuldade: "facil" }));
    const apertada = calcularPontuacao(estado({ orcamento: 2 }));
    assert.ok(dificil > normal && normal > facil);
    assert.ok(normal > apertada);
});

test("em derrota, os indicadores restantes não somam pontos", () => {
    const a = calcularPontuacao(estado({ qualidade: 0, prazo: 10 }, { noDesafioFinal: false }));
    const b = calcularPontuacao(estado({ qualidade: 0, prazo: 1 }, { noDesafioFinal: false }));
    assert.equal(a, b);
});
