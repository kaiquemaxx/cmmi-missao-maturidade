// Integridade do conteúdo: todo evento precisa ser jogável e coerente com as regras.

import { test } from "node:test";
import assert from "node:assert/strict";
import { CAPITULOS } from "../js/dados/capitulos.js";
import { CRISES } from "../js/dados/crises.js";
import { DESAFIO_FINAL } from "../js/dados/desafio-final.js";
import { INDICADORES, NOMES_TIPOS, META_MATURIDADE, MAXIMOS } from "../js/dados/config.js";

const EVENTOS = [...CAPITULOS.flatMap((c) => c.eventos), ...CRISES, DESAFIO_FINAL];

test("ids dos eventos são únicos", () => {
    const ids = EVENTOS.map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length);
});

test("capítulos numerados de 1 a 5 com metas crescentes até a meta final", () => {
    assert.deepEqual(CAPITULOS.map((c) => c.numero), [1, 2, 3, 4, 5]);
    CAPITULOS.forEach((c, i) => i > 0 && assert.ok(c.meta > CAPITULOS[i - 1].meta));
    assert.equal(CAPITULOS.at(-1).meta, META_MATURIDADE);
    assert.ok(META_MATURIDADE <= MAXIMOS.maturidade);
});

test("todas as crises têm tipo crise e os capítulos só têm situação e conhecimento", () => {
    CRISES.forEach((e) => assert.equal(e.tipo, "crise"));
    CAPITULOS.flatMap((c) => c.eventos).forEach((e) => assert.ok(["situacao", "conhecimento"].includes(e.tipo), e.id));
    assert.equal(DESAFIO_FINAL.tipo, "final");
});

for (const evento of EVENTOS) {
    test(`evento "${evento.id}" está completo`, () => {
        assert.ok(NOMES_TIPOS[evento.tipo]);
        ["titulo", "falante", "descricao"].forEach((campo) => assert.ok(evento[campo], campo));
        assert.ok(evento.opcoes.length >= 2 && evento.opcoes.length <= 3);

        evento.opcoes.forEach((opcao) => {
            ["texto", "resultado", "conceito", "explicacao"].forEach((campo) => assert.ok(opcao[campo], `${campo} em "${opcao.texto}"`));
            const efeitos = [opcao.efeitos, opcao.efeitoAtrasado?.efeitos, opcao.condicional?.efeitos].filter(Boolean);
            efeitos.forEach((e) => Object.keys(e).forEach((k) => assert.ok(INDICADORES.includes(k), `indicador ${k}`)));

            if (opcao.efeitoAtrasado) {
                assert.ok(opcao.efeitoAtrasado.eventos >= 1 && opcao.efeitoAtrasado.texto);
            }
            if (opcao.condicional) {
                assert.ok(INDICADORES.includes(opcao.condicional.indicador));
                assert.ok(opcao.condicional.texto);
            }
            if (opcao.desfecho) assert.ok(["reprovado", "ressalvas"].includes(opcao.desfecho));
        });
    });
}

// Uma opção "domina" outra quando é melhor ou igual em todos os indicadores e melhor em pelo menos um.
// Isso tira a decisão do jogador, então não pode acontecer com os efeitos imediatos (o que a Auditoria mostra).
test("nenhuma opção é melhor em tudo do que outra do mesmo evento", () => {
    const dominadas = [];
    EVENTOS.forEach((evento) =>
        evento.opcoes.forEach((a) =>
            evento.opcoes.forEach((b) => {
                if (a === b || a.desfecho !== b.desfecho) return;
                const valor = (o, k) => o.efeitos[k] || 0;
                const melhorOuIgual = INDICADORES.every((k) => valor(a, k) >= valor(b, k));
                const melhor = INDICADORES.some((k) => valor(a, k) > valor(b, k));
                if (melhorOuIgual && melhor) dominadas.push(`${evento.id}: "${a.texto}" domina "${b.texto}"`);
            })
        )
    );
    assert.deepEqual(dominadas, []);
});

test("o jogo usa as variáveis dinâmicas", () => {
    const opcoes = EVENTOS.flatMap((e) => e.opcoes);
    assert.ok(opcoes.filter((o) => o.efeitoAtrasado).length >= 15, "efeitos atrasados");
    assert.ok(opcoes.filter((o) => o.condicional).length >= 3, "efeitos condicionais");
    assert.ok(opcoes.filter((o) => "moral" in o.efeitos).length >= 15, "decisões que afetam a moral");
});

test("a opção honesta do desafio final não tem desfecho negativo", () => {
    assert.ok(DESAFIO_FINAL.opcoes.some((o) => !o.desfecho));
    assert.ok(DESAFIO_FINAL.opcoes.some((o) => o.desfecho === "reprovado"));
    assert.ok(DESAFIO_FINAL.opcoes.some((o) => o.desfecho === "ressalvas"));
});
