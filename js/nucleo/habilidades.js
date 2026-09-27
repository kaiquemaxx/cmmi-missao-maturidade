// Regras das habilidades do consultor. Funções puras sobre o estado da partida.

import { HABILIDADES, MAXIMOS } from "../dados/config.js";

export function podeUsarHabilidade(estado, chave) {
    if (!HABILIDADES[chave]) return false;
    if (estado.fase !== "decisao" || estado.usos[chave] <= 0) return false;
    if (chave === "auditoria") return !estado.auditoriaUsada;
    if (chave === "reserva") return !estado.reservaAtiva;
    if (chave === "replanejamento") return estado.indicadores.prazo < MAXIMOS.prazo;
    return true;
}
