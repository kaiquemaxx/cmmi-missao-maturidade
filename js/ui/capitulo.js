// Tela entre capítulos: resumo do capítulo anterior e introdução do próximo (ou do desafio final).

import { BONUS_META, NOMES_INDICADORES } from "../dados/config.js";
import { $, alternar, criarChips, mostrarTela } from "./dom.js";

const bonusTexto = Object.keys(BONUS_META).map((k) => NOMES_INDICADORES[k]).join(", ").replace(/, ([^,]*)$/, " e $1");

export function renderizarCapitulo(jogo) {
    const { resumo, fase } = jogo.estado;

    alternar($("capitulo-resumo"), Boolean(resumo));
    if (resumo) {
        $("resumo-titulo").textContent = resumo.titulo;
        $("resumo-texto").textContent = resumo.texto;
        criarChips($("resumo-efeitos"), resumo.efeitos, true);
    }

    if (fase === "desafio") {
        $("capitulo-numero").textContent = "Desafio final";
        $("capitulo-nome").textContent = "A avaliação oficial";
        $("capitulo-nivel").textContent = "Rumo ao Nível 5";
        $("capitulo-introducao").textContent =
            "A TechNova atingiu a maturidade necessária para buscar o Nível 5, o mais alto do CMMI. " +
            "Agora, uma avaliação oficial vai confirmar se isso é realidade.";
        $("capitulo-meta").textContent = "Uma última decisão. Os indicadores atuais também contam para o seu resultado final.";
    } else {
        const capitulo = jogo.capitulo;
        $("capitulo-numero").textContent = `Capítulo ${capitulo.numero}`;
        $("capitulo-nome").textContent = capitulo.nome;
        $("capitulo-nivel").textContent = capitulo.nivel;
        $("capitulo-introducao").textContent = capitulo.introducao;
        $("capitulo-meta").textContent =
            `Meta do capítulo: chegar a ${capitulo.meta} de Maturidade. ` +
            `Se alcançar, a empresa colhe os benefícios da maturidade: +1 em ${bonusTexto}.`;
    }

    mostrarTela("tela-capitulo");
}
