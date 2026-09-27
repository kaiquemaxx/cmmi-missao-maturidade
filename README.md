# CMMI: Missão Maturidade

Jogo educacional sobre CMMI desenvolvido para a disciplina de Qualidade e Auditoria de Tecnologia da Informação.

Simulador narrativo de gestão: o jogador é um consultor de melhoria de processos contratado pela TechNova Sistemas e precisa evoluir a maturidade da empresa tomando decisões baseadas no CMMI, equilibrando **Maturidade**, **Qualidade**, **Prazo** e **Orçamento**.

Fluxo: Evento → Decisão → Consequência → Explicação → Próximo evento.

## Como jogar

- A campanha tem **5 capítulos**, um por nível de maturidade: Caos, Controle, Padronização, Medição e Melhoria.
- Cada capítulo tem uma **meta de Maturidade** (3, 6, 9, 12 e 15). Se ela for alcançada, a empresa ganha +1 em Qualidade, Prazo e Orçamento.
- A cada partida, **2 crises** são sorteadas e aparecem em capítulos aleatórios.
- **Habilidades:** Auditoria Interna (2x, revela as consequências das opções), Reserva de Orçamento (1x, evita a próxima perda de orçamento) e Replanejamento (1x, +2 de prazo).
- **Derrota:** Qualidade, Prazo ou Orçamento chega a 0.
- **Desafio final:** quem termina o capítulo 5 com 15 de Maturidade enfrenta a avaliação oficial de Nível 5.
- **Finais:** excelência, vitória, vitória apertada, avaliação reprovada, fim no Nível 1 a 4 ou derrota por indicador.

## Como rodar

O jogo é feito em HTML, CSS e JavaScript, sem servidor nem banco de dados.

- Abra o `index.html` direto no navegador, **ou**
- Use a extensão Live Server no VS Code e abra o projeto pelo botão **Go Live**, **ou**
- Sirva a pasta localmente com `npx http-server -p 8080` e acesse `http://localhost:8080`.

## Estrutura

| Arquivo                 | Conteúdo                                                                     |
| ----------------------- | ---------------------------------------------------------------------------- |
| `index.html`            | Telas: inicial, como jogar, capítulo, jogo (HUD, habilidades e evento) e fim |
| `css/reset.css`         | Reset de estilos padrão do navegador                                         |
| `css/base.css`          | Estilos gerais da página                                                     |
| `css/tela-inicial.css`  | Estilos da tela inicial                                                      |
| `css/como-jogar.css`    | Estilos da tela Como Jogar                                                   |
| `css/capitulo.css`      | Estilos das telas de capítulo                                                |
| `css/jogo.css`          | Estrutura geral da tela do jogo                                              |
| `css/hud.css`           | Estilos do HUD e indicadores                                                 |
| `css/habilidades.css`   | Estilos das habilidades                                                      |
| `css/eventos.css`       | Estilos dos eventos e opções                                                 |
| `css/resultado.css`     | Estilos das consequências e explicações                                      |
| `css/fim.css`           | Estilos da tela final                                                        |
| `css/responsive.css`    | Ajustes de responsividade                                                    |
| `js/eventos.js`         | Conteúdo: capítulos, eventos, crises e desafio final                         |
| `js/main.js`            | Lógica: estado, HUD, habilidades, capítulos, crises e finais                 |
| `docs/pesquisa-cmmi.md` | Pesquisa de referência sobre CMMI                                            |

## Conteúdo obrigatório de CMMI no jogo

| Tópico                          | Onde aparece                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| Origem do CMMI                  | Cap. 1: "O edital exige CMMI"                                                          |
| Conceito e objetivos            | Cap. 1: "A ferramenta milagrosa" e "Cada equipe do seu jeito"                          |
| Estrutura                       | Cap. 3: "Afinal, como o CMMI é organizado?" e introduções dos capítulos (níveis 1 a 5) |
| Representação contínua          | Cap. 2: "Por onde começar?"; crise "Corte de 30% nos custos"                           |
| Representação por estágios      | Cap. 2: "Por onde começar?"; estrutura de capítulos do jogo                            |
| Comparação entre representações | Cap. 2: "Por onde começar?"                                                            |
| Empresas avaliadas              | Cap. 4: "Quem já chegou lá?"                                                           |
| Tempo e custo                   | Crise "A avaliação está chegando"; Cap. 4: "Quem já chegou lá?"; desafio final         |
| Benefícios                      | Cap. 5: "Vale a pena continuar?"; bônus de fim de capítulo                             |

Distribuição por partida: 10 situações (≈ 56%), 5 eventos de conhecimento (≈ 28%) e 3 crises, contando o desafio final (≈ 17%).

## Adicionando eventos

Adicione um objeto ao array `eventos` de um capítulo em `js/eventos.js` (ou ao array `CRISES`), com `id`, `tipo` (`situacao`, `conhecimento` ou `crise`), `titulo`, `falante`, `descricao` e 2 ou 3 `opcoes`.

Cada opção tem `texto`, `efeitos` (ex.: `{ maturidade: 2, prazo: -1 }`), `resultado`, `conceito` e `explicacao`.

As consequências das opções ficam ocultas durante a escolha e só são exibidas antecipadamente quando a habilidade **Auditoria Interna** é utilizada.

Ao mudar os efeitos, confira o balanceamento: seguindo sempre as boas práticas do CMMI e usando bem as habilidades, o jogador deve conseguir vencer; escolhendo ao acaso, deve perder na maioria das vezes.
