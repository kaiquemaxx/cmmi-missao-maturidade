// Configuração do jogo
const VALORES_INICIAIS = { maturidade: 0, qualidade: 5, prazo: 5, orcamento: 5 };
const MAXIMOS = { maturidade: 15, qualidade: 10, prazo: 10, orcamento: 10 };
const INDICADORES_CRITICOS = ["qualidade", "prazo", "orcamento"];
const META_MATURIDADE = 15;
const CRISES_POR_PARTIDA = 2;

const NOMES_INDICADORES = {
    maturidade: "Maturidade",
    qualidade: "Qualidade",
    prazo: "Prazo",
    orcamento: "Orçamento"
};

const NOMES_TIPOS = {
    situacao: "Situação",
    conhecimento: "Conhecimento CMMI",
    crise: "Crise",
    final: "Desafio final"
};

const HABILIDADES = {
    auditoria: {
        nome: "Auditoria Interna",
        usos: 2,
        descricao: "Revela as consequências de cada opção do evento atual."
    },
    reserva: {
        nome: "Reserva de Orçamento",
        usos: 1,
        descricao: "Evita a próxima perda de orçamento."
    },
    replanejamento: {
        nome: "Replanejamento",
        usos: 1,
        descricao: "Recupera 2 pontos de prazo."
    }
};

// Estado
let estado = null;

function novoEstado() {
    const usos = {};
    Object.keys(HABILIDADES).forEach((chave) => (usos[chave] = HABILIDADES[chave].usos));

    return {
        indicadores: { ...VALORES_INICIAIS },
        campanha: montarCampanha(),
        capituloAtual: 0,
        eventoAtual: 0,
        eventoEmAndamento: null,
        usos,
        auditoriaUsada: false,
        reservaAtiva: false,
        conceitos: []
    };
}

// Cada partida sorteia quais crises aparecem e em quais capítulos (2 a 5).
function montarCampanha() {
    const crises = embaralhar(CRISES).slice(0, CRISES_POR_PARTIDA);
    const capitulosComCrise = embaralhar([2, 3, 4, 5]).slice(0, CRISES_POR_PARTIDA);

    return CAPITULOS.map((capitulo) => {
        const eventos = [...capitulo.eventos];
        const indice = capitulosComCrise.indexOf(capitulo.numero);
        if (indice >= 0) {
            const posicao = 1 + Math.floor(Math.random() * (eventos.length - 1));
            eventos.splice(posicao, 0, crises[indice]);
        }
        return { ...capitulo, eventos };
    });
}

// Utilitários
const $ = (id) => document.getElementById(id);

function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach((tela) => tela.classList.remove("ativa"));
    $(id).classList.add("ativa");
    window.scrollTo(0, 0);
}

function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function limitar(valor, maximo) {
    return Math.max(0, Math.min(maximo, valor));
}

function formatarEfeito(valor) {
    return valor > 0 ? `+${valor}` : `${valor}`;
}

function criarChips(container, valores, comSinal) {
    container.innerHTML = "";
    Object.keys(NOMES_INDICADORES).forEach((chave) => {
        const valor = valores[chave];
        if (valor === undefined || (comSinal && valor === 0)) return;

        const chip = document.createElement("span");
        chip.className = "chip";
        if (comSinal) chip.classList.add(valor > 0 ? "positivo" : "negativo");
        chip.textContent = `${NOMES_INDICADORES[chave]} ${comSinal ? formatarEfeito(valor) : valor}`;
        container.appendChild(chip);
    });
}

function nivelDeMaturidade(maturidade) {
    if (maturidade >= 15) return 5;
    if (maturidade >= 12) return 4;
    if (maturidade >= 9) return 3;
    if (maturidade >= 6) return 2;
    return 1;
}

function aplicarEfeitos(efeitos) {
    Object.entries(efeitos).forEach(([chave, delta]) => {
        estado.indicadores[chave] = limitar(estado.indicadores[chave] + delta, MAXIMOS[chave]);
    });
    atualizarHud();
}

// HUD
function atualizarHud() {
    document.querySelectorAll(".indicador").forEach((elemento) => {
        const chave = elemento.dataset.indicador;
        const valor = estado.indicadores[chave];
        const maximo = MAXIMOS[chave];

        elemento.querySelector(".indicador-valor").textContent = `${valor}/${maximo}`;
        elemento.querySelector(".barra-preenchimento").style.width = `${(valor / maximo) * 100}%`;
        elemento.classList.toggle("perigo", INDICADORES_CRITICOS.includes(chave) && valor <= 2);
    });

    const capitulo = estado.campanha[estado.capituloAtual];
    $("capitulo").textContent = capitulo
        ? `Capítulo ${capitulo.numero} – ${capitulo.nome} · Meta: ${capitulo.meta} de Maturidade`
        : "Avaliação final";

    atualizarHabilidades();
}

// Habilidades
function atualizarHabilidades() {
    const decidindo = !$("cartao-evento").classList.contains("oculto");

    document.querySelectorAll(".habilidade").forEach((botao) => {
        const chave = botao.dataset.habilidade;
        const usos = estado.usos[chave];
        botao.querySelector(".habilidade-usos").textContent = `${usos}x`;

        let bloqueada = !decidindo || usos <= 0;
        if (chave === "auditoria" && estado.auditoriaUsada) bloqueada = true;
        if (chave === "reserva" && estado.reservaAtiva) bloqueada = true;
        if (chave === "replanejamento" && estado.indicadores.prazo >= MAXIMOS.prazo) bloqueada = true;
        botao.disabled = bloqueada;
        botao.classList.toggle("ativa", chave === "reserva" && estado.reservaAtiva);
    });
}

function mensagemHabilidade(texto) {
    const mensagem = $("habilidade-mensagem");
    mensagem.textContent = texto;
    mensagem.classList.toggle("oculto", !texto);
}

function usarHabilidade(chave) {
    if (estado.usos[chave] <= 0) return;
    estado.usos[chave]--;

    if (chave === "auditoria") {
        estado.auditoriaUsada = true;
        document.querySelectorAll(".opcao-previa").forEach((previa) => previa.classList.remove("oculto"));
        mensagemHabilidade("Auditoria Interna: as consequências de cada opção estão visíveis.");
    }

    if (chave === "reserva") {
        estado.reservaAtiva = true;
        mensagemHabilidade("Reserva de Orçamento ativada: a próxima perda de orçamento será evitada.");
    }

    if (chave === "replanejamento") {
        aplicarEfeitos({ prazo: 2 });
        mensagemHabilidade("Replanejamento: o cronograma foi renegociado e você recuperou 2 pontos de prazo.");
    }

    atualizarHabilidades();
}

// Fluxo: Capítulo → (Evento → Decisão → Consequência → Explicação) × N → Fim do capítulo
function iniciarJogo() {
    estado = novoEstado();
    mostrarIntroducaoCapitulo();
}

function mostrarIntroducaoCapitulo(resumoAnterior) {
    const capitulo = estado.campanha[estado.capituloAtual];

    $("capitulo-resumo").classList.toggle("oculto", !resumoAnterior);
    if (resumoAnterior) {
        $("resumo-titulo").textContent = resumoAnterior.titulo;
        $("resumo-texto").textContent = resumoAnterior.texto;
        criarChips($("resumo-efeitos"), resumoAnterior.efeitos || {}, true);
    }

    $("capitulo-numero").textContent = `Capítulo ${capitulo.numero}`;
    $("capitulo-nome").textContent = capitulo.nome;
    $("capitulo-nivel").textContent = capitulo.nivel;
    $("capitulo-introducao").textContent = capitulo.introducao;
    $("capitulo-meta").textContent =
        `Meta do capítulo: chegar a ${capitulo.meta} de Maturidade. ` +
        "Se alcançar, a empresa colhe os benefícios da maturidade: +1 em Qualidade, Prazo e Orçamento.";

    mostrarTela("tela-capitulo");
}

function comecarCapitulo() {
    estado.eventoAtual = 0;
    mostrarTela("tela-jogo");
    mostrarEvento(estado.campanha[estado.capituloAtual].eventos[0]);
}

function mostrarEvento(evento) {
    estado.eventoEmAndamento = evento;
    estado.auditoriaUsada = false;
    mensagemHabilidade(estado.reservaAtiva ? "Reserva de Orçamento ativa: a próxima perda de orçamento será evitada." : "");

    const capitulo = estado.campanha[estado.capituloAtual];
    $("evento-tipo").textContent = NOMES_TIPOS[evento.tipo];
    $("evento-tipo").className = `etiqueta etiqueta-${evento.tipo}`;
    $("evento-progresso").textContent = capitulo
        ? `Evento ${estado.eventoAtual + 1} de ${capitulo.eventos.length}`
        : "";
    $("evento-titulo").textContent = evento.titulo;
    $("evento-falante").textContent = evento.falante;
    $("evento-descricao").textContent = evento.descricao;

    const opcoes = $("opcoes");
    opcoes.innerHTML = "";
    embaralhar(evento.opcoes).forEach((opcao) => {
        const botao = document.createElement("button");
        botao.className = "opcao";

        const texto = document.createElement("span");
        texto.textContent = opcao.texto;
        botao.appendChild(texto);

        const previa = document.createElement("span");
        previa.className = "opcao-previa efeitos oculto";
        criarChips(previa, opcao.efeitos, true);
        botao.appendChild(previa);

        botao.addEventListener("click", () => decidir(opcao));
        opcoes.appendChild(botao);
    });

    $("cartao-resultado").classList.add("oculto");
    $("cartao-evento").classList.remove("oculto");
    atualizarHud();
}

function decidir(opcao) {
    const efeitos = { ...opcao.efeitos };
    let reservaUsada = false;

    if (estado.reservaAtiva && efeitos.orcamento < 0) {
        delete efeitos.orcamento;
        estado.reservaAtiva = false;
        reservaUsada = true;
    }

    aplicarEfeitos(efeitos);
    estado.desfecho = opcao.desfecho;
    if (!estado.conceitos.includes(opcao.conceito)) estado.conceitos.push(opcao.conceito);

    $("resultado-titulo").textContent = opcao.texto;
    $("resultado-texto").textContent = opcao.resultado;
    criarChips($("resultado-efeitos"), efeitos, true);
    $("resultado-reserva").classList.toggle("oculto", !reservaUsada);
    $("explicacao-conceito").textContent = opcao.conceito;
    $("explicacao-texto").textContent = opcao.explicacao;

    const capitulo = estado.campanha[estado.capituloAtual];
    const ultimoDoCapitulo = !capitulo || estado.eventoAtual === capitulo.eventos.length - 1;
    let textoBotao = "Próximo evento";
    if (derrota() || !capitulo) textoBotao = "Ver resultado";
    else if (ultimoDoCapitulo) textoBotao = "Concluir capítulo";
    $("botao-proximo").textContent = textoBotao;

    $("cartao-evento").classList.add("oculto");
    $("cartao-resultado").classList.remove("oculto");
    mensagemHabilidade("");
    atualizarHabilidades();
    window.scrollTo(0, 0);
}

function derrota() {
    return INDICADORES_CRITICOS.find((chave) => estado.indicadores[chave] <= 0);
}

function proximoEvento() {
    const capitulo = estado.campanha[estado.capituloAtual];

    // Desafio final já respondido, ou derrota
    if (!capitulo || derrota()) {
        finalizar();
        return;
    }

    estado.eventoAtual++;
    if (estado.eventoAtual < capitulo.eventos.length) {
        mostrarEvento(capitulo.eventos[estado.eventoAtual]);
        return;
    }

    concluirCapitulo(capitulo);
}

function concluirCapitulo(capitulo) {
    const metaAlcancada = estado.indicadores.maturidade >= capitulo.meta;
    const bonus = { qualidade: 1, prazo: 1, orcamento: 1 };
    if (metaAlcancada) aplicarEfeitos(bonus);

    const resumo = {
        titulo: `Capítulo ${capitulo.numero} concluído: ${metaAlcancada ? "meta alcançada!" : "meta não alcançada"}`,
        texto: metaAlcancada
            ? "Processos mais maduros trazem resultados: menos retrabalho, prazos mais previsíveis e custos menores."
            : `A empresa terminou o capítulo com ${estado.indicadores.maturidade} de Maturidade, abaixo da meta de ${capitulo.meta}. ` +
              "Sem processos consolidados, os benefícios da maturidade não aparecem.",
        efeitos: metaAlcancada ? bonus : {}
    };

    estado.capituloAtual++;

    if (estado.capituloAtual < estado.campanha.length) {
        mostrarIntroducaoCapitulo(resumo);
        return;
    }

    if (estado.indicadores.maturidade >= META_MATURIDADE) {
        mostrarDesafioFinal(resumo);
    } else {
        finalizar();
    }
}

function mostrarDesafioFinal(resumo) {
    $("capitulo-resumo").classList.remove("oculto");
    $("resumo-titulo").textContent = resumo.titulo;
    $("resumo-texto").textContent = resumo.texto;
    criarChips($("resumo-efeitos"), resumo.efeitos, true);

    $("capitulo-numero").textContent = "Desafio final";
    $("capitulo-nome").textContent = "A avaliação oficial";
    $("capitulo-nivel").textContent = "Rumo ao Nível 5";
    $("capitulo-introducao").textContent =
        "A TechNova atingiu a maturidade necessária para buscar o Nível 5, o mais alto do CMMI. " +
        "Agora, uma avaliação oficial vai confirmar se isso é realidade.";
    $("capitulo-meta").textContent = "Uma última decisão. Os indicadores atuais também contam para o seu resultado final.";

    mostrarTela("tela-capitulo");
}

function comecarProximaEtapa() {
    if (estado.capituloAtual < estado.campanha.length) {
        comecarCapitulo();
        return;
    }
    mostrarTela("tela-jogo");
    mostrarEvento(DESAFIO_FINAL);
}

// Finais
function calcularFinal() {
    const { maturidade, qualidade, prazo, orcamento } = estado.indicadores;
    const indicadorZerado = derrota();

    if (indicadorZerado === "qualidade") {
        return {
            titulo: "Fim de jogo: os clientes foram embora",
            texto: "A qualidade chegou a 0. Defeitos e retrabalho afastaram os clientes, e a diretoria encerrou o seu contrato."
        };
    }
    if (indicadorZerado === "prazo") {
        return {
            titulo: "Fim de jogo: atrasos sem fim",
            texto: "O prazo chegou a 0. Os atrasos se acumularam, contratos foram cancelados e a diretoria encerrou o seu contrato."
        };
    }
    if (indicadorZerado === "orcamento") {
        return {
            titulo: "Fim de jogo: sem dinheiro",
            texto: "O orçamento chegou a 0. A empresa não conseguiu pagar o programa de melhoria, e a diretoria encerrou o seu contrato."
        };
    }

    if (estado.desfecho === "reprovado") {
        return {
            titulo: "Avaliação reprovada",
            texto:
                "Os avaliadores encontraram inconsistências entre o discurso e a prática. A TechNova não recebeu o Nível 5, " +
                "e a confiança dos clientes foi abalada. No CMMI, maturidade se prova com evidências, não com ensaio."
        };
    }

    if (maturidade >= META_MATURIDADE) {
        const menor = Math.min(qualidade, prazo, orcamento);
        if (menor >= 6) {
            return {
                titulo: "Vitória: excelência em processos",
                texto:
                    "A TechNova foi avaliada no Nível 5 com indicadores saudáveis em todas as áreas. Você provou que maturidade e " +
                    "resultados andam juntos. A empresa entra para o grupo de cerca de 5% das organizações que chegam ao nível mais alto do CMMI."
            };
        }
        if (menor <= 3) {
            return {
                titulo: "Vitória apertada: Nível 5 a duras penas",
                texto:
                    "A TechNova foi avaliada no Nível 5, mas chegou esgotada: um dos indicadores está perigosamente baixo. " +
                    "A maturidade foi alcançada, mas o equilíbrio ficou para trás."
            };
        }
        return {
            titulo: "Vitória: Nível 5 alcançado",
            texto:
                "A TechNova foi avaliada no Nível 5 do CMMI. Os processos são estáveis, medidos e em melhoria contínua, " +
                "uma conquista que poucas organizações no mundo alcançam."
        };
    }

    const nivel = nivelDeMaturidade(maturidade);
    const textosPorNivel = {
        1: "A empresa continua no Nível 1: as decisões resolveram problemas imediatos, mas os processos quase não evoluíram.",
        2: "A empresa chegou ao Nível 2 (Gerenciado): os projetos são planejados e controlados, mas cada um ainda trabalha à sua maneira.",
        3: "A empresa chegou ao Nível 3 (Definido): há processos padronizados na organização, mas as decisões ainda não usam dados.",
        4: "A empresa chegou ao Nível 4 (Gerenciado Quantitativamente): decisões baseadas em dados, mas faltou consolidar a melhoria contínua."
    };
    return {
        titulo: `Fim da consultoria: Nível ${nivel}`,
        texto:
            `${textosPorNivel[nivel]} Com ${maturidade} de Maturidade, a TechNova não chegou à meta de ${META_MATURIDADE} ` +
            "necessária para a avaliação de Nível 5."
    };
}

function finalizar() {
    const final = calcularFinal();

    $("fim-titulo").textContent = final.titulo;
    $("fim-texto").textContent = final.texto;
    criarChips($("fim-indicadores"), estado.indicadores, false);

    const lista = $("fim-conceitos");
    lista.innerHTML = "";
    estado.conceitos.forEach((conceito) => {
        const item = document.createElement("li");
        item.textContent = conceito;
        lista.appendChild(item);
    });

    mostrarTela("tela-fim");
}

// Botões
$("botao-iniciar").addEventListener("click", iniciarJogo);
$("botao-reiniciar").addEventListener("click", iniciarJogo);
$("botao-comecar-capitulo").addEventListener("click", comecarProximaEtapa);
$("botao-proximo").addEventListener("click", proximoEvento);
$("botao-como-jogar").addEventListener("click", () => mostrarTela("tela-como-jogar"));
document.querySelectorAll(".botao-voltar").forEach((botao) => {
    botao.addEventListener("click", () => mostrarTela("tela-inicial"));
});
document.querySelectorAll(".habilidade").forEach((botao) => {
    botao.addEventListener("click", () => usarHabilidade(botao.dataset.habilidade));
});
