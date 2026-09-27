// Crises: a cada partida algumas são sorteadas e inseridas em capítulos aleatórios (2 a 5).

export const CRISES = [
    {
        id: "avaliacao-chegando",
        tipo: "crise",
        titulo: "CRISE: a avaliação está chegando",
        falante: "Ricardo, Diretor Comercial",
        descricao:
            "Ricardo prometeu a um cliente que a empresa teria uma avaliação CMMI oficial em dois meses. " +
            "O problema: quase nada está documentado e ninguém sabe se a empresa passaria.",
        opcoes: [
            {
                texto: "Fazer primeiro uma avaliação de diagnóstico rápida para descobrir as lacunas.",
                efeitos: { maturidade: 1, prazo: 1, orcamento: -1 },
                resultado:
                    "Em dois dias, o diagnóstico mostra exatamente o que falta. A empresa renegocia o prazo com o cliente usando dados concretos.",
                conceito: "Tempo e custo: tipos de avaliação",
                explicacao:
                    "As avaliações oficiais do CMMI (método SCAMPI) têm três classes: C (diagnóstico, 1 a 2 dias), B (intermediária, 1 a 2 semanas) " +
                    "e A (oficial, 2 a 3 semanas, válida por até 5 anos). Começar por uma avaliação leve reduz o risco da avaliação formal."
            },
            {
                texto: "Montar uma força-tarefa para produzir toda a documentação às pressas.",
                efeitos: { maturidade: 1, prazo: -2, qualidade: -1, moral: -2 },
                efeitoAtrasado: { eventos: 2, efeitos: { maturidade: -1 }, texto: "A documentação de fachada é descoberta, e parte do avanço se perde." },
                resultado:
                    "Surgem centenas de páginas que ninguém usa de verdade. Os projetos atrasam e fica claro que é só fachada.",
                conceito: "Onde está o custo real",
                explicacao:
                    "O maior custo de uma avaliação CMMI está na preparação interna: reunir evidências objetivas de que os processos são realmente usados. " +
                    "Documentação criada só para a avaliação não prova maturidade."
            },
            {
                texto: "Adiar a avaliação e propor um cronograma realista.",
                efeitos: { maturidade: 2, orcamento: -1 },
                resultado:
                    "O cliente fica frustrado com o adiamento, mas a empresa segue evoluindo de forma consistente, sem atalhos.",
                conceito: "Tempo de implementação",
                explicacao:
                    "Implantar o CMMI não é rápido: estudos apontam de 18 a 24 meses para ver retorno. " +
                    "Os benefícios existem, mas exigem tempo e constância."
            }
        ]
    },
    {
        id: "heroi-pediu-demissao",
        tipo: "crise",
        titulo: "CRISE: o herói pediu demissão",
        falante: "Marta, Diretora de TI",
        descricao:
            "Rafael, o desenvolvedor que \"sabia tudo\" do sistema mais importante da empresa, pediu demissão. " +
            "Ele sai em duas semanas, e quase nada do que ele sabe está documentado.",
        opcoes: [
            {
                texto: "Usar as duas semanas para registrar o conhecimento dele nos processos e na documentação da empresa.",
                efeitos: { maturidade: 2, prazo: -2 },
                resultado:
                    "As entregas param por duas semanas, mas o conhecimento agora pertence à empresa, e não a uma pessoa.",
                conceito: "Conhecimento organizacional",
                explicacao:
                    "Uma organização madura não depende de heróis: o conhecimento está nos processos, ativos e registros da organização. " +
                    "Isso reduz o risco quando pessoas-chave saem."
            },
            {
                texto: "Oferecer um grande aumento para ele ficar.",
                efeitos: { orcamento: -2, prazo: 1 },
                efeitoAtrasado: { eventos: 2, efeitos: { moral: -1 }, texto: "O restante da equipe se pergunta por que só o herói foi valorizado." },
                resultado:
                    "Ele fica, por enquanto. O risco continua o mesmo e agora custa mais caro.",
                conceito: "Risco de pessoa-chave",
                explicacao:
                    "Manter a pessoa resolve o sintoma, não a causa. Enquanto o conhecimento estiver só na cabeça de alguém, " +
                    "a empresa continua vulnerável."
            },
            {
                texto: "Contratar um substituto às pressas e torcer para dar certo.",
                efeitos: { orcamento: -1, qualidade: -2 },
                efeitoAtrasado: { eventos: 1, efeitos: { qualidade: -1 }, texto: "O substituto ainda não entende o sistema, e mais falhas chegam à produção." },
                resultado:
                    "O novato demora a entender o sistema, e os primeiros meses são cheios de falhas em produção.",
                conceito: "Dependência de heróis",
                explicacao:
                    "Sem processos e documentação, cada saída de uma pessoa-chave vira uma crise. É o comportamento típico do Nível 1."
            }
        ]
    },
    {
        id: "corte-de-orcamento",
        tipo: "crise",
        titulo: "CRISE: corte de 30% nos custos",
        falante: "Carlos, CEO",
        descricao:
            "Um grande cliente cancelou o contrato, e a diretoria anuncia um corte de 30% nos custos. " +
            "O programa de melhoria de processos está na lista.",
        opcoes: [
            {
                texto: "Priorizar as áreas de prática com maior retorno e pausar o restante.",
                efeitos: { orcamento: 2, maturidade: 1, prazo: -1 },
                resultado:
                    "O programa encolhe, mas mantém o essencial. Os resultados continuam aparecendo onde mais importa.",
                conceito: "Priorização por objetivos",
                explicacao:
                    "A lógica da representação contínua ajuda em momentos de aperto: escolher as áreas de prática ligadas aos objetivos de " +
                    "negócio mais urgentes e concentrar esforço nelas."
            },
            {
                texto: "Cortar o programa inteiro.",
                efeitos: { orcamento: 3, maturidade: -2, qualidade: -1, moral: -1 },
                resultado:
                    "O caixa respira, mas as práticas conquistadas começam a ser abandonadas.",
                conceito: "Regressão de maturidade",
                explicacao:
                    "Maturidade não é permanente. Sem patrocínio e manutenção, as organizações voltam aos hábitos antigos."
            },
            {
                texto: "Cortar treinamentos e revisões de qualidade, mantendo o resto.",
                efeitos: { orcamento: 2, qualidade: -2 },
                efeitoAtrasado: { eventos: 1, efeitos: { qualidade: -1 }, texto: "Sem revisões, os defeitos se multiplicam." },
                resultado:
                    "A economia aparece rápido, e os defeitos também.",
                conceito: "Custo da não qualidade",
                explicacao:
                    "Cortar atividades de qualidade costuma sair mais caro depois, com retrabalho, reclamações e perda de clientes."
            }
        ]
    },
    {
        id: "incidente-seguranca",
        tipo: "crise",
        titulo: "CRISE: incidente de segurança",
        falante: "Diego, Arquiteto de Software",
        descricao:
            "Um ataque explorou uma falha em um sistema entregue pela TechNova. Dados de clientes podem ter vazado, " +
            "e a imprensa já está ligando.",
        opcoes: [
            {
                texto: "Responder com um plano de incidentes e incluir práticas de segurança no processo de desenvolvimento.",
                efeitos: { maturidade: 2, prazo: -1, orcamento: -1 },
                resultado:
                    "A resposta é rápida e transparente. Revisões de segurança passam a fazer parte de todo projeto.",
                conceito: "Segurança no CMMI",
                explicacao:
                    "A versão atual do CMMI (V3.0) inclui um domínio de Segurança, com práticas para gerenciar ameaças e vulnerabilidades. " +
                    "Segurança passa a fazer parte do processo, e não algo verificado só no fim."
            },
            {
                texto: "Corrigir a falha em silêncio e seguir em frente.",
                efeitos: { prazo: 1, qualidade: -2 },
                efeitoAtrasado: { eventos: 2, efeitos: { qualidade: -1, orcamento: -1 }, texto: "O incidente vem a público, e a omissão pesa mais do que a falha." },
                resultado:
                    "O caso vem a público semanas depois, e a omissão pesa mais do que a falha.",
                conceito: "Transparência e processo",
                explicacao:
                    "Corrigir sem registrar nem analisar não evita que o problema se repita, e esconder o incidente destrói a confiança dos clientes."
            },
            {
                texto: "Contratar uma empresa especializada para resolver tudo.",
                efeitos: { orcamento: -2, qualidade: 1 },
                resultado:
                    "A falha é corrigida por especialistas, mas a TechNova não aprende nada com o incidente.",
                conceito: "Terceirizar a solução",
                explicacao:
                    "Especialistas externos ajudam na crise, mas a maturidade vem de incorporar a lição nos próprios processos."
            }
        ]
    },
    {
        id: "concorrente-lancou",
        tipo: "crise",
        titulo: "CRISE: o concorrente lançou primeiro",
        falante: "Ricardo, Diretor Comercial",
        descricao:
            "O principal concorrente lançou um produto parecido com o que a TechNova está desenvolvendo. " +
            "Ricardo quer lançar o nosso em duas semanas, \"do jeito que estiver\".",
        opcoes: [
            {
                texto: "Usar os dados do projeto para negociar uma versão menor, planejada e testada.",
                efeitos: { maturidade: 1, prazo: 1, qualidade: 1, orcamento: -1 },
                resultado:
                    "A versão enxuta sai em um mês, estável. Os clientes preferem a confiabilidade à pressa.",
                conceito: "Planejamento sob pressão",
                explicacao:
                    "Processos maduros são mais valiosos justamente sob pressão: permitem negociar escopo com base em dados, " +
                    "em vez de abandonar o processo."
            },
            {
                texto: "Lançar em duas semanas, pulando testes e revisões.",
                efeitos: { prazo: 2, qualidade: -2, maturidade: -1, moral: -1 },
                resultado:
                    "O produto sai no prazo e com muitos bugs. O suporte fica sobrecarregado.",
                conceito: "Abandonar o processo na crise",
                explicacao:
                    "Se o processo é abandonado na primeira crise, ele não estava institucionalizado. O CMMI busca práticas que resistem à pressão."
            },
            {
                texto: "Ignorar o concorrente e manter o cronograma original.",
                efeitos: { orcamento: -2, qualidade: 2, moral: 1 },
                resultado:
                    "O produto sai impecável, mas o concorrente já conquistou boa parte do mercado.",
                conceito: "Processo a serviço do negócio",
                explicacao:
                    "Maturidade não é rigidez: processos existem para apoiar os objetivos do negócio, e devem permitir respostas ágeis e controladas."
            }
        ]
    }
];
