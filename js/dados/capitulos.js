// Capítulos da campanha (um por nível de maturidade do CMMI).
// Cada evento tem 2 ou 3 opções; cada opção altera os indicadores
// (maturidade, qualidade, prazo, orcamento, moral) e traz uma explicação ligada ao CMMI.
// Campos opcionais de uma opção:
//   efeitoAtrasado: { eventos, efeitos, texto }  consequência aplicada N decisões depois
//   condicional:    { indicador, minimo, efeitos, texto }  efeito extra se o indicador estiver no mínimo
//   desfecho:       usado pelo desafio final ("reprovado" | "ressalvas")
// Tipos: "situacao" (decisão empresarial), "conhecimento" (conteúdo CMMI).

export const CAPITULOS = [
    {
        numero: 1,
        nome: "Caos",
        nivel: "Nível 1 – Inicial",
        meta: 3,
        introducao:
            "A TechNova Sistemas está no Nível 1 do CMMI: processos imprevisíveis, reativos e improvisados. " +
            "Os projetos atrasam, estouram o orçamento e o sucesso depende de quem pega o trabalho. " +
            "Sua missão: tirar a empresa do caos e fazer seus processos amadurecerem até o Nível 5.",
        eventos: [
            {
                id: "cada-um-do-seu-jeito",
                tipo: "situacao",
                titulo: "Cada equipe do seu jeito",
                falante: "Marta, Diretora de TI",
                descricao:
                    "Nas três equipes de desenvolvimento, cada uma estima, testa e entrega de um jeito diferente. " +
                    "Quando um dev troca de equipe, leva semanas para se adaptar, e os clientes reclamam que a qualidade " +
                    "\"depende de quem pegou o projeto\". O que você recomenda?",
                opcoes: [
                    {
                        texto: "Definir um processo padrão de desenvolvimento para toda a empresa.",
                        efeitos: { maturidade: 2, qualidade: 1, prazo: -1, moral: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { qualidade: 1 }, texto: "O processo padrão começa a render: o retrabalho cai nas entregas seguintes." },
                        resultado:
                            "As equipes resistem no início e as primeiras entregas atrasam, mas o trabalho fica mais previsível e os defeitos diminuem.",
                        conceito: "Nível 1 – Inicial",
                        explicacao:
                            "Uma organização em que cada equipe trabalha de forma ad hoc está no Nível 1 (Inicial) do CMMI: o resultado depende do " +
                            "esforço individual, e não do processo. Reduzir essa variabilidade entre equipes é um dos objetivos centrais do modelo."
                    },
                    {
                        texto: "Deixar como está. As equipes são experientes e o foco agora é entregar.",
                        efeitos: { prazo: 1, moral: 1, qualidade: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { qualidade: -1 }, texto: "O módulo devolvido pelo cliente volta com uma nova leva de defeitos." },
                        resultado:
                            "No curto prazo nada muda e as entregas seguem. Mas o retrabalho continua, e um cliente importante devolve um módulo cheio de defeitos.",
                        conceito: "Dependência de heróis",
                        explicacao:
                            "No Nível 1, o sucesso depende das pessoas, não do processo. Quando alguém sai ou troca de equipe, a qualidade cai. " +
                            "O CMMI existe para que bons resultados sejam repetíveis, e não fruto de sorte ou de talento individual."
                    },
                    {
                        texto: "Mapear primeiro como cada equipe trabalha, antes de mudar qualquer coisa.",
                        efeitos: { maturidade: 1, orcamento: -1 },
                        condicional: { indicador: "moral", minimo: 6, efeitos: { maturidade: 1 }, texto: "Com a equipe motivada, o mapeamento vira uma proposta de melhoria construída em conjunto." },
                        resultado:
                            "Você entrevista as equipes e documenta as práticas atuais. Custa horas de consultoria, mas agora você sabe onde estão os problemas.",
                        conceito: "Diagnóstico antes da melhoria",
                        explicacao:
                            "Entender a situação atual antes de propor mudanças é o primeiro passo de qualquer programa de melhoria de processos. " +
                            "Sem um diagnóstico, a empresa corre o risco de \"melhorar\" o que não era problema."
                    }
                ]
            },
            {
                id: "ferramenta-milagrosa",
                tipo: "situacao",
                titulo: "A ferramenta milagrosa",
                falante: "Carlos, CEO",
                descricao:
                    "Carlos voltou de uma feira de tecnologia convencido de que uma ferramenta cara de gestão de projetos vai resolver tudo. " +
                    "\"Com ela, viramos CMMI em um mês!\", diz ele, já com o contrato na mão.",
                opcoes: [
                    {
                        texto: "Explicar que o CMMI define o que precisa ser feito, e não qual ferramenta usar, e começar pelos processos.",
                        efeitos: { maturidade: 1, prazo: -1 },
                        resultado:
                            "Carlos fica desconfiado, mas aceita começar pelos processos e deixar a ferramenta para depois.",
                        conceito: "Conceito e objetivos do CMMI",
                        explicacao:
                            "O CMMI (Capability Maturity Model Integration) é um modelo de referência para melhoria de processos. Ele descreve o que uma " +
                            "organização precisa ter implementado para produzir resultados previsíveis, mas não diz como fazer nem quais ferramentas usar. " +
                            "Seus objetivos: reduzir a variabilidade, aumentar a previsibilidade de prazo, custo e qualidade e sustentar a melhoria contínua."
                    },
                    {
                        texto: "Comprar a ferramenta e obrigar todas as equipes a usá-la.",
                        efeitos: { maturidade: 1, prazo: 1, orcamento: -2 },
                        efeitoAtrasado: { eventos: 2, efeitos: { qualidade: -1, moral: -1 }, texto: "O caos digital cobra seu preço: cada equipe configurou a ferramenta de um jeito e ninguém confia nos relatórios." },
                        resultado:
                            "A ferramenta é implantada, mas cada equipe a configura do seu jeito. O caos agora é digital, e caro.",
                        conceito: "Ferramenta não é processo",
                        explicacao:
                            "Automatizar um processo mal definido só faz os problemas acontecerem mais rápido. Ferramentas apoiam processos maduros, " +
                            "mas não os substituem. O CMMI avalia práticas, não softwares."
                    },
                    {
                        texto: "Começar com uma planilha simples e gratuita para registrar as tarefas.",
                        efeitos: { orcamento: 1, prazo: -1 },
                        resultado:
                            "A planilha é simples e barata, e as equipes passam a registrar o trabalho. Mas mantê-la atualizada toma tempo.",
                        conceito: "Comece simples",
                        explicacao:
                            "Não é preciso investir alto para começar a melhorar: registrar o trabalho de forma consistente já é um passo do caos em " +
                            "direção ao controle. O que importa para o CMMI é a prática ser realmente seguida."
                    }
                ]
            },
            {
                id: "edital-exige-cmmi",
                tipo: "conhecimento",
                titulo: "O edital exige CMMI",
                falante: "Ricardo, Diretor Comercial",
                descricao:
                    "Um órgão do governo abriu um edital milionário, mas exige que os fornecedores tenham avaliação CMMI. " +
                    "Ricardo pergunta: \"Por que um cliente se importa com o nosso processo interno? Só queremos entregar o sistema!\"",
                opcoes: [
                    {
                        texto: "Explicar a origem do CMMI à diretoria e propor um programa de melhoria.",
                        efeitos: { maturidade: 1, prazo: -1 },
                        efeitoAtrasado: { eventos: 1, efeitos: { orcamento: 2 }, texto: "A diretoria libera a verba do programa de melhoria." },
                        resultado:
                            "A diretoria entende por que clientes exigem o modelo e aprova um orçamento para o programa de melhoria.",
                        conceito: "Origem do CMMI",
                        explicacao:
                            "Nos anos 1980, o Departamento de Defesa dos EUA sofria com atrasos e estouros de orçamento em softwares contratados. " +
                            "Para avaliar fornecedores, financiou o SEI (Software Engineering Institute), fundado em 1984 na Carnegie Mellon University, que criou o CMM. " +
                            "Em 2000, vários modelos foram integrados no CMMI. Clientes exigem o CMMI justamente para reduzir o risco de contratar fornecedores imaturos."
                    },
                    {
                        texto: "Afirmar na proposta que a empresa \"já segue as boas práticas\", sem evidências.",
                        efeitos: { prazo: 1, orcamento: 1, qualidade: -1, maturidade: -1 },
                        resultado:
                            "A proposta é desclassificada: o edital pedia o resultado de uma avaliação oficial, não uma declaração. A equipe perde credibilidade.",
                        conceito: "Evidências objetivas",
                        explicacao:
                            "Uma avaliação CMMI se baseia em evidências objetivas: documentos, registros e entrevistas. " +
                            "Os resultados oficiais ficam públicos no sistema PARS da ISACA, então não dá para simplesmente \"declarar\" um nível."
                    },
                    {
                        texto: "Desistir do edital e continuar atendendo só clientes privados.",
                        efeitos: { orcamento: -2, prazo: 1, moral: 1 },
                        resultado:
                            "A equipe não fica sobrecarregada, mas a empresa abre mão de uma grande receita, e o concorrente com CMMI leva o contrato.",
                        conceito: "Vantagem competitiva",
                        explicacao:
                            "Um dos benefícios do CMMI é comercial: o nível de maturidade costuma ser exigido em editais e contratos públicos e internacionais. " +
                            "Ignorar o modelo pode fechar portas importantes de mercado."
                    }
                ]
            }
        ]
    },
    {
        numero: 2,
        nome: "Controle",
        nivel: "Nível 2 – Gerenciado",
        meta: 6,
        introducao:
            "No Nível 2 (Gerenciado), os projetos passam a ser planejados, executados, medidos e controlados. " +
            "A disciplina ainda existe projeto a projeto, mas já permite que bons resultados se repitam, mesmo sob pressão.",
        eventos: [
            {
                id: "projeto-sem-plano",
                tipo: "situacao",
                titulo: "Ninguém sabe quanto falta",
                falante: "Júlia, Líder do projeto Portal do Cliente",
                descricao:
                    "O projeto Portal do Cliente está três semanas atrasado. Não existe cronograma, as estimativas eram \"de cabeça\", " +
                    "e ninguém consegue dizer quando ele termina. O cliente quer uma resposta até sexta.",
                opcoes: [
                    {
                        texto: "Parar um dia para criar um plano com estimativas, cronograma e acompanhamento semanal.",
                        efeitos: { maturidade: 2, prazo: -1, orcamento: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: 2 }, texto: "As novas datas se confirmam: com o plano, o projeto recupera o cronograma." },
                        resultado:
                            "O plano mostra o tamanho real do atraso. O cliente não gosta da notícia, mas passa a confiar nas novas datas.",
                        conceito: "Nível 2 – Gerenciado",
                        explicacao:
                            "No Nível 2 (Gerenciado), os projetos passam a ser planejados, monitorados e controlados. " +
                            "Planejamento, estimativas e acompanhamento do progresso são práticas básicas para sair do caos e ganhar previsibilidade."
                    },
                    {
                        texto: "Colocar a equipe em horas extras até o sistema ficar pronto.",
                        efeitos: { prazo: 3, qualidade: -1, orcamento: -1, moral: -2 },
                        efeitoAtrasado: { eventos: 1, efeitos: { qualidade: -1 }, texto: "Os bugs das horas extras chegam ao cliente." },
                        resultado:
                            "O projeto avança, mas a equipe fica exausta, os bugs aumentam e o custo com horas extras dispara.",
                        conceito: "Reação sem controle",
                        explicacao:
                            "Horas extras são uma resposta típica do Nível 1: reagir à crise sem entender a causa. " +
                            "Sem planejamento e medição, a empresa não aprende nada e o próximo projeto provavelmente vai atrasar do mesmo jeito."
                    },
                    {
                        texto: "Cortar funcionalidades sem avisar e entregar o que estiver pronto.",
                        efeitos: { prazo: 2, qualidade: -2 },
                        efeitoAtrasado: { eventos: 2, efeitos: { orcamento: -1 }, texto: "A reclamação formal do cliente vira multa contratual." },
                        resultado:
                            "O prazo é cumprido, mas o cliente descobre que faltam funções combinadas e abre uma reclamação formal.",
                        conceito: "Gestão de requisitos",
                        explicacao:
                            "Mudanças de escopo precisam ser negociadas e registradas com o cliente. " +
                            "A gestão de requisitos é uma das áreas de prática mais básicas do CMMI: todos precisam concordar com o que será entregue."
                    }
                ]
            },
            {
                id: "quem-garante",
                tipo: "situacao",
                titulo: "Quem garante que o processo é seguido?",
                falante: "Marta, Diretora de TI",
                descricao:
                    "O processo padrão foi aprovado, mas ninguém sabe se as equipes realmente o seguem. " +
                    "Em uma conversa de corredor, um dev admite: \"Na correria, a gente pula os testes.\"",
                opcoes: [
                    {
                        texto: "Criar uma função de Garantia da Qualidade que revise, de forma independente, processos e produtos.",
                        efeitos: { maturidade: 1, qualidade: 2, orcamento: -1 },
                        resultado:
                            "Uma analista de qualidade passa a fazer revisões periódicas. Os desvios aparecem cedo e são corrigidos, mas o custo aumenta.",
                        conceito: "Garantia da Qualidade",
                        explicacao:
                            "A área de prática de Garantia da Qualidade de Processo (PQA) verifica objetivamente se o trabalho segue os processos definidos. " +
                            "A independência é essencial: quem executa o trabalho não deve ser o único a avaliá-lo."
                    },
                    {
                        texto: "Pedir que cada líder avalie a própria equipe.",
                        efeitos: { prazo: 1, moral: 1, qualidade: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { qualidade: -1 }, texto: "Os relatórios dizem que está tudo ótimo, mas os defeitos continuam chegando aos clientes." },
                        resultado:
                            "Os relatórios dizem que está tudo ótimo. Estranho: os defeitos continuam aparecendo.",
                        conceito: "Falta de objetividade",
                        explicacao:
                            "Avaliar o próprio trabalho tende a esconder problemas. O CMMI pede verificação objetiva, feita por alguém sem interesse " +
                            "direto no resultado."
                    },
                    {
                        texto: "Automatizar os testes no pipeline para que não seja possível pulá-los.",
                        efeitos: { maturidade: 1, qualidade: 1, prazo: -1, moral: 1 },
                        condicional: { indicador: "qualidade", minimo: 6, efeitos: { maturidade: 1 }, texto: "Com a qualidade já em bom nível, os testes automatizados viram prática de toda a organização." },
                        resultado:
                            "Os testes passam a rodar em todo commit. A configuração leva algumas semanas, mas o \"pulei os testes\" acaba.",
                        conceito: "Institucionalização",
                        explicacao:
                            "Um processo só está institucionalizado quando é seguido mesmo sob pressão. Tornar a prática parte do fluxo de trabalho, " +
                            "e não uma escolha individual, é uma forma de garantir isso."
                    }
                ]
            },
            {
                id: "por-onde-comecar",
                tipo: "conhecimento",
                titulo: "Por onde começar?",
                falante: "Marta, Diretora de TI",
                descricao:
                    "A diretoria está dividida. Metade quer atacar só a maior dor, a gestão de requisitos. " +
                    "A outra metade quer um \"nível CMMI oficial\" para usar em editais. Você precisa escolher como estruturar o programa de melhoria.",
                opcoes: [
                    {
                        texto: "Representação contínua: focar primeiro na área de Gestão de Requisitos.",
                        efeitos: { maturidade: 1, qualidade: 1, orcamento: -1 },
                        efeitoAtrasado: { eventos: 1, efeitos: { qualidade: 1 }, texto: "Com requisitos claros, os retrabalhos caem ainda mais." },
                        resultado:
                            "A área de requisitos melhora rápido e os retrabalhos caem bastante. Ainda assim, a empresa não tem um nível de maturidade para apresentar em editais.",
                        conceito: "Representação contínua",
                        explicacao:
                            "Na representação contínua, a organização escolhe quais áreas de prática melhorar primeiro e mede cada uma em níveis de capacidade (0 a 3). " +
                            "É flexível e ideal quando a empresa já sabe onde está o problema. As duas representações usam o mesmo conteúdo de práticas; " +
                            "o que muda é a forma de organizar e medir o progresso."
                    },
                    {
                        texto: "Representação por estágios: seguir o roteiro de níveis de maturidade.",
                        efeitos: { maturidade: 2, prazo: -1, orcamento: -1, moral: -1 },
                        resultado:
                            "O roteiro é mais longo e exige esforço em várias áreas ao mesmo tempo, mas leva a um nível de maturidade reconhecido pelo mercado.",
                        conceito: "Representação por estágios",
                        explicacao:
                            "Na representação por estágios, a maturidade da organização inteira é medida em 5 níveis, com um caminho pré-definido. " +
                            "É ela que gera o \"nível CMMI\" usado em editais e benchmarks. Os capítulos deste jogo seguem exatamente essa lógica. " +
                            "Comparando: a contínua é flexível e mede áreas isoladas; a por estágios é um roteiro fixo que mede a organização como um todo."
                    },
                    {
                        texto: "Pular direto para o Nível 3 e padronizar tudo de uma vez.",
                        efeitos: { maturidade: 2, orcamento: -2, moral: -2 },
                        efeitoAtrasado: { eventos: 2, efeitos: { maturidade: -2, qualidade: -1 }, texto: "Ninguém consegue seguir dezenas de processos novos: a padronização de fachada desmorona." },
                        resultado:
                            "As equipes recebem dezenas de novos processos de uma vez. Ninguém consegue segui-los e a iniciativa perde força.",
                        conceito: "Não se pula níveis",
                        explicacao:
                            "Na representação por estágios, a sequência é obrigatória: um nível serve de base para o próximo. " +
                            "Sem projetos planejados e controlados (Nível 2), processos organizacionais (Nível 3) não se sustentam."
                    }
                ]
            }
        ]
    },
    {
        numero: 3,
        nome: "Padronização",
        nivel: "Nível 3 – Definido",
        meta: 9,
        introducao:
            "No Nível 3 (Definido), os processos deixam de ser de cada projeto e passam a ser da organização. " +
            "Existe um processo padrão, que cada projeto adapta às suas necessidades seguindo regras definidas.",
        eventos: [
            {
                id: "reinventando-a-roda",
                tipo: "situacao",
                titulo: "Cada projeto reinventa a roda",
                falante: "Júlia, Líder de projetos",
                descricao:
                    "Com os projetos planejados, surgiu outro problema: cada um cria do zero seus modelos de documento, checklists e estimativas. " +
                    "As lições aprendidas se perdem quando o projeto acaba.",
                opcoes: [
                    {
                        texto: "Criar uma biblioteca organizacional de processos, modelos e lições aprendidas.",
                        efeitos: { maturidade: 2, orcamento: -2 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: 1 }, texto: "Novos projetos começam em dias, e não em semanas, reaproveitando os modelos da biblioteca." },
                        resultado:
                            "Novos projetos começam em dias, e não em semanas, reaproveitando modelos e aprendizados.",
                        conceito: "Nível 3 – Definido",
                        explicacao:
                            "No Nível 3, os processos são definidos para a organização como um todo, e cada projeto adapta o processo padrão às suas " +
                            "necessidades. Um repositório de ativos de processo e de lições aprendidas é o coração desse nível."
                    },
                    {
                        texto: "Deixar cada projeto livre, desde que cumpra o plano.",
                        efeitos: { prazo: 1, moral: 1, qualidade: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { qualidade: -1 }, texto: "Os mesmos erros se repetem em equipes diferentes." },
                        resultado:
                            "Os projetos seguem entregando, mas os mesmos erros se repetem em equipes diferentes.",
                        conceito: "Nível 2 × Nível 3",
                        explicacao:
                            "No Nível 2, a disciplina existe projeto a projeto. Sem padrões organizacionais, o conhecimento fica preso em cada equipe " +
                            "e a empresa não evolui como um todo."
                    },
                    {
                        texto: "Impor um processo único e rígido, sem nenhuma adaptação.",
                        efeitos: { maturidade: 2, prazo: -2, moral: -2 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: -1 }, texto: "A burocracia do processo rígido atrasa os projetos pequenos." },
                        resultado:
                            "O processo não serve para projetos pequenos, que passam a gastar mais tempo com burocracia do que com código.",
                        conceito: "Adaptação do processo",
                        explicacao:
                            "Padronizar não é engessar. O CMMI prevê diretrizes de adaptação (tailoring): o processo organizacional é a base, " +
                            "e cada projeto o ajusta dentro de regras definidas."
                    }
                ]
            },
            {
                id: "novatos-perdidos",
                tipo: "situacao",
                titulo: "Os novatos estão perdidos",
                falante: "Paula, Gerente de RH",
                descricao:
                    "A empresa contratou oito desenvolvedores. Eles levam meses para aprender o processo, e os veteranos perdem horas " +
                    "explicando as mesmas coisas várias vezes.",
                opcoes: [
                    {
                        texto: "Criar um programa de treinamento organizacional sobre os processos.",
                        efeitos: { maturidade: 1, qualidade: 1, orcamento: -1 },
                        condicional: { indicador: "moral", minimo: 5, efeitos: { maturidade: 1 }, texto: "A equipe engajada absorve o treinamento e passa a sugerir melhorias no processo." },
                        resultado:
                            "Em poucas semanas, os novatos já trabalham seguindo o processo, e os veteranos voltam às suas tarefas.",
                        conceito: "Treinamento organizacional",
                        explicacao:
                            "No Nível 3, a organização desenvolve as habilidades das pessoas para que executem os processos de forma eficaz. " +
                            "O treinamento é planejado pela organização, e não improvisado por cada equipe."
                    },
                    {
                        texto: "Colocar cada novato para acompanhar um veterano.",
                        efeitos: { qualidade: 1, prazo: -2, moral: 1 },
                        resultado:
                            "Funciona, mas depende do veterano: alguns novatos aprendem o processo, outros aprendem os atalhos.",
                        conceito: "Conhecimento tácito",
                        explicacao:
                            "Aprender só observando colegas transmite também os maus hábitos. Um processo definido e documentado garante que todos " +
                            "aprendam a mesma forma de trabalhar."
                    },
                    {
                        texto: "Deixar que aprendam fazendo, sem gastar com treinamento.",
                        efeitos: { orcamento: 1, qualidade: -2 },
                        efeitoAtrasado: { eventos: 1, efeitos: { moral: -1 }, texto: "Os novatos, frustrados com os erros, começam a perder a motivação." },
                        resultado:
                            "A empresa economiza em treinamento, mas os erros de iniciante chegam aos clientes.",
                        conceito: "Custo da falta de treinamento",
                        explicacao:
                            "Pessoas sem preparo não conseguem seguir o processo, por melhor que ele seja. " +
                            "A economia com treinamento costuma voltar como retrabalho e defeitos."
                    }
                ]
            },
            {
                id: "estrutura-do-modelo",
                tipo: "conhecimento",
                titulo: "Afinal, como o CMMI é organizado?",
                falante: "Carlos, CEO",
                descricao:
                    "O Conselho de Administração quer entender o modelo antes de aprovar o orçamento do próximo ano. " +
                    "Carlos pede que você explique como o CMMI é organizado.",
                opcoes: [
                    {
                        texto: "Apresentar a estrutura completa: domínios, áreas de prática e níveis de capacidade e de maturidade.",
                        efeitos: { orcamento: 2, prazo: -1 },
                        resultado:
                            "A apresentação é longa, mas o conselho entende o caminho e aprova o orçamento do programa.",
                        conceito: "Estrutura do CMMI",
                        explicacao:
                            "Na versão atual (V3.0, de 2023, mantida pelo CMMI Institute, da ISACA), o modelo se organiza em domínios " +
                            "(Desenvolvimento, Serviços, Fornecedores, Segurança, Pessoas, Dados, entre outros), que reúnem áreas de prática, como Planejamento, " +
                            "Gestão de Requisitos e Garantia da Qualidade. Cada área de prática é medida em níveis de capacidade (0 a 3), e conjuntos de áreas " +
                            "formam os níveis de maturidade (1 a 5) da organização."
                    },
                    {
                        texto: "Mostrar apenas o nível que a empresa quer atingir e em quanto tempo.",
                        efeitos: { orcamento: 1, qualidade: -1 },
                        resultado:
                            "O conselho aprova um orçamento menor, sem entender por que tantas áreas precisam mudar ao mesmo tempo.",
                        conceito: "Níveis de maturidade",
                        explicacao:
                            "Os 5 níveis de maturidade são: 1 – Inicial, 2 – Gerenciado, 3 – Definido, 4 – Gerenciado Quantitativamente e " +
                            "5 – Em Otimização. Mas cada nível depende de várias áreas de prática funcionando juntas, e isso precisa ficar claro para quem investe."
                    },
                    {
                        texto: "Dizer que é técnico demais e pedir que confiem na consultoria.",
                        efeitos: { orcamento: -2, prazo: 1 },
                        resultado:
                            "O conselho desconfia e corta parte da verba do programa.",
                        conceito: "Patrocínio da alta direção",
                        explicacao:
                            "Programas de melhoria precisam do apoio da alta direção. Sem entender o modelo, a diretoria tende a cortar o investimento no primeiro aperto."
                    }
                ]
            }
        ]
    },
    {
        numero: 4,
        nome: "Medição",
        nivel: "Nível 4 – Gerenciado Quantitativamente",
        meta: 12,
        introducao:
            "No Nível 4 (Gerenciado Quantitativamente), a organização define objetivos numéricos de qualidade e desempenho " +
            "e usa dados e técnicas estatísticas para prever resultados e tomar decisões.",
        eventos: [
            {
                id: "o-que-medir",
                tipo: "situacao",
                titulo: "O que medir?",
                falante: "Carlos, CEO",
                descricao:
                    "Carlos quer \"uma empresa orientada a dados\" e sugere medir a produtividade pelas linhas de código escritas por cada desenvolvedor.",
                opcoes: [
                    {
                        texto: "Definir métricas ligadas aos objetivos do negócio: prazo, defeitos e satisfação do cliente.",
                        efeitos: { maturidade: 1, qualidade: 1, orcamento: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: 1 }, texto: "As métricas apontam o gargalo real, e resolvê-lo acelera as entregas." },
                        resultado:
                            "As métricas mostram onde estão os gargalos reais, e as decisões passam a ser tomadas com base nelas.",
                        conceito: "Medição alinhada aos objetivos",
                        explicacao:
                            "No Nível 4, a organização define objetivos quantitativos derivados dos objetivos do negócio. " +
                            "Uma métrica só é útil se ajuda a responder uma pergunta importante."
                    },
                    {
                        texto: "Medir linhas de código, como o CEO pediu.",
                        efeitos: { prazo: 1, orcamento: 1, qualidade: -2 },
                        efeitoAtrasado: { eventos: 1, efeitos: { moral: -1 }, texto: "Os desenvolvedores percebem que são avaliados por uma métrica vazia e se desmotivam." },
                        resultado:
                            "Os desenvolvedores passam a escrever código mais longo, não melhor. O número sobe, e a qualidade cai.",
                        conceito: "Métricas de vaidade",
                        explicacao:
                            "Quando uma medida vira meta, as pessoas passam a otimizar o número, e não o resultado. " +
                            "Métricas mal escolhidas distorcem o comportamento da equipe."
                    },
                    {
                        texto: "Medir tudo o que for possível e decidir depois o que usar.",
                        efeitos: { maturidade: 2, orcamento: -2, prazo: -1, moral: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { maturidade: -1 }, texto: "Com 200 indicadores, ninguém usa o painel, e a medição é abandonada." },
                        resultado:
                            "O painel ganha 200 indicadores. Ninguém sabe quais importam, e a coleta consome horas toda semana.",
                        conceito: "Medir com propósito",
                        explicacao:
                            "Coletar dados custa caro. O CMMI orienta definir primeiro os objetivos e as perguntas, e só então escolher o que medir."
                    }
                ]
            },
            {
                id: "estimativa-com-dados",
                tipo: "situacao",
                titulo: "Estimativa com dados",
                falante: "Júlia, Líder de projetos",
                descricao:
                    "Um cliente pede a estimativa de um sistema novo. Pela primeira vez, a empresa tem dois anos de dados históricos de projetos.",
                opcoes: [
                    {
                        texto: "Usar os dados históricos e técnicas estatísticas para estimar com uma margem de confiança.",
                        efeitos: { maturidade: 2, prazo: -1, orcamento: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: 2 }, texto: "O projeto termina dentro da faixa prevista pela estimativa estatística." },
                        resultado:
                            "A estimativa vem com margem de erro conhecida. O projeto termina dentro da faixa prevista.",
                        conceito: "Nível 4 – Gerenciado Quantitativamente",
                        explicacao:
                            "No Nível 4, as decisões usam técnicas estatísticas e quantitativas. Com dados históricos, a empresa entende a variação " +
                            "natural dos seus processos e prevê resultados com muito mais segurança."
                    },
                    {
                        texto: "Estimar pela experiência do líder, como sempre.",
                        efeitos: { orcamento: 1, prazo: -1 },
                        efeitoAtrasado: { eventos: 1, efeitos: { prazo: -1 }, texto: "O projeto passa 40% do prazo estimado pela experiência do líder." },
                        resultado:
                            "A estimativa sai rápido, mas o projeto passa 40% do prazo previsto.",
                        conceito: "Estimativa sem base",
                        explicacao:
                            "Ter dados e não usá-los desperdiça o investimento em medição. A experiência é valiosa, mas é enviesada: " +
                            "tende a lembrar dos sucessos e esquecer dos atrasos."
                    },
                    {
                        texto: "Dar a estimativa mais baixa possível para garantir o contrato.",
                        efeitos: { orcamento: 2, prazo: -1, qualidade: -1, moral: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: -2 }, texto: "O prazo impossível estoura, e o cliente cobra." },
                        resultado:
                            "O contrato é fechado, mas a equipe corre contra um prazo impossível e a qualidade sofre.",
                        conceito: "Compromissos realistas",
                        explicacao:
                            "Desde o Nível 2, o CMMI exige que compromissos sejam baseados em estimativas. Prometer o impossível transfere o " +
                            "problema para a equipe e para o cliente."
                    }
                ]
            },
            {
                id: "quem-ja-chegou",
                tipo: "conhecimento",
                titulo: "Quem já chegou lá?",
                falante: "Ricardo, Diretor Comercial",
                descricao:
                    "Um possível cliente pergunta: \"Quem mais tem CMMI? E como eu confiro se é verdade?\" " +
                    "Ricardo pede sua ajuda para preparar a resposta.",
                opcoes: [
                    {
                        texto: "Mostrar exemplos de empresas avaliadas e como consultar os resultados oficiais.",
                        efeitos: { orcamento: 2, prazo: -1 },
                        resultado:
                            "O cliente consulta a base oficial, reconhece empresas de peso e fecha o contrato.",
                        conceito: "Empresas avaliadas",
                        explicacao:
                            "IBM e Genpact estão entre as grandes empresas avaliadas no Nível 5 do CMMI. No Brasil, IBM Brasil, Everis/Minsait e " +
                            "Log Lab (Cuiabá) também chegaram ao Nível 5. Apenas cerca de 5% das organizações que buscam o CMMI chegam ao nível mais alto. " +
                            "Os resultados oficiais são públicos no PARS (Published Appraisal Results System), da ISACA."
                    },
                    {
                        texto: "Dizer que \"todas as grandes empresas têm\", sem dar exemplos.",
                        efeitos: { orcamento: -1 },
                        resultado:
                            "O cliente pede provas, a resposta demora e ele fecha com um concorrente.",
                        conceito: "Afirmações precisam de dados",
                        explicacao:
                            "Resultados de avaliações CMMI são públicos e verificáveis. Uma empresa que busca o Nível 4 deveria ser a primeira a " +
                            "responder com dados, e não com impressões."
                    },
                    {
                        texto: "Prometer ao cliente que a TechNova terá Nível 5 em três meses.",
                        efeitos: { orcamento: 3, prazo: -2, maturidade: -1, moral: -1 },
                        resultado:
                            "O cliente assina, mas a equipe passa a correr atrás de uma promessa impossível, pulando etapas do processo.",
                        conceito: "Tempo realista",
                        explicacao:
                            "Chegar ao Nível 5 é raro e demorado: implantar o CMMI costuma levar de 18 a 24 meses só para gerar retorno visível, " +
                            "e cada nível exige que o anterior esteja consolidado."
                    }
                ]
            }
        ]
    },
    {
        numero: 5,
        nome: "Melhoria",
        nivel: "Nível 5 – Em Otimização",
        meta: 15,
        introducao:
            "No Nível 5 (Em Otimização), a organização melhora continuamente seus processos: identifica as causas dos problemas, " +
            "testa inovações com dados e se adapta a mudanças sem perder estabilidade.",
        eventos: [
            {
                id: "mesmo-defeito",
                tipo: "situacao",
                titulo: "O mesmo defeito, de novo",
                falante: "Bianca, Analista de Qualidade",
                descricao:
                    "As métricas mostram que 40% dos defeitos em produção vêm do mesmo tipo de erro: integração com os sistemas dos clientes. " +
                    "As equipes corrigem cada caso, mas eles continuam aparecendo.",
                opcoes: [
                    {
                        texto: "Fazer uma análise de causa raiz e mudar o processo para prevenir o problema.",
                        efeitos: { maturidade: 2, qualidade: 2, prazo: -1, orcamento: -1 },
                        resultado:
                            "A causa era um checklist de integração incompleto. Com o processo corrigido, esse tipo de defeito cai 70%.",
                        conceito: "Análise causal",
                        explicacao:
                            "No Nível 5, a organização identifica as causas de defeitos e problemas e age para evitar que se repitam. " +
                            "Em vez de apagar incêndios, ela elimina o que os provoca."
                    },
                    {
                        texto: "Criar uma equipe dedicada só a corrigir bugs de integração.",
                        efeitos: { qualidade: 1, prazo: 1, orcamento: -2 },
                        resultado:
                            "Os bugs são corrigidos mais rápido, mas continuam surgindo no mesmo ritmo.",
                        conceito: "Corrigir não é prevenir",
                        explicacao:
                            "Tratar o sintoma deixa a causa intacta. Uma organização madura investe em evitar o defeito, e não só em consertá-lo mais rápido."
                    },
                    {
                        texto: "Aceitar como normal: todo software tem defeitos.",
                        efeitos: { prazo: 1, qualidade: -2, moral: -1 },
                        efeitoAtrasado: { eventos: 1, efeitos: { orcamento: -1 }, texto: "Clientes desconfiados passam a pedir descontos." },
                        resultado:
                            "Nada muda. Os clientes começam a perguntar se a TechNova é mesmo tão madura quanto diz.",
                        conceito: "Complacência",
                        explicacao:
                            "Ter dados sobre defeitos e não agir sobre eles desperdiça tudo o que foi construído nos níveis anteriores."
                    }
                ]
            },
            {
                id: "inovar-sem-quebrar",
                tipo: "situacao",
                titulo: "Inovar sem quebrar",
                falante: "Diego, Arquiteto de Software",
                descricao:
                    "Diego quer adotar deploy contínuo, uma prática que promete reduzir o tempo de entrega pela metade. " +
                    "Parte da diretoria tem medo de mexer no que está funcionando.",
                opcoes: [
                    {
                        texto: "Fazer um piloto controlado, medir os resultados e só então expandir.",
                        efeitos: { maturidade: 2, prazo: -1, orcamento: -1 },
                        efeitoAtrasado: { eventos: 2, efeitos: { prazo: 2 }, texto: "O piloto se paga: a prática expandida reduz em 35% o tempo de entrega." },
                        resultado:
                            "O piloto confirma um ganho de 35% no tempo de entrega. A prática é adotada com dados que comprovam o resultado.",
                        conceito: "Nível 5 – Em Otimização",
                        explicacao:
                            "No Nível 5, melhorias e inovações são selecionadas, testadas em pilotos e implantadas de forma controlada, com base em dados. " +
                            "A organização é estável, mas não parada."
                    },
                    {
                        texto: "Adotar em todos os projetos de uma vez.",
                        efeitos: { prazo: 2, qualidade: -2 },
                        efeitoAtrasado: { eventos: 1, efeitos: { qualidade: -1 }, texto: "Mais projetos quebram em produção." },
                        resultado:
                            "Alguns projetos ficam muito mais rápidos. Outros quebram em produção.",
                        conceito: "Mudança sem controle",
                        explicacao:
                            "Mudar todos os processos ao mesmo tempo, sem medir o efeito, é arriscado. Pilotos reduzem o risco e geram evidências."
                    },
                    {
                        texto: "Não mexer: o processo atual já é maduro.",
                        efeitos: { maturidade: -1, orcamento: 1, moral: 1 },
                        resultado:
                            "Tudo continua estável, enquanto os concorrentes entregam cada vez mais rápido e ganham clientes.",
                        conceito: "Maturidade não é estagnação",
                        explicacao:
                            "O Nível 5 é justamente o da melhoria contínua. Uma organização que para de melhorar começa a perder maturidade."
                    }
                ]
            },
            {
                id: "vale-a-pena",
                tipo: "conhecimento",
                titulo: "Vale a pena continuar?",
                falante: "Helena, Diretora Financeira",
                descricao:
                    "A nova diretora financeira analisa as contas: \"O programa de melhoria custa caro. Já estamos bem, por que continuar investindo?\"",
                opcoes: [
                    {
                        texto: "Apresentar os benefícios medidos: custo, retrabalho, prazos e satisfação dos clientes.",
                        efeitos: { maturidade: 1, orcamento: 2, prazo: -1 },
                        resultado:
                            "Os números convencem: o programa se paga e ganha verba para mais um ano.",
                        conceito: "Benefícios do CMMI",
                        explicacao:
                            "Organizações maduras relatam menos retrabalho e defeitos, prazos e custos mais previsíveis, clientes mais satisfeitos e " +
                            "vantagem em editais. Um estudo da PwC apontou até 27% de redução em custos operacionais. Na TechNova, esses benefícios " +
                            "aparecem nos seus próprios indicadores."
                    },
                    {
                        texto: "Concordar e encerrar o programa para economizar.",
                        efeitos: { orcamento: 3, maturidade: -2, qualidade: -1, moral: -1 },
                        resultado:
                            "Sobra dinheiro no curto prazo, mas sem manutenção os processos começam a se degradar.",
                        conceito: "Melhoria é contínua",
                        explicacao:
                            "Uma avaliação oficial vale por até 5 anos. Para manter o nível, a organização precisa continuar praticando e melhorando os processos."
                    },
                    {
                        texto: "Reduzir o programa pela metade.",
                        efeitos: { orcamento: 1, prazo: 1, qualidade: -1 },
                        resultado:
                            "O programa continua, mas mais lento. Algumas melhorias planejadas ficam para depois.",
                        conceito: "Custo × benefício",
                        explicacao:
                            "Cortar pela metade parece prudente, mas sem dados de retorno a decisão é um palpite. " +
                            "No Nível 5, até o investimento em melhoria deve ser decidido com base em dados."
                    }
                ]
            }
        ]
    }
];

// Crises: a cada partida, algumas são sorteadas e inseridas nos capítulos 2 a 5.
