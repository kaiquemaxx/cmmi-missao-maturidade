import { test } from "node:test";
import assert from "node:assert/strict";
import {
    limitar, somarEfeitos, aplicarEfeitos, condicaoAtendida, ajustarPorMoral, indicadorZerado, nivelDeMaturidade
} from "../js/nucleo/efeitos.js";

const base = { maturidade: 0, qualidade: 5, prazo: 5, orcamento: 5, moral: 6 };

test("limitar mantém o valor entre 0 e o máximo", () => {
    assert.equal(limitar(-3, 10), 0);
    assert.equal(limitar(12, 10), 10);
    assert.equal(limitar(7, 10), 7);
});

test("somarEfeitos junta listas e descarta variações nulas", () => {
    assert.deepEqual(somarEfeitos({ prazo: 1, qualidade: 2 }, { prazo: -1, moral: 1 }, null), { qualidade: 2, moral: 1 });
});

test("aplicarEfeitos não altera o objeto original", () => {
    aplicarEfeitos(base, { prazo: 2 });
    assert.equal(base.prazo, 5);
});

test("aplicarEfeitos devolve apenas a variação real, depois do limite", () => {
    const { indicadores, aplicados } = aplicarEfeitos({ ...base, prazo: 9, qualidade: 10 }, { prazo: 2, qualidade: 1, orcamento: -1 });
    assert.equal(indicadores.prazo, 10);
    assert.deepEqual(aplicados, { prazo: 1, orcamento: -1 });
});

test("aplicarEfeitos rejeita indicador desconhecido", () => {
    assert.throws(() => aplicarEfeitos(base, { felicidade: 1 }), /Indicador desconhecido/);
});

test("condicaoAtendida respeita mínimo e máximo", () => {
    assert.equal(condicaoAtendida({ indicador: "moral", minimo: 6 }, base), true);
    assert.equal(condicaoAtendida({ indicador: "moral", minimo: 7 }, base), false);
    assert.equal(condicaoAtendida({ indicador: "prazo", maximo: 4 }, base), false);
    assert.equal(condicaoAtendida(undefined, base), false);
});

test("com moral baixa, ganhos de maturidade rendem 1 ponto a menos", () => {
    assert.deepEqual(ajustarPorMoral({ maturidade: 2, prazo: -1 }, 3), { efeitos: { maturidade: 1, prazo: -1 }, penalizado: true });
    assert.deepEqual(ajustarPorMoral({ maturidade: 1 }, 2), { efeitos: {}, penalizado: true });
    assert.deepEqual(ajustarPorMoral({ maturidade: 2 }, 4), { efeitos: { maturidade: 2 }, penalizado: false });
    assert.deepEqual(ajustarPorMoral({ maturidade: -1 }, 1), { efeitos: { maturidade: -1 }, penalizado: false });
});

test("indicadorZerado encontra o primeiro indicador crítico em 0, incluindo a moral", () => {
    assert.equal(indicadorZerado(base), null);
    assert.equal(indicadorZerado({ ...base, moral: 0 }), "moral");
    assert.equal(indicadorZerado({ ...base, maturidade: 0 }), null);
});

test("nivelDeMaturidade segue as faixas 6, 9, 12 e 15", () => {
    assert.deepEqual([0, 5, 6, 8, 9, 12, 14, 15].map(nivelDeMaturidade), [1, 1, 2, 2, 3, 4, 4, 5]);
});
