// Regras e parâmetros do jogo.

export const INDICADORES = ["maturidade", "qualidade", "prazo", "orcamento", "moral"];

export const MAXIMOS = { maturidade: 15, qualidade: 10, prazo: 10, orcamento: 10, moral: 10 };

// Se qualquer um destes chegar a 0, o jogo termina em derrota.
export const INDICADORES_CRITICOS = ["qualidade", "prazo", "orcamento", "moral"];

export const META_MATURIDADE = 15;

// Abaixo ou igual a este valor o indicador aparece em destaque de perigo.
export const LIMIAR_PERIGO = 2;

// Com Moral igual ou abaixo deste valor, cada ganho de Maturidade rende 1 ponto a menos.
export const MORAL_BAIXA = 3;

// Bônus recebido ao alcançar a meta de Maturidade de um capítulo.
export const BONUS_META = { qualidade: 1, prazo: 1, orcamento: 1, moral: 1 };

// Capítulos em que as crises podem aparecer.
export const CAPITULOS_COM_CRISE = [2, 3, 4, 5];

export const NOMES_INDICADORES = {
    maturidade: "Maturidade",
    qualidade: "Qualidade",
    prazo: "Prazo",
    orcamento: "Orçamento",
    moral: "Moral"
};

export const NOMES_TIPOS = {
    situacao: "Situação",
    conhecimento: "Conhecimento CMMI",
    crise: "Crise",
    final: "Desafio final"
};

export const HABILIDADES = {
    auditoria: {
        nome: "Auditoria Interna",
        descricao: "Revela as consequências imediatas de cada opção do evento atual."
    },
    reserva: {
        nome: "Reserva de Orçamento",
        descricao: "Evita a próxima perda de orçamento."
    },
    replanejamento: {
        nome: "Replanejamento",
        descricao: "Recupera 2 pontos de prazo.",
        ganho: { prazo: 2 }
    }
};

export const DIFICULDADES = {
    facil: {
        nome: "Fácil",
        descricao: "Mais recursos, 1 crise e mais habilidades.",
        valoresIniciais: { maturidade: 0, qualidade: 6, prazo: 6, orcamento: 6, moral: 7 },
        crises: 1,
        usos: { auditoria: 3, reserva: 2, replanejamento: 2 },
        multiplicador: 0.75
    },
    normal: {
        nome: "Normal",
        descricao: "A experiência pensada para a disciplina.",
        valoresIniciais: { maturidade: 0, qualidade: 5, prazo: 5, orcamento: 5, moral: 6 },
        crises: 2,
        usos: { auditoria: 2, reserva: 1, replanejamento: 1 },
        multiplicador: 1
    },
    dificil: {
        nome: "Difícil",
        descricao: "Menos recursos, 3 crises e habilidades escassas.",
        valoresIniciais: { maturidade: 0, qualidade: 4, prazo: 4, orcamento: 4, moral: 5 },
        crises: 3,
        usos: { auditoria: 1, reserva: 1, replanejamento: 1 },
        multiplicador: 1.5
    }
};

export const DIFICULDADE_PADRAO = "normal";
