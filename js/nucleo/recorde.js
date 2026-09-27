// Recorde por dificuldade. O armazenamento é injetado (localStorage no navegador)
// e pode falhar em janela anônima, então toda leitura e escrita é protegida.

const PREFIXO = "cmmi-missao-maturidade:recorde:";

export function lerRecorde(armazenamento, dificuldade) {
    try {
        const valor = Number(armazenamento?.getItem(PREFIXO + dificuldade));
        return Number.isFinite(valor) && valor > 0 ? valor : 0;
    } catch {
        return 0;
    }
}

export function registrarPontuacao(armazenamento, dificuldade, pontos) {
    const anterior = lerRecorde(armazenamento, dificuldade);
    const novoRecorde = pontos > anterior;
    if (novoRecorde) {
        try {
            armazenamento?.setItem(PREFIXO + dificuldade, String(pontos));
        } catch {
            // Sem armazenamento disponível: o recorde vale só para esta partida.
        }
    }
    return { recorde: Math.max(anterior, pontos), anterior, novoRecorde };
}
