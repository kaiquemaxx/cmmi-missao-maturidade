// Motor do jogo: guarda o estado da partida e controla o fluxo como uma máquina de estados.
// Não conhece o DOM, então pode ser testado em Node.
//
// Fases:  capitulo → decisao → resultado → (decisao …) → capitulo … → desafio → decisao → resultado → fim
//         Qualquer derrota leva direto a "fim".

import { BONUS_META, DIFICULDADES, DIFICULDADE_PADRAO, HABILIDADES, META_MATURIDADE } from "../dados/config.js";
import { aplicarEfeitos, ajustarPorMoral, condicaoAtendida, indicadorZerado, somarEfeitos } from "./efeitos.js";
import { embaralhar, montarCampanha } from "./campanha.js";
import { podeUsarHabilidade } from "./habilidades.js";
import { calcularFinal, calcularPontuacao } from "./finais.js";

export class Jogo {
    constructor({ capitulos, crises, desafioFinal, dificuldade = DIFICULDADE_PADRAO, aleatorio = Math.random }) {
        const config = DIFICULDADES[dificuldade];
        if (!config) throw new Error(`Dificuldade desconhecida: ${dificuldade}`);

        this.desafioFinal = desafioFinal;
        this.aleatorio = aleatorio;
        this.estado = {
            dificuldade,
            indicadores: { ...config.valoresIniciais },
            usos: { ...config.usos },
            campanha: montarCampanha(capitulos, crises, config.crises, aleatorio),
            fase: "capitulo",
            capituloAtual: 0,
            eventoAtual: 0,
            noDesafioFinal: false,
            opcoesVisiveis: [],
            auditoriaUsada: false,
            reservaAtiva: false,
            pendentes: [],
            conceitos: [],
            desfecho: null,
            metasAlcancadas: 0,
            resultado: null,
            resumo: null
        };
    }

    get fase() {
        return this.estado.fase;
    }

    get capitulo() {
        return this.estado.campanha[this.estado.capituloAtual] || null;
    }

    get evento() {
        if (this.estado.noDesafioFinal) return this.desafioFinal;
        return this.capitulo ? this.capitulo.eventos[this.estado.eventoAtual] : null;
    }

    // Tela de introdução (capítulo ou desafio final) → primeiro evento.
    comecarEtapa() {
        const { estado } = this;
        if (estado.fase === "capitulo") {
            estado.eventoAtual = 0;
        } else if (estado.fase === "desafio") {
            estado.noDesafioFinal = true;
        } else {
            return false;
        }
        this.#abrirEvento();
        return true;
    }

    #abrirEvento() {
        this.estado.fase = "decisao";
        this.estado.auditoriaUsada = false;
        this.estado.resultado = null;
        this.estado.opcoesVisiveis = embaralhar(this.evento.opcoes, this.aleatorio);
    }

    podeUsarHabilidade(chave) {
        return podeUsarHabilidade(this.estado, chave);
    }

    // Devolve a mensagem para o jogador, ou null se a habilidade não pôde ser usada.
    usarHabilidade(chave) {
        const { estado } = this;
        if (!this.podeUsarHabilidade(chave)) return null;
        estado.usos[chave]--;

        if (chave === "auditoria") {
            estado.auditoriaUsada = true;
            return "Auditoria Interna: as consequências imediatas de cada opção estão visíveis.";
        }
        if (chave === "reserva") {
            estado.reservaAtiva = true;
            return "Reserva de Orçamento ativada: a próxima perda de orçamento será evitada.";
        }

        const { indicadores, aplicados } = aplicarEfeitos(estado.indicadores, HABILIDADES.replanejamento.ganho);
        estado.indicadores = indicadores;
        const pontos = aplicados.prazo || 0;
        return `Replanejamento: o cronograma foi renegociado e você recuperou ${pontos} ${pontos === 1 ? "ponto" : "pontos"} de prazo.`;
    }

    // Efeitos imediatos que a opção teria agora: base + condição + moral + reserva.
    // É o que a Auditoria mostra e o que decidir() aplica.
    calcularEfeitos(opcao) {
        const { estado } = this;
        const condicionalAtendido = condicaoAtendida(opcao.condicional, estado.indicadores);
        const somados = somarEfeitos(opcao.efeitos, condicionalAtendido ? opcao.condicional.efeitos : null);
        const { efeitos, penalizado } = ajustarPorMoral(somados, estado.indicadores.moral);

        let reservaUsada = false;
        if (estado.reservaAtiva && efeitos.orcamento < 0) {
            delete efeitos.orcamento;
            reservaUsada = true;
        }
        return { efeitos, condicionalAtendido, moralPenalizou: penalizado, reservaUsada };
    }

    decidir(indice) {
        const { estado } = this;
        if (estado.fase !== "decisao") return null;
        const opcao = estado.opcoesVisiveis[indice];
        if (!opcao) return null;

        const calculo = this.calcularEfeitos(opcao);
        if (calculo.reservaUsada) estado.reservaAtiva = false;

        const imediato = aplicarEfeitos(estado.indicadores, calculo.efeitos);
        estado.indicadores = imediato.indicadores;

        // Consequências de decisões anteriores que chegam agora.
        const tardios = [];
        estado.pendentes = estado.pendentes.filter((pendente) => {
            pendente.restantes--;
            if (pendente.restantes > 0) return true;
            const tardio = aplicarEfeitos(estado.indicadores, pendente.efeitos);
            estado.indicadores = tardio.indicadores;
            tardios.push({ texto: pendente.texto, origem: pendente.origem, efeitos: tardio.aplicados });
            return false;
        });

        if (opcao.efeitoAtrasado) {
            estado.pendentes.push({
                restantes: opcao.efeitoAtrasado.eventos,
                efeitos: opcao.efeitoAtrasado.efeitos,
                texto: opcao.efeitoAtrasado.texto,
                origem: this.evento.titulo
            });
        }

        if (opcao.desfecho) estado.desfecho = opcao.desfecho;
        if (!estado.conceitos.includes(opcao.conceito)) estado.conceitos.push(opcao.conceito);

        estado.resultado = {
            opcao,
            efeitos: imediato.aplicados,
            reservaUsada: calculo.reservaUsada,
            moralPenalizou: calculo.moralPenalizou,
            condicional: calculo.condicionalAtendido ? opcao.condicional.texto : null,
            tardios,
            proximo: this.#rotuloProximo()
        };
        estado.fase = "resultado";
        return estado.resultado;
    }

    #rotuloProximo() {
        const { estado } = this;
        if (indicadorZerado(estado.indicadores) || estado.noDesafioFinal) return "Ver resultado";
        if (estado.eventoAtual === this.capitulo.eventos.length - 1) return "Concluir capítulo";
        return "Próximo evento";
    }

    // Resultado → próximo evento, fim de capítulo, desafio final ou fim de jogo.
    avancar() {
        const { estado } = this;
        if (estado.fase !== "resultado") return false;

        if (indicadorZerado(estado.indicadores) || estado.noDesafioFinal) {
            this.#finalizar();
            return true;
        }

        estado.eventoAtual++;
        if (estado.eventoAtual < this.capitulo.eventos.length) {
            this.#abrirEvento();
            return true;
        }

        this.#concluirCapitulo();
        return true;
    }

    #concluirCapitulo() {
        const { estado } = this;
        const capitulo = this.capitulo;
        const metaAlcancada = estado.indicadores.maturidade >= capitulo.meta;
        let efeitos = {};

        if (metaAlcancada) {
            estado.metasAlcancadas++;
            const bonus = aplicarEfeitos(estado.indicadores, BONUS_META);
            estado.indicadores = bonus.indicadores;
            efeitos = bonus.aplicados;
        }

        estado.resumo = {
            titulo: `Capítulo ${capitulo.numero} concluído: ${metaAlcancada ? "meta alcançada!" : "meta não alcançada"}`,
            texto: metaAlcancada
                ? "Processos mais maduros trazem resultados: menos retrabalho, prazos mais previsíveis, custos menores e uma equipe mais confiante."
                : `A empresa terminou o capítulo com ${estado.indicadores.maturidade} de Maturidade, abaixo da meta de ${capitulo.meta}. ` +
                  "Sem processos consolidados, os benefícios da maturidade não aparecem.",
            efeitos,
            metaAlcancada
        };

        estado.capituloAtual++;
        if (estado.capituloAtual < estado.campanha.length) {
            estado.fase = "capitulo";
        } else if (estado.indicadores.maturidade >= META_MATURIDADE) {
            estado.fase = "desafio";
        } else {
            this.#finalizar();
        }
    }

    #finalizar() {
        const final = calcularFinal(this.estado);
        this.estado.final = { ...final, pontos: calcularPontuacao(this.estado, final) };
        this.estado.fase = "fim";
    }

    get final() {
        return this.estado.final || null;
    }
}
