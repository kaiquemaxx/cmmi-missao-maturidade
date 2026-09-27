// Campanhas pequenas e previsíveis para testar o fluxo do motor.

import { Jogo } from "../../js/nucleo/motor.js";

// Com 0.999, embaralhar() mantém a ordem original: opção i fica no índice i.
export const semEmbaralhar = () => 0.999;

export function opcao(texto, efeitos, extra = {}) {
    return { texto, efeitos, resultado: `resultado ${texto}`, conceito: `conceito ${texto}`, explicacao: `explicação ${texto}`, ...extra };
}

export function evento(id, opcoes, tipo = "situacao") {
    return { id, tipo, titulo: `Evento ${id}`, falante: "Alguém", descricao: "…", opcoes };
}

export function capitulo(numero, meta, eventos) {
    return { numero, nome: `Cap ${numero}`, nivel: `Nível ${numero}`, meta, introducao: "…", eventos };
}

export const DESAFIO_TESTE = evento(
    "final",
    [
        opcao("honesto", { qualidade: 1, prazo: -1 }),
        opcao("ensaiar", { moral: -2 }, { desfecho: "reprovado" }),
        opcao("parar tudo", { prazo: -3 }, { desfecho: "ressalvas" })
    ],
    "final"
);

export function jogoDeTeste(capitulos, { dificuldade = "normal", crises = [], desafioFinal = DESAFIO_TESTE } = {}) {
    return new Jogo({ capitulos, crises, desafioFinal, dificuldade, aleatorio: semEmbaralhar });
}

export function indice(jogo, texto) {
    const i = jogo.estado.opcoesVisiveis.findIndex((o) => o.texto === texto);
    if (i < 0) throw new Error(`Opção não encontrada: ${texto}`);
    return i;
}

// Decide pela opção com esse texto e avança para o próximo passo.
export function escolher(jogo, texto) {
    const resultado = jogo.decidir(indice(jogo, texto));
    jogo.avancar();
    return resultado;
}
