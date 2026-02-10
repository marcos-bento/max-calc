import React, { ChangeEvent, useState } from "react";
import "./conteudoMatematica.css";

const DIGITOS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE_MINIMA = 2;
const BASE_MAXIMA = 36;

function normalizarEntrada(valor: string) {
    return valor.toUpperCase().replace(/\s+/g, "");
}

function ehValidoNaBase(valor: string, base: number) {
    if (!valor || valor === "-") {
        return false;
    }

    const semSinal = valor.startsWith("-") ? valor.slice(1) : valor;

    for (const caractere of semSinal) {
        const indice = DIGITOS.indexOf(caractere);
        if (indice < 0 || indice >= base) {
            return false;
        }
    }

    return true;
}

function converterBases(valor: string, baseOrigem: number, baseDestino: number) {
    const valorNormalizado = normalizarEntrada(valor);

    if (!valorNormalizado || valorNormalizado === "-") {
        return { convertido: "", erro: "" };
    }

    if (!ehValidoNaBase(valorNormalizado, baseOrigem)) {
        return {
            convertido: "",
            erro: `Valor invalido para base ${baseOrigem}.`,
        };
    }

    const decimal = Number.parseInt(valorNormalizado, baseOrigem);
    const convertido = decimal.toString(baseDestino).toUpperCase();

    return { convertido, erro: "" };
}

export default function ConversaoNumeros() {
    const [baseEsquerda, setBaseEsquerda] = useState<number>(10);
    const [baseDireita, setBaseDireita] = useState<number>(16);
    const [valorEsquerda, setValorEsquerda] = useState<string>("10");
    const [valorDireita, setValorDireita] = useState<string>("A");
    const [ladoAtivo, setLadoAtivo] = useState<"esquerda" | "direita">("esquerda");
    const [erro, setErro] = useState<string>("");

    const atualizarDaEsquerda = (novoValorEsquerda: string, novaBaseEsquerda = baseEsquerda, novaBaseDireita = baseDireita) => {
        const valorNormalizado = normalizarEntrada(novoValorEsquerda);
        const resultado = converterBases(valorNormalizado, novaBaseEsquerda, novaBaseDireita);
        setValorEsquerda(valorNormalizado);
        setValorDireita(resultado.convertido);
        setErro(resultado.erro);
    };

    const atualizarDaDireita = (novoValorDireita: string, novaBaseDireita = baseDireita, novaBaseEsquerda = baseEsquerda) => {
        const valorNormalizado = normalizarEntrada(novoValorDireita);
        const resultado = converterBases(valorNormalizado, novaBaseDireita, novaBaseEsquerda);
        setValorDireita(valorNormalizado);
        setValorEsquerda(resultado.convertido);
        setErro(resultado.erro);
    };

    const onValorEsquerdaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLadoAtivo("esquerda");
        atualizarDaEsquerda(event.target.value);
    };

    const onValorDireitaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLadoAtivo("direita");
        atualizarDaDireita(event.target.value);
    };

    const onBaseEsquerdaChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const novaBase = Number(event.target.value);
        setBaseEsquerda(novaBase);

        if (ladoAtivo === "esquerda") {
            atualizarDaEsquerda(valorEsquerda, novaBase, baseDireita);
            return;
        }

        atualizarDaDireita(valorDireita, baseDireita, novaBase);
    };

    const onBaseDireitaChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const novaBase = Number(event.target.value);
        setBaseDireita(novaBase);

        if (ladoAtivo === "direita") {
            atualizarDaDireita(valorDireita, novaBase, baseEsquerda);
            return;
        }

        atualizarDaEsquerda(valorEsquerda, baseEsquerda, novaBase);
    };

    return (
        <>
            <h2 className="conteudo__titulo">Conversao de Numeros</h2>
            <h3 className="conteudo__subtitulo">Converta entre bases numericas diferentes</h3>

            <div className="conteudo__conversaoBases">
                <div className="conteudo__conversaoBases__coluna">
                    <label htmlFor="base-esquerda">Base de origem</label>
                    <select id="base-esquerda" className="conteudo__calculadora__selectInput" value={baseEsquerda} onChange={onBaseEsquerdaChange}>
                        {Array.from({ length: BASE_MAXIMA - BASE_MINIMA + 1 }, (_, i) => i + BASE_MINIMA).map((base) => (
                            <option key={`origem-${base}`} value={base}>
                                Base {base}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={valorEsquerda}
                        onChange={onValorEsquerdaChange}
                        placeholder="Digite o numero"
                    />
                </div>

                <p className="conteudo__conversaoBases__seta">=</p>

                <div className="conteudo__conversaoBases__coluna">
                    <label htmlFor="base-direita">Base de destino</label>
                    <select id="base-direita" className="conteudo__calculadora__selectInput" value={baseDireita} onChange={onBaseDireitaChange}>
                        {Array.from({ length: BASE_MAXIMA - BASE_MINIMA + 1 }, (_, i) => i + BASE_MINIMA).map((base) => (
                            <option key={`destino-${base}`} value={base}>
                                Base {base}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={valorDireita}
                        onChange={onValorDireitaChange}
                        placeholder="Resultado"
                    />
                </div>
            </div>

            {erro ? <p className="conteudo__alertaCinza">{erro}</p> : <p className="conteudo__alertaCinza">Aceita numeros inteiros com sinal (exemplo: -2A).</p>}
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Principais bases numericas</p>
                <p>
                    Sistemas de numeracao usam uma base para definir quantos simbolos existem e como cada posicao contribui para o valor total.
                    Em qualquer base, cada casa representa uma potencia dessa base.
                </p>
                <p>
                    <span style={{ fontWeight: "bold" }}>Binario (base 2):</span> usa apenas 0 e 1.
                    E a base da computacao digital, porque dispositivos eletronicos trabalham naturalmente com dois estados.
                    Exemplo: 1010 base 2 = 10 base 10.
                </p>
                <p>
                    <span style={{ fontWeight: "bold" }}>Decimal (base 10):</span> usa 10 simbolos (0 a 9) e e o sistema mais usado no dia a dia.
                    Exemplo: 247 base 10.
                </p>
                <p>
                    <span style={{ fontWeight: "bold" }}>Octal (base 8):</span> usa digitos de 0 a 7.
                    E util para representar grupos de 3 bits.
                    Exemplo: 17 base 8 = 15 base 10.
                </p>
                <p>
                    <span style={{ fontWeight: "bold" }}>Hexadecimal (base 16):</span> usa 0 a 9 e A a F.
                    E muito usado em programacao, enderecos de memoria e cores (como #FFAA00), pois compacta melhor valores binarios.
                    Exemplo: FF base 16 = 255 base 10.
                </p>
                <p>
                    <span style={{ fontWeight: "bold" }}>Outras bases interessantes:</span> tambem e comum usar base 36 (0-9 e A-Z)
                    para codigos curtos e identificadores, porque ela guarda bastante informacao em poucos caracteres.
                </p>
            </div>
        </>
    );
}
