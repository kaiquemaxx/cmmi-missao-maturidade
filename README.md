# CMMI: Missão Maturidade

Jogo educacional sobre CMMI desenvolvido para a disciplina de Qualidade e Auditoria de Tecnologia da Informação.

Simulador narrativo de gestão: o jogador é um consultor de melhoria de processos contratado pela TechNova Sistemas e precisa evoluir a maturidade da empresa tomando decisões baseadas no CMMI, equilibrando **Maturidade**, **Qualidade**, **Prazo** e **Orçamento**.

Fluxo: Evento → Decisão → Consequência → Explicação → Próximo evento.

## Como jogar

- Escolha a **dificuldade** (Fácil, Normal ou Difícil): ela define os valores iniciais, a quantidade de crises e de usos das habilidades, e um multiplicador de pontos.
- A campanha tem **5 capítulos**, um por nível de maturidade: Caos, Controle, Padronização, Medição e Melhoria.
- Cada capítulo tem uma **meta de Maturidade** (3, 6, 9, 12 e 15). Se ela for alcançada, a empresa ganha +1 em Qualidade, Prazo, Orçamento e Moral.
- A cada partida, **crises** são sorteadas (1, 2 ou 3, conforme a dificuldade) e aparecem em capítulos aleatórios (2 a 5).
- **Moral da equipe:** com Moral em 3 ou menos, cada ganho de Maturidade rende 1 ponto a menos.
- **Consequências atrasadas:** várias decisões cobram o preço, ou dão o retorno, 1 ou 2 decisões depois. O painel mostra quantas estão a caminho.
- **Efeitos condicionais:** algumas opções rendem mais quando a empresa já está bem em um indicador (ex.: testes automatizados com Qualidade ≥ 6).
- **Habilidades:** Auditoria Interna (revela as consequências imediatas das opções), Reserva de Orçamento (evita a próxima perda de orçamento) e Replanejamento (+2 de prazo).
- **Derrota:** Qualidade, Prazo, Orçamento ou Moral chega a 0.
- **Desafio final:** quem termina o capítulo 5 com 15 de Maturidade enfrenta a avaliação oficial de Nível 5.
- **Finais:** excelência, vitória, vitória apertada, avaliação com ressalvas (Nível 4), avaliação reprovada, fim no Nível 1 a 4 ou derrota por indicador.
- **Pontuação e recorde:** calculada no fim da partida; o recorde por dificuldade fica salvo no navegador.

## Como rodar

O jogo é só HTML, CSS e JavaScript (ES modules), sem dependências nem banco de dados. Como o navegador não carrega módulos a partir de `file://`, é preciso servir a pasta:

```bash
npm start            # npx http-server -p 8080 -c-1
# ou
python3 -m http.server 8080
```

Acesse http://localhost:8080.

## Testes

Requer Node.js 20 ou superior. Não há dependências para instalar.

```bash
npm test
```

| Arquivo | O que cobre |
|---|---|
| `tests/efeitos.test.js` | Limites, soma de efeitos, condições, penalidade de moral, níveis |
| `tests/campanha.test.js` | Sorteio e posicionamento das crises |
| `tests/motor.test.js` | Fluxo completo (capítulos, derrota, desafio final), habilidades, efeitos atrasados e condicionais |
| `tests/finais.test.js` | Escolha do final e pontuação |
| `tests/recorde.test.js` | Recorde por dificuldade e armazenamento indisponível |
| `tests/conteudo.test.js` | Integridade de todos os eventos e ausência de opções melhores em tudo |
| `tests/balanceamento.test.js` | Simula centenas de partidas: estratégia gananciosa não garante excelência, excelência é alcançável, dificuldade escalona |

## Estrutura

```
index.html              Telas: inicial, como jogar, capítulo, jogo e fim
css/style.css           Estilos
js/
  main.js               Ponto de entrada: liga o motor à interface
  dados/                Conteúdo e regras (sem lógica)
    config.js           Indicadores, limites, habilidades e dificuldades
    capitulos.js        Os 5 capítulos e seus eventos
    crises.js           Crises sorteadas a cada partida
    desafio-final.js    Avaliação oficial de Nível 5
  nucleo/               Lógica pura, sem DOM (testável em Node)
    motor.js            Classe Jogo: estado e fluxo como máquina de estados
    efeitos.js          Aplicação de efeitos, moral, condições, níveis
    campanha.js         Sorteio de crises e embaralhamento
    habilidades.js      Regras de uso das habilidades
    finais.js           Finais e pontuação
    recorde.js          Recorde com armazenamento injetável
  ui/                   Componentes de interface (só desenham o estado)
    dom.js, hud.js, habilidades.js, inicio.js, capitulo.js, evento.js, resultado.js, fim.js
tests/                  Testes com node:test (+ apoio/ com simulação e fixtures)
docs/pesquisa-cmmi.md   Pesquisa de referência sobre CMMI
```

Fluxo do motor (`js/nucleo/motor.js`):

```
capitulo → decisao → resultado → decisao … → capitulo … → desafio → decisao → resultado → fim
                         └──────────── derrota ─────────────────────────────────────────┘
```

## Conteúdo obrigatório de CMMI no jogo

| Tópico | Onde aparece |
|---|---|
| Origem do CMMI | Cap. 1: "O edital exige CMMI" |
| Conceito e objetivos | Cap. 1: "A ferramenta milagrosa" e "Cada equipe do seu jeito" |
| Estrutura | Cap. 3: "Afinal, como o CMMI é organizado?" e introduções dos capítulos (níveis 1 a 5) |
| Representação contínua | Cap. 2: "Por onde começar?"; crise "Corte de 30% nos custos" |
| Representação por estágios | Cap. 2: "Por onde começar?"; estrutura de capítulos do jogo |
| Comparação entre representações | Cap. 2: "Por onde começar?" |
| Empresas avaliadas | Cap. 4: "Quem já chegou lá?" |
| Tempo e custo | Crise "A avaliação está chegando"; Cap. 4: "Quem já chegou lá?"; desafio final |
| Benefícios | Cap. 5: "Vale a pena continuar?"; bônus de fim de capítulo |

Distribuição por partida (Normal): 10 situações (≈ 56%), 5 eventos de conhecimento (≈ 28%) e 3 crises, contando o desafio final (≈ 17%).

## Adicionando eventos

Adicione um objeto ao array `eventos` de um capítulo em `js/dados/capitulos.js` (ou ao array `CRISES` em `js/dados/crises.js`), com `id`, `tipo` (`situacao`, `conhecimento` ou `crise`), `titulo`, `falante`, `descricao` e 2 ou 3 `opcoes`. Cada opção tem:

- `texto`, `resultado`, `conceito` e `explicacao`;
- `efeitos`: variação imediata (ex.: `{ maturidade: 2, prazo: -1, moral: -1 }`);
- `efeitoAtrasado` (opcional): `{ eventos: 2, efeitos: { qualidade: 1 }, texto: "..." }`, aplicado N decisões depois;
- `condicional` (opcional): `{ indicador: "moral", minimo: 6, efeitos: { maturidade: 1 }, texto: "..." }`.

Depois rode `npm test`. Os testes de conteúdo e de balanceamento apontam eventos incompletos, opções que são melhores em tudo do que outra do mesmo evento e mudanças que deixem o jogo fácil ou difícil demais.
