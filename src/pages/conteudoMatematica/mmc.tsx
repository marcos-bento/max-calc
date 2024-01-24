import React, { ChangeEvent, useState } from "react";
import "./conteudoMatematica.css"
import Botao from "../../components/botao/botao";
import Accordion from "../../components/accordion/accordion";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function MMC() {
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [valorC, setValorC] = useState<number>();
    const [valorD, setValorD] = useState<number>();
    const [valorE, setValorE] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);

    function proximoNumeroPrimo(depoisDe: number) {
        let candidato = depoisDe + 1;
        while (!ehPrimo(candidato)) {
            candidato++;
        };
        return candidato;
    };

    function ehPrimo(num: number) {
        for (let i = 2, raiz = Math.sqrt(num); i <= raiz; i++) {
            if (num % i === 0) {
                return false;
            };
        };
        return num > 1;
    };

    const calculaResposta = () => {
        if (!valorA || !valorB) {
            alert("Insira os valores de A e B");
        } else {
            let numPrimos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173]
            let a = valorA;
            let b = valorB;
            let c: number|undefined = valorC || 0;
            let d: number|undefined = valorD || 0;
            let e: number|undefined = valorE || 0;
            if (c < 1){c = undefined}
            if (d < 1){d = undefined}
            if (e < 1){e = undefined}

            const ehDivisivel = (valor: number, dividendo: number) => valor % dividendo === 0;

            let calculo: React.ReactNode = (
                <>
                    <table className="conteudo__tabela">
                        <tr>
                            <th className="conteudo__tabela_celula">{valorA},</th>
                            <th className="conteudo__tabela_celula">{valorB}{valorC !== undefined && ","}</th>
                            {valorC !== undefined && <th className="conteudo__tabela_celula">{valorC}{valorD !== undefined && ","}</th>}
                            {valorD !== undefined && <th className="conteudo__tabela_celula">{valorD}{valorE !== undefined && ","}</th>}
                            {valorE !== undefined && <th className="conteudo__tabela_celula">{valorE}</th>}
                            <th className="conteudo__tabela_celula">|</th>
                        </tr>
                    </table>
                </>
            );
            let iterator = 0;
            let resposta = 1;
            let tabelaFatoracao: React.ReactNode;
            while (a > 1 || b > 1 || (c && c > 1) || (d && d > 1) || (e && e > 1)) {
                let validaA = ehDivisivel(a, numPrimos[iterator]);
                let validaB = ehDivisivel(b, numPrimos[iterator]);
                let validaC, validaD, validaE = false;
                if (c) { validaC = ehDivisivel(c, numPrimos[iterator]) };
                if (d) { validaD = ehDivisivel(d, numPrimos[iterator]) };
                if (e) { validaE = ehDivisivel(e, numPrimos[iterator]) };
                if (validaA || validaB || validaC || validaD || validaE) {
                    if (validaA) { a = a / numPrimos[iterator] };
                    if (validaB) { b = b / numPrimos[iterator] };
                    if (validaC && c!== undefined) { c = c / numPrimos[iterator] };
                    if (validaD && d!== undefined) { d = d / numPrimos[iterator] };
                    if (validaE && e!== undefined) { e = e / numPrimos[iterator] };
                    calculo = <>
                        {calculo}
                        <table className="conteudo__tabela">
                            <tr>
                                <th className="conteudo__tabela_celula">{a},</th>
                                <th className="conteudo__tabela_celula">{b} {c ? "," : ""}</th>
                                {c ? <th className="conteudo__tabela_celula">{c}{d ? "," : ""}</th> : ""}
                                {d ? <th className="conteudo__tabela_celula">{d}{e ? "," : ""}</th> : ""}
                                {e ? <th className="conteudo__tabela_celula">{e}</th> : ""}
                                <th className="conteudo__tabela_celula">|</th>
                            </tr>
                        </table>
                    </>
                    tabelaFatoracao =
                        <>
                            {tabelaFatoracao}
                            <table className="conteudo__tabela">
                                <tr>
                                    <th className="conteudo__tabela_celula">{numPrimos[iterator]}</th>
                                </tr>
                            </table>
                        </>
                    resposta = resposta * numPrimos[iterator];
                    iterator = 0;
                } else {
                    if (iterator !== numPrimos.length) {
                        iterator++;
                    } else {
                        numPrimos.push(proximoNumeroPrimo(numPrimos[numPrimos.length - 1]));
                    };
                };
            };
            tabelaFatoracao = <>
                {tabelaFatoracao}
                <table className="conteudo__tabela">
                    <tr>
                        <th className="conteudo__tabela_celula">----</th>
                    </tr>
                </table>
            </>
            calculo = <>
                <p>Fatorando os números:</p>
                <div className="conteudo__container__tabela">
                    <div>{calculo}</div>
                    <div>{tabelaFatoracao}</div>
                </div>
                <br></br><br></br>
                <p>O MMC entre {valorA} e {valorB} {valorC ? `e ${valorC}` : ""} {valorD ? `e ${valorD}` : ""} {valorE ? `e ${valorE}` : ""} é: {resposta}</p>
            </>
            setResolucao(calculo);
        };
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, { setValue }: InputProps) => {
        let inputValue: number | undefined;
        if (Number(event.target.value) < 0) {
            inputValue = Number(event.target.value) * -1;
        } else if (Number(event.target.value) === 0){
            inputValue = undefined;
        } else {
            inputValue = Number(event.target.value);
        }
        setValue(inputValue);
    }

    return (
        <>
            <h2 className="conteudo__titulo">Mínimo Múltiplo Comum (MMC)!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de MMC:</h3>
            <p className="conteudo__alertaCinza">Os valores C, D e E são opcionais.</p>
            <div className="conteudo__calculadora">
                <input type="number" min={1} value={valorA} onChange={(event) => handleValueChange(event, { setValue: setValorA })} placeholder="valor A" required />
                <input type="number" min={1} value={valorB} onChange={(event) => handleValueChange(event, { setValue: setValorB })} placeholder="valor B" required />
                <input type="number" min={1} value={valorC} onChange={(event) => handleValueChange(event, { setValue: setValorC })} placeholder="valor C" required />
                <input type="number" min={1} value={valorD} onChange={(event) => handleValueChange(event, { setValue: setValorD })} placeholder="valor D" required />
                <input type="number" min={1} value={valorE} onChange={(event) => handleValueChange(event, { setValue: setValorE })} placeholder="valor E" required />
            </div>
            <Botao texto={"Calcular"} onClick={calculaResposta} />
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>O mínimo múltiplo comum (MMC) entre números inteiros é o menor número, também inteiro, que é múltiplo de todos esses números ao mesmo tempo. Por exemplo, o MMC entre 2 e 12 é 12, pois os múltiplos de 2 são 2, 4, 6, 8, 10, 12… e os de 12 são: 12, 24, …</p>
                <p>Em outras palavras, considere um conjunto A de números naturais não negativos e os conjuntos A1, A2, … formados pelos múltiplos de cada um dos elementos do conjunto A. O menor elemento comum dentro dos conjuntos A1, A2, … é o mínimo múltiplo comum dos elementos do conjunto A. Em outras palavras, o menor elemento da intersecção A1 ∩ A2 ∩ A2 ∩… é o MMC de A.</p>
                <p className="conteudo__material__titulo">Como encontrar o mínimo múltiplo comum</p>
                <p>O método mais básico que pode ser usado para encontrar o mínimo múltiplo comum entre dois ou mais números é escrever os seus múltiplos até encontrar o primeiro que é comum a todos os números observados.</p>
                <p>O método prático para calcular o mínimo múltiplo comum baseia-se na decomposição em fatores primos desses números, mas existe um algoritmo que pode facilitar o processo de encontrá-lo.</p>
                <p>Esse algoritmo consiste em colocar os números cujo MMC será calculado lado a lado e separados por vírgula. Depois, encontramos o menor número primo que divide pelo menos um deles e realizamos a divisão, colocando o resultado logo abaixo dele. Se algum dos elementos não for divisível por esse número, basta repeti-lo no lugar do resultado. Repete-se esse processo até que o resultado de todas as divisões seja 1. O MMC será o produto de todos os números primos usados nas divisões.</p>
                <p>Para encontrar o mínimo múltiplo comum entre 2 e 4, faremos:</p>
                <p>2, 4 | 2<br></br>1, 2 | 2<br></br>1, 1 | --</p>

                <p className="conteudo__material__titulo">Exemplos / Exercícios</p>
                {/* Exercício 1 */}
                <p><span style={{ fontWeight: "bold" }}>1)</span>Determine o MMC entre 36 e 44</p><ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 12</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 44</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 128</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 296</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 396</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 1"
                    content1="Alternativa E!"
                />

                {/* Exercício 2 */}
                <p><span style={{ fontWeight: "bold" }}>2)</span>Em uma apresentação para o lançamento do novo carro de corrida, foi realiza uma corrida inusitada. Três veículos participaram: o carro lançamento, o carro da temporada passada e um carro de passeio, comum.</p>
                <p>O circuito é oval, os três largaram juntos e mantiveram velocidades constantes. O carro lançamento leva 6 minutos para completar uma volta. O carro da temporada passada leva 9 minutos para completar uma volta e o carro de passeio leva 18 minutos para completar uma volta.</p>
                <p>Depois que a corrida começa, em quanto tempo eles passarão juntos novamente pelo mesmo local da largada? Para determinar é preciso calcular o mmc (6, 9, 18).</p>
                <Accordion
                    title="Ver resposta da pergunta 2"
                    content1="eles passaram novamente pelo mesmo local da largada, 18 minutos depois!"
                />
            </div>
        </>
    )
}