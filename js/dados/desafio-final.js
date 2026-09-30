// Desafio final: só aparece se o jogador chegar ao fim do capítulo 5 com a meta de maturidade.
export const DESAFIO_FINAL = {
    id: "avaliacao-oficial",
    tipo: "final",
    titulo: "DESAFIO FINAL: a avaliação oficial",
    falante: "Avaliadora líder certificada pelo CMMI Institute",
    descricao:
        "Chegou o dia. Durante três semanas, avaliadores oficiais vão entrevistar as equipes e analisar evidências para confirmar " +
        "se a TechNova é Nível 5. Como você prepara a empresa?",
    opcoes: [
        {
            texto: "Deixar que as equipes mostrem o trabalho do dia a dia, com dados e registros reais.",
            efeitos: { qualidade: 1, prazo: -1, orcamento: -1 },
            resultado:
                "Os avaliadores encontram evidências consistentes em todos os projetos. Algumas melhorias são apontadas, mas nada que comprometa o resultado.",
            conceito: "Avaliação SCAMPI A",
            explicacao:
                "A avaliação oficial (SCAMPI A) dura de 2 a 3 semanas e se baseia em evidências objetivas e entrevistas. " +
                "Seu resultado é publicado no PARS e vale por até 5 anos."
        },
        {
            texto: "Ensaiar respostas com as equipes e esconder os projetos problemáticos.",
            efeitos: { moral: -2 },
            desfecho: "reprovado",
            resultado:
                "Nas entrevistas, as respostas ensaiadas não batem com os registros. Os avaliadores encontram os projetos escondidos.",
            conceito: "Integridade da avaliação",
            explicacao:
                "Avaliadores cruzam entrevistas, documentos e registros. Inconsistências entre o que se diz e o que se faz são justamente " +
                "o que a avaliação foi criada para encontrar."
        },
        {
            texto: "Parar todos os projetos por três semanas para focar só na avaliação.",
            efeitos: { prazo: -3, orcamento: -1 },
            desfecho: "ressalvas",
            resultado:
                "A avaliação corre bem, mas os clientes ficam três semanas sem entregas. Os avaliadores estranham: processos maduros não precisam parar a empresa.",
            conceito: "Maturidade é o dia a dia",
            explicacao:
                "Numa organização madura, a avaliação observa o trabalho normal. Se é preciso parar tudo para ser avaliado, " +
                "os processos ainda não fazem parte da rotina."
        }
    ]
};
