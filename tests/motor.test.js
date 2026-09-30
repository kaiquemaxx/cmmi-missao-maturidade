import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { opcao, evento, capitulo, jogoDeTeste, indice, escolher } from "./apoio/fixtures.js";

const neutro = (id) => evento(id, [opcao(`${id}-a`, { maturidade: 1 }), opcao(`${id}-b`, { prazo: 1 })]);

function campanhaSimples() {
    return [
        capitulo(1, 2, [neutro("e1"), neutro("e2")]),
        capitulo(2, 4, [neutro("e3"), neutro("e4")])
    ];
}

describe("fluxo principal", () => {
    test("começa na introdução do capítulo 1 e abre o primeiro evento", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        assert.equal(jogo.fase, "capitulo");
        assert.equal(jogo.capitulo.numero, 1);
        assert.ok(jogo.comecarEtapa());
        assert.equal(jogo.fase, "decisao");
        assert.equal(jogo.evento.id, "e1");
        assert.equal(jogo.estado.opcoesVisiveis.length, 2);
    });

    test("decisão → resultado → próximo evento → concluir capítulo", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();

        const r1 = jogo.decidir(indice(jogo, "e1-a"));
        assert.equal(jogo.fase, "resultado");
        assert.equal(r1.proximo, "Próximo evento");
        assert.deepEqual(r1.efeitos, { maturidade: 1 });

        jogo.avancar();
        assert.equal(jogo.evento.id, "e2");
        const r2 = jogo.decidir(indice(jogo, "e2-a"));
        assert.equal(r2.proximo, "Concluir capítulo");

        jogo.avancar();
        assert.equal(jogo.fase, "capitulo");
        assert.equal(jogo.capitulo.numero, 2);
        assert.equal(jogo.estado.resumo.metaAlcancada, true);
        assert.equal(jogo.estado.metasAlcancadas, 1);
    });

    test("o bônus da meta mostra só o que realmente foi ganho (indicador no máximo não conta)", () => {
        const caps = [capitulo(1, 1, [evento("x", [opcao("sobe", { maturidade: 1, qualidade: 10 })])]), capitulo(2, 9, [neutro("y")])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "sobe");
        assert.equal(jogo.estado.indicadores.qualidade, 10);
        assert.deepEqual(jogo.estado.resumo.efeitos, { prazo: 1, orcamento: 1, moral: 1 });
    });

    test("meta não alcançada não dá bônus", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        escolher(jogo, "e1-b");
        escolher(jogo, "e2-b");
        assert.equal(jogo.estado.resumo.metaAlcancada, false);
        assert.deepEqual(jogo.estado.resumo.efeitos, {});
        assert.equal(jogo.estado.indicadores.qualidade, 5);
    });

    test("sem chegar a 15 de Maturidade, o último capítulo leva ao final por nível", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        escolher(jogo, "e1-a");
        escolher(jogo, "e2-a");
        jogo.comecarEtapa();
        escolher(jogo, "e3-a");
        escolher(jogo, "e4-a");
        assert.equal(jogo.fase, "fim");
        assert.equal(jogo.final.tipo, "nivel");
        assert.match(jogo.final.titulo, /Nível 1/);
    });

    test("conceitos repetidos aparecem uma vez só", () => {
        const caps = [capitulo(1, 0, [
            evento("a", [opcao("a", { prazo: 1 }, { conceito: "Mesmo" })]),
            evento("b", [opcao("b", { prazo: 1 }, { conceito: "Mesmo" })])
        ])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "a");
        escolher(jogo, "b");
        assert.deepEqual(jogo.estado.conceitos, ["Mesmo"]);
    });
});

describe("proteções do fluxo", () => {
    test("decidir fora da fase de decisão é ignorado (duplo clique não pula a explicação)", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        assert.equal(jogo.decidir(0), null, "antes de começar o capítulo");
        jogo.comecarEtapa();
        jogo.decidir(indice(jogo, "e1-a"));
        const antes = structuredClone(jogo.estado.indicadores);
        assert.equal(jogo.decidir(indice(jogo, "e1-a")), null);
        assert.deepEqual(jogo.estado.indicadores, antes);
        assert.equal(jogo.fase, "resultado");
    });

    test("índice de opção inválido é ignorado", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        assert.equal(jogo.decidir(7), null);
        assert.equal(jogo.fase, "decisao");
    });

    test("avancar e comecarEtapa só funcionam na fase certa", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        assert.equal(jogo.avancar(), false);
        jogo.comecarEtapa();
        assert.equal(jogo.comecarEtapa(), false);
        assert.equal(jogo.avancar(), false);
    });

    test("dificuldade desconhecida gera erro", () => {
        assert.throws(() => jogoDeTeste(campanhaSimples(), { dificuldade: "impossivel" }), /Dificuldade desconhecida/);
    });
});

describe("derrota", () => {
    test("derrota no meio do capítulo termina o jogo", () => {
        const caps = [capitulo(1, 0, [evento("a", [opcao("quebra", { orcamento: -5 })]), neutro("b")])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        const r = jogo.decidir(0);
        assert.equal(r.proximo, "Ver resultado");
        jogo.avancar();
        assert.equal(jogo.fase, "fim");
        assert.equal(jogo.final.tipo, "derrota");
        assert.match(jogo.final.titulo, /sem dinheiro/);
    });

    test("derrota no último evento do capítulo não concede bônus nem abre o próximo capítulo", () => {
        const caps = [capitulo(1, 0, [evento("a", [opcao("quebra", { qualidade: -5 })])]), capitulo(2, 0, [neutro("b")])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "quebra");
        assert.equal(jogo.fase, "fim");
        assert.equal(jogo.estado.indicadores.qualidade, 0);
    });

    test("moral em 0 é derrota", () => {
        const caps = [capitulo(1, 0, [evento("a", [opcao("pressao", { moral: -6 })])])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "pressao");
        assert.match(jogo.final.titulo, /equipe desistiu/);
    });

    test("uma consequência atrasada também pode causar derrota", () => {
        const caps = [capitulo(1, 0, [
            evento("a", [opcao("atalho", { prazo: 1 }, { efeitoAtrasado: { eventos: 1, efeitos: { qualidade: -5 }, texto: "a conta chegou" } })]),
            neutro("b"),
            neutro("c")
        ])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "atalho");
        const r = jogo.decidir(indice(jogo, "b-b"));
        assert.equal(r.proximo, "Ver resultado");
        jogo.avancar();
        assert.equal(jogo.final.tipo, "derrota");
    });
});

describe("desafio final", () => {
    const caps = () => [capitulo(1, 15, [evento("a", [opcao("maximo", { maturidade: 15 })])])];

    function ateODesafio() {
        const jogo = jogoDeTeste(caps());
        jogo.comecarEtapa();
        escolher(jogo, "maximo");
        assert.equal(jogo.fase, "desafio");
        jogo.comecarEtapa();
        assert.equal(jogo.evento.id, "final");
        return jogo;
    }

    test("com 15 de Maturidade no fim da campanha, o desafio final é liberado", () => {
        const jogo = ateODesafio();
        const r = jogo.decidir(indice(jogo, "honesto"));
        assert.equal(r.proximo, "Ver resultado");
        jogo.avancar();
        assert.equal(jogo.fase, "fim");
        assert.equal(jogo.final.tipo, "vitoria");
    });

    test("ensaiar respostas reprova a avaliação", () => {
        const jogo = ateODesafio();
        escolher(jogo, "ensaiar");
        assert.equal(jogo.final.tipo, "reprovado");
    });

    test("parar a empresa para ser avaliada resulta em Nível 4 com ressalvas, não em vitória", () => {
        const jogo = ateODesafio();
        jogo.estado.indicadores.prazo = 8;
        escolher(jogo, "parar tudo");
        assert.equal(jogo.final.tipo, "ressalvas");
    });

    test("zerar um indicador no desafio final tem um final próprio", () => {
        const jogo = ateODesafio();
        jogo.estado.indicadores.prazo = 3;
        escolher(jogo, "parar tudo");
        assert.equal(jogo.final.tipo, "derrota");
        assert.match(jogo.final.titulo, /às portas do Nível 5/);
    });

    test("o desfecho começa nulo e não é apagado por decisões sem desfecho", () => {
        const jogo = jogoDeTeste(caps());
        assert.equal(jogo.estado.desfecho, null);
        jogo.comecarEtapa();
        escolher(jogo, "maximo");
        assert.equal(jogo.estado.desfecho, null);
    });

    test("o final inclui a pontuação", () => {
        const jogo = ateODesafio();
        escolher(jogo, "honesto");
        assert.ok(Number.isInteger(jogo.final.pontos) && jogo.final.pontos > 0);
    });
});

describe("habilidades", () => {
    test("nenhuma habilidade pode ser usada fora da fase de decisão", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        ["auditoria", "reserva", "replanejamento"].forEach((h) => assert.equal(jogo.usarHabilidade(h), null));
        jogo.comecarEtapa();
        jogo.decidir(0);
        ["auditoria", "reserva", "replanejamento"].forEach((h) => assert.equal(jogo.podeUsarHabilidade(h), false));
    });

    test("Auditoria: uma vez por evento, com usos limitados pela dificuldade", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        assert.ok(jogo.usarHabilidade("auditoria"));
        assert.equal(jogo.estado.auditoriaUsada, true);
        assert.equal(jogo.usarHabilidade("auditoria"), null, "segunda vez no mesmo evento");

        escolher(jogo, "e1-a");
        assert.equal(jogo.estado.auditoriaUsada, false, "reinicia no próximo evento");
        assert.ok(jogo.usarHabilidade("auditoria"));
        escolher(jogo, "e2-a");
        jogo.comecarEtapa();
        assert.equal(jogo.estado.usos.auditoria, 0);
        assert.equal(jogo.podeUsarHabilidade("auditoria"), false);
    });

    test("Reserva evita apenas a próxima perda de orçamento", () => {
        const caps = [capitulo(1, 0, [
            evento("a", [opcao("ganha", { orcamento: 1 })]),
            evento("b", [opcao("perde", { orcamento: -2, maturidade: 1 })]),
            evento("c", [opcao("perde de novo", { orcamento: -2 })])
        ])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        jogo.usarHabilidade("reserva");
        assert.equal(jogo.podeUsarHabilidade("reserva"), false, "não acumula");

        let r = escolher(jogo, "ganha");
        assert.equal(r.reservaUsada, false);
        assert.equal(jogo.estado.reservaAtiva, true, "ganho de orçamento não consome a reserva");

        r = escolher(jogo, "perde");
        assert.equal(r.reservaUsada, true);
        assert.deepEqual(r.efeitos, { maturidade: 1 });
        assert.equal(jogo.estado.indicadores.orcamento, 6);

        r = jogo.decidir(indice(jogo, "perde de novo"));
        assert.equal(r.reservaUsada, false);
        assert.equal(jogo.estado.indicadores.orcamento, 4);
    });

    test("com a Reserva ativa, a prévia da Auditoria já mostra a perda evitada", () => {
        const caps = [capitulo(1, 0, [evento("a", [opcao("perde", { orcamento: -2, prazo: 1 })])])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        jogo.usarHabilidade("reserva");
        assert.deepEqual(jogo.calcularEfeitos(jogo.estado.opcoesVisiveis[0]).efeitos, { prazo: 1 });
    });

    test("Replanejamento informa quanto prazo foi realmente recuperado", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        jogo.estado.indicadores.prazo = 9;
        const mensagem = jogo.usarHabilidade("replanejamento");
        assert.equal(jogo.estado.indicadores.prazo, 10);
        assert.match(mensagem, /recuperou 1 ponto de prazo/);
    });

    test("Replanejamento fica bloqueado com o prazo no máximo", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        jogo.estado.indicadores.prazo = 10;
        assert.equal(jogo.usarHabilidade("replanejamento"), null);
        assert.equal(jogo.estado.usos.replanejamento, 1);
    });

    test("habilidade desconhecida não pode ser usada", () => {
        const jogo = jogoDeTeste(campanhaSimples());
        jogo.comecarEtapa();
        assert.equal(jogo.usarHabilidade("teletransporte"), null);
    });
});

describe("variáveis dinâmicas", () => {
    test("efeito atrasado chega depois do número de decisões indicado", () => {
        const caps = [capitulo(1, 0, [
            evento("a", [opcao("investe", { orcamento: -1 }, { efeitoAtrasado: { eventos: 2, efeitos: { qualidade: 2 }, texto: "retorno" } })]),
            neutro("b"),
            neutro("c")
        ])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        escolher(jogo, "investe");
        assert.equal(jogo.estado.pendentes.length, 1);

        let r = escolher(jogo, "b-b");
        assert.deepEqual(r.tardios, []);
        assert.equal(jogo.estado.indicadores.qualidade, 5);

        r = jogo.decidir(indice(jogo, "c-b"));
        assert.deepEqual(r.tardios, [{ texto: "retorno", origem: "Evento a", efeitos: { qualidade: 2 } }]);
        assert.equal(jogo.estado.indicadores.qualidade, 7);
        assert.equal(jogo.estado.pendentes.length, 0);
    });

    test("efeito condicional só vale quando a condição é atendida", () => {
        const cond = { indicador: "qualidade", minimo: 6, efeitos: { maturidade: 1 }, texto: "bônus" };
        const caps = [capitulo(1, 0, [
            evento("a", [opcao("tenta", { maturidade: 1 }, { condicional: cond })]),
            evento("b", [opcao("melhora", { qualidade: 2 })]),
            evento("c", [opcao("tenta de novo", { maturidade: 1 }, { condicional: cond })])
        ])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();

        let r = escolher(jogo, "tenta");
        assert.equal(r.condicional, null);
        assert.deepEqual(r.efeitos, { maturidade: 1 });

        escolher(jogo, "melhora");
        r = escolher(jogo, "tenta de novo");
        assert.equal(r.condicional, "bônus");
        assert.deepEqual(r.efeitos, { maturidade: 2 });
    });

    test("com moral baixa, a decisão rende menos maturidade e o resultado avisa", () => {
        const caps = [capitulo(1, 0, [evento("a", [opcao("processo", { maturidade: 2 })])])];
        const jogo = jogoDeTeste(caps);
        jogo.comecarEtapa();
        jogo.estado.indicadores.moral = 3;
        const r = jogo.decidir(0);
        assert.equal(r.moralPenalizou, true);
        assert.deepEqual(r.efeitos, { maturidade: 1 });
    });

    test("a dificuldade define valores iniciais, habilidades e crises", () => {
        const facil = jogoDeTeste(campanhaSimples(), { dificuldade: "facil" });
        const dificil = jogoDeTeste(campanhaSimples(), { dificuldade: "dificil" });
        assert.ok(facil.estado.indicadores.orcamento > dificil.estado.indicadores.orcamento);
        assert.ok(facil.estado.usos.auditoria > dificil.estado.usos.auditoria);
    });
});
