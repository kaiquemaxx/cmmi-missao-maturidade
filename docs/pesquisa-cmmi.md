# Pesquisa sobre CMMI

Material de referência para a disciplina de Qualidade e Auditoria de TI, servindo de base para a transformação em eventos, decisões e explicações do jogo. Cada seção corresponde a um item exigido no trabalho.

---

## 1. Origem do CMMI

O CMMI (Capability Maturity Model Integration) tem origem na década de 1980, quando o **Departamento de Defesa dos Estados Unidos (DoD)** enfrentava problemas recorrentes de atraso, estouro de orçamento e baixa qualidade em projetos de software contratados de fornecedores externos. Para reduzir esse risco na contratação, o DoD financiou a criação do **SEI (Software Engineering Institute)**, fundado em 14 de novembro de 1984 na **Carnegie Mellon University**.

O SEI desenvolveu inicialmente o **CMM (Capability Maturity Model)**, focado em software. Com o tempo, surgiram vários modelos de maturidade paralelos para diferentes disciplinas (engenharia de sistemas, aquisição, desenvolvimento integrado de produtos), o que gerava sobreposição e dificuldade de uso combinado. O **projeto CMMI**, reunindo indústria, governo e o SEI, integrou esses modelos em um framework único, publicado em **2000** pelo CMMI Product Team.

Hoje o CMMI é mantido pelo **CMMI Institute**, adquirido pela **ISACA** em 2016, responsável pela versão mais recente, o **CMMI V3.0** (lançado em abril de 2023).

> Gancho para evento: a origem liga-se bem a um evento de "auditoria externa"/"cliente exigindo certificação" no capítulo 1, remetendo à motivação original (contratante querendo reduzir risco).

---

## 2. Conceito e objetivos

**Conceito:** o CMMI é um modelo de referência para **melhoria de processos**, que descreve práticas organizadas por níveis de maturidade/capacidade. Ele não prescreve *como* fazer o trabalho, mas *o que* uma organização precisa ter implementado (gestão, engenharia, suporte) para produzir resultados previsíveis e de qualidade.

**Objetivos principais:**
- Fornecer um **modelo comum** para avaliar e melhorar a maturidade dos processos de uma organização.
- Reduzir **variabilidade** entre equipes (cada uma "trabalhando do seu jeito").
- Aumentar a **previsibilidade** de prazo, custo e qualidade.
- Criar uma base para **decisões orientadas a dados** (à medida que a organização amadurece).
- Sustentar **melhoria contínua** de longo prazo, não apenas correções pontuais.

> Gancho para evento: o "objetivo" do jogador (consultor) é justamente perseguir esses objetivos organizacionais — dá pra usar essa lista quase como um "briefing da missão".

---

## 3. Estrutura do CMMI

Na versão atual (V3.0), a estrutura é organizada em:

- **Domínios (Constellations):** o CMMI V3.0 oferece visões voltadas a diferentes áreas de negócio (ex.: Desenvolvimento, Serviços, Fornecedores/Aquisição, Segurança, Pessoas/Workforce, Gestão de Dados, entre outras) — ao todo cerca de 8 domínios que podem ser combinados conforme o objetivo da organização.
- **Áreas de Prática (Practice Areas – PAs):** substituíram as antigas "Process Areas" das versões 1.x/2.0. Cada PA agrupa práticas relacionadas a um tema (ex.: Planejamento, Gestão de Requisitos, Garantia da Qualidade, Gestão de Riscos).
- **Níveis de Capacidade (0 a 3):** medem a maturidade de **uma única** área de prática isoladamente.
- **Níveis de Maturidade (1 a 5):** medem a maturidade de **um conjunto definido** de áreas de prática para a organização como um todo. Na V3.0, o Nível de Maturidade 2, por exemplo, passou a significar "todas as PAs relevantes no nível de capacidade 2" — uma mudança filosófica importante em relação a versões anteriores.

Os **cinco níveis de maturidade** (representação por estágios):

| Nível | Nome | Característica |
|---|---|---|
| 1 | Initial (Inicial) | Processos imprevisíveis, reativos, ad hoc; entregas atrasadas e fora do orçamento |
| 2 | Managed (Gerenciado) | Projetos planejados, medidos e controlados, mas ainda isolados por projeto |
| 3 | Defined (Definido) | Processos padronizados e adotados em toda a organização |
| 4 | Quantitatively Managed (Gerenciado Quantitativamente) | Decisões baseadas em análise estatística de desempenho |
| 5 | Optimizing (Em Otimização) | Processos estáveis e flexíveis, em melhoria contínua |

Isso mapeia quase diretamente para os 5 capítulos já definidos para o jogo (Caos → Controle → Padronização → Medição → Melhoria).

---

## 4. Representação contínua

Foco: a **capacidade de áreas de prática individuais**, não da organização como um todo.

- A organização escolhe **quais áreas de prática melhorar primeiro**, de acordo com seus objetivos de negócio.
- Cada PA é avaliada em uma escala própria de **níveis de capacidade (0 a 3)**.
- Mais flexível: útil quando a organização já sabe onde tem dor (ex.: só gestão de requisitos é um problema).
- Não existe uma ordem obrigatória entre as áreas.

> Gancho para evento/habilidade: poderia inspirar uma mecânica onde o jogador escolhe livremente qual "área" atacar primeiro num certo capítulo, ilustrando a lógica contínua.

---

## 5. Representação por estágios

Foco: a **maturidade da organização como um todo**, por meio de um caminho pré-definido.

- Agrupa um conjunto fixo de áreas de prática em cada nível de maturidade (1 a 5).
- Segue uma **sequência obrigatória**: não é possível "pular" um nível.
- Mais indicada para organizações que **não sabem por onde começar** — o modelo já entrega o roteiro pronto.
- É a representação mais usada para benchmarking e comparação entre organizações (o "nível CMMI X" que aparece em editais e certificações é sempre da representação por estágios).

> Gancho de jogo: essa é a representação que já bate 1:1 com a estrutura de capítulos do jogo — vale citar isso explicitamente numa explicação in-game ("você está seguindo a representação por estágios").

---

## 6. Comparação entre as representações

| Critério | Contínua | Por estágios |
|---|---|---|
| Unidade de medida | Nível de capacidade (0–3) por área de prática | Nível de maturidade (1–5) da organização |
| Ordem de melhoria | Livre, definida pela organização | Fixa, pré-definida pelo modelo |
| Melhor para | Empresas que já sabem onde doem os processos | Empresas que precisam de um roteiro guiado |
| Uso em certificação/benchmark | Menos comum | É o padrão usado no mercado |
| Conteúdo do modelo | O mesmo conjunto de práticas, apenas organizado de outra forma | idem |

Ponto-chave para a explicação in-game: **as duas representações usam o mesmo conteúdo de práticas** — a diferença é só a forma de organizar e medir o progresso, não o "o que fazer".

---

## 7. Empresas avaliadas (exemplos)

**Internacionais:**
- **IBM** — uma das primeiras grandes empresas globais de TI avaliadas no CMMI V2.0 Nível de Maturidade 5 (2019).
- **Genpact** — avaliada em CMMI V2.0 Nível 5, entrando num grupo de cerca de 30 empresas no mundo com esse nível.

**No Brasil:**
- **IBM Brasil** — primeira organização no país a atingir o nível mais alto do CMMI.
- **Everis** (hoje parte da Minsait/Indra) — Nível 5 em centros de alto rendimento, incluindo a unidade de Uberlândia (MG).
- **Minsait** — renovação do selo CMMI Nível 5 estendida às subsidiárias no Brasil, Espanha, México, Colômbia e Peru.
- **Log Lab – Inteligência Digital** (Cuiabá/MT) — certificação CMMI Nível 5, atendendo órgãos públicos.

Dado interessante para uma explicação in-game: **apenas cerca de 5% das organizações que buscam algum nível CMMI conseguem chegar ao Nível 5** — reforça a ideia de que o "final" do jogo (15 pontos de maturidade) representa uma conquista rara, não trivial.

Resultados de avaliação (appraisals) podem ser consultados publicamente na base oficial **ISACA PARS (Published Appraisal Results System)**.

---

## 8. Tempo e custo envolvidos

**Tempo/custo de implementação (a organização se preparando):**
- Não é um processo rápido: estudos indicam um horizonte realista de **18 a 24 meses** para resultados visíveis de ROI.
- A maior parte do esforço (e custo) antes da avaliação está na **coleta e organização de evidências objetivas** (documentação de processos, métricas, registros) — não na avaliação em si.

**Avaliação formal (SCAMPI – Standard CMMI Appraisal Method for Process Improvement):**
- **SCAMPI C** (mais leve, diagnóstico): 1 a 2 dias.
- **SCAMPI B** (intermediário): 1 a 2 semanas.
- **SCAMPI A** (avaliação formal, gera o nível oficial): 2 a 3 semanas, com cada participante dedicando de 1 a 3 horas em entrevistas/apresentações.
- Uma avaliação SCAMPI A tem validade e precisa ser renovada em, no máximo, **5 anos**.
- Custos específicos variam muito conforme o tamanho da organização e não são publicados de forma padronizada — mas o consenso é que o **custo real está concentrado na preparação interna**, não na avaliação em si.

> Gancho de evento/crise: "a avaliação está marcada para daqui a X meses e a documentação não está pronta" é um ótimo gatilho de evento de pressão de prazo vs. maturidade.

---

## 9. Benefícios da utilização do CMMI

- **Redução de custo operacional:** estudo da PwC apontou até **27% de redução em custos operacionais** em organizações com alta maturidade de processo.
- **Melhoria de qualidade:** menos retrabalho e defeitos, graças a controles de qualidade mais fortes.
- **Previsibilidade de prazo e orçamento:** processos padronizados reduzem variabilidade entre projetos/equipes.
- **Satisfação do cliente:** entregas mais consistentes geram mais confiança do contratante — herança direta do motivo original de criação do modelo (DoD avaliando fornecedores).
- **Vantagem competitiva/comercial:** nível CMMI costuma ser exigido em editais e concorrências, especialmente contratos públicos e internacionais.
- **Base para melhoria contínua:** nos níveis mais altos (4 e 5), a empresa passa a usar dados estatísticos para prever e prevenir problemas, em vez de apenas reagir.

Essas quatro classes de benefício (custo, prazo, qualidade, satisfação do cliente) **mapeiam quase diretamente para os indicadores do jogo** (Orçamento, Prazo, Qualidade, e Maturidade como proxy de "confiança"/satisfação).

---