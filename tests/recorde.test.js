import { test } from "node:test";
import assert from "node:assert/strict";
import { lerRecorde, registrarPontuacao } from "../js/nucleo/recorde.js";

function armazenamentoFalso() {
    const dados = new Map();
    return { getItem: (k) => (dados.has(k) ? dados.get(k) : null), setItem: (k, v) => dados.set(k, v) };
}

test("sem recorde salvo, o recorde é 0", () => {
    assert.equal(lerRecorde(armazenamentoFalso(), "normal"), 0);
});

test("registra novo recorde só quando a pontuação é maior", () => {
    const armazenamento = armazenamentoFalso();
    assert.deepEqual(registrarPontuacao(armazenamento, "normal", 200), { recorde: 200, anterior: 0, novoRecorde: true });
    assert.deepEqual(registrarPontuacao(armazenamento, "normal", 150), { recorde: 200, anterior: 200, novoRecorde: false });
    assert.equal(lerRecorde(armazenamento, "normal"), 200);
});

test("recordes são separados por dificuldade", () => {
    const armazenamento = armazenamentoFalso();
    registrarPontuacao(armazenamento, "dificil", 500);
    assert.equal(lerRecorde(armazenamento, "normal"), 0);
});

test("armazenamento indisponível não quebra o jogo", () => {
    const quebrado = { getItem: () => { throw new Error("bloqueado"); }, setItem: () => { throw new Error("bloqueado"); } };
    assert.equal(lerRecorde(quebrado, "normal"), 0);
    assert.equal(registrarPontuacao(quebrado, "normal", 100).recorde, 100);
    assert.equal(lerRecorde(undefined, "normal"), 0);
});

test("valor corrompido é tratado como 0", () => {
    const armazenamento = armazenamentoFalso();
    armazenamento.setItem("cmmi-missao-maturidade:recorde:normal", "abc");
    assert.equal(lerRecorde(armazenamento, "normal"), 0);
});
