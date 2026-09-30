// Cálculo do final da história e da pontuação.

import { META_MATURIDADE, DIFICULDADES } from "../dados/config.js";
import { indicadorZerado, nivelDeMaturidade } from "./efeitos.js";

const DERROTAS = {
    qualidade: {
        titulo: "Fim de jogo: os clientes foram embora",
        texto: "A qualidade chegou a 0. Defeitos e retrabalho afastaram os clientes, e a diretoria encerrou o seu contrato."
    },
    prazo: {
        titulo: "Fim de jogo: atrasos sem fim",
        texto: "O prazo chegou a 0. Os atrasos se acumularam, contratos foram cancelados e a diretoria encerrou o seu contrato."
    },
    orcamento: {
        titulo: "Fim de jogo: sem dinheiro",
        texto: "O orçamento chegou a 0. A empresa não conseguiu pagar o programa de melhoria, e a diretoria encerrou o seu contrato."
    },
    moral: {
        titulo: "Fim de jogo: a equipe desistiu",
        texto:
            "A moral chegou a 0. Pressão constante e mudanças sem explicação esgotaram as pessoas, e os melhores profissionais pediram demissão. " +
            "Sem gente, não há processo que funcione."
    }
};

const TEXTOS_POR_NIVEL = {
    1: "A empresa continua no Nível 1: as decisões resolveram problemas imediatos, mas os processos quase não evoluíram.",
    2: "A empresa chegou ao Nível 2 (Gerenciado): os projetos são planejados e controlados, mas cada um ainda trabalha à sua maneira.",
    3: "A empresa chegou ao Nível 3 (Definido): há processos padronizados na organização, mas as decisões ainda não usam dados.",
    4: "A empresa chegou ao Nível 4 (Gerenciado Quantitativamente): decisões baseadas em dados, mas faltou consolidar a melhoria contínua."
};

// tipo: "derrota" | "reprovado" | "ressalvas" | "excelencia" | "vitoria" | "apertada" | "nivel"
export function calcularFinal(estado) {
    const { maturidade, qualidade, prazo, orcamento, moral } = estado.indicadores;
    const zerado = indicadorZerado(estado.indicadores);

    if (zerado) {
        const derrota = DERROTAS[zerado];
        if (estado.noDesafioFinal) {
            return {
                tipo: "derrota",
                titulo: `${derrota.titulo}, às portas do Nível 5`,
                texto:
                    `${derrota.texto} A TechNova tinha maturidade para ser avaliada no Nível 5, ` +
                    "mas a forma de se preparar para a avaliação custou mais do que a empresa podia pagar."
            };
        }
        return { tipo: "derrota", ...derrota };
    }

    if (estado.desfecho === "reprovado") {
        return {
            tipo: "reprovado",
            titulo: "Avaliação reprovada",
            texto:
                "Os avaliadores encontraram inconsistências entre o discurso e a prática. A TechNova não recebeu o Nível 5, " +
                "e a confiança dos clientes foi abalada. No CMMI, maturidade se prova com evidências, não com ensaio."
        };
    }

    if (estado.desfecho === "ressalvas") {
        return {
            tipo: "ressalvas",
            titulo: "Avaliação com ressalvas: Nível 4 confirmado",
            texto:
                "Os avaliadores confirmaram práticas quantitativas sólidas, mas concluíram que a melhoria contínua ainda não faz parte da rotina: " +
                "foi preciso parar a empresa para ser avaliada. A TechNova recebe o Nível 4 e uma lista de ajustes para tentar o Nível 5."
        };
    }

    if (maturidade >= META_MATURIDADE) {
        const menor = Math.min(qualidade, prazo, orcamento, moral);
        if (menor >= 6) {
            return {
                tipo: "excelencia",
                titulo: "Vitória: excelência em processos",
                texto:
                    "A TechNova foi avaliada no Nível 5 com indicadores saudáveis em todas as áreas. Você provou que maturidade e " +
                    "resultados andam juntos. A empresa entra para o grupo de cerca de 5% das organizações que chegam ao nível mais alto do CMMI."
            };
        }
        if (menor <= 3) {
            return {
                tipo: "apertada",
                titulo: "Vitória apertada: Nível 5 a duras penas",
                texto:
                    "A TechNova foi avaliada no Nível 5, mas chegou esgotada: um dos indicadores está perigosamente baixo. " +
                    "A maturidade foi alcançada, mas o equilíbrio ficou para trás."
            };
        }
        return {
            tipo: "vitoria",
            titulo: "Vitória: Nível 5 alcançado",
            texto:
                "A TechNova foi avaliada no Nível 5 do CMMI. Os processos são estáveis, medidos e em melhoria contínua, " +
                "uma conquista que poucas organizações no mundo alcançam."
        };
    }

    const nivel = nivelDeMaturidade(maturidade);
    return {
        tipo: "nivel",
        titulo: `Fim da consultoria: Nível ${nivel}`,
        texto:
            `${TEXTOS_POR_NIVEL[nivel]} Com ${maturidade} de Maturidade, a TechNova não chegou à meta de ${META_MATURIDADE} ` +
            "necessária para a avaliação de Nível 5."
    };
}

const BONUS_POR_FINAL = { excelencia: 100, vitoria: 70, apertada: 40, ressalvas: 20 };

export function calcularPontuacao(estado, final = calcularFinal(estado)) {
    const { maturidade, qualidade, prazo, orcamento, moral } = estado.indicadores;
    const multiplicador = DIFICULDADES[estado.dificuldade].multiplicador;

    let pontos = maturidade * 10 + estado.metasAlcancadas * 15 + (BONUS_POR_FINAL[final.tipo] || 0);
    if (final.tipo !== "derrota") pontos += (qualidade + prazo + orcamento + moral) * 3;

    return Math.round(pontos * multiplicador);
}
