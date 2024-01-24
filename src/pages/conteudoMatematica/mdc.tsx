import React, { ChangeEvent, useState } from "react";
import "./conteudoMatematica.css"
import Botao from "../../components/botao/botao";
import Accordion from "../../components/accordion/accordion";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function MDC() {
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
            let c: number | undefined = valorC || 0;
            let d: number | undefined = valorD || 0;
            let e: number | undefined = valorE || 0;
            if (c < 1) { c = undefined };
            if (d < 1) { d = undefined };
            if (e < 1) { e = undefined };

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
            let ehMdc = false;
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
                    if (validaC && c !== undefined) { c = c / numPrimos[iterator] };
                    if (validaD && d !== undefined) { d = d / numPrimos[iterator] };
                    if (validaE && e !== undefined) { e = e / numPrimos[iterator] };
                    if ((validaA && validaB) && ((!c) || (c && validaC)) && ((!d) || (d && validaD)) && ((!e) || (e && validaE))) {
                        resposta = resposta * numPrimos[iterator];
                        ehMdc = true;
                    }
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
                                    <th className={"conteudo__tabela_celula"}><p className={`${ehMdc ? 'conteudo__tabela_celula-vermelho' : ''}`}>{numPrimos[iterator]}</p></th>
                                </tr>
                            </table>
                        </>
                    iterator = 0;
                    ehMdc = false;
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
                <p>O MDC entre {valorA} e {valorB} {valorC ? `e ${valorC}` : ""} {valorD ? `e ${valorD}` : ""} {valorE ? `e ${valorE}` : ""} é: {resposta}</p>
            </>
            setResolucao(calculo);
        };
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, { setValue }: InputProps) => {
        let inputValue: number | undefined;
        if (Number(event.target.value) < 0) {
            inputValue = Number(event.target.value) * -1;
        } else if (Number(event.target.value) === 0) {
            inputValue = undefined;
        } else {
            inputValue = Number(event.target.value);
        }
        setValue(inputValue);
    }

    return (
        <>
            <h2 className="conteudo__titulo">Máximo Divisor Comum (MDC)!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de MDC:</h3>
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
                <p>O máximo divisor comum (MDC ou M.D.C) corresponde ao produto dos divisores comuns entre dois ou mais números inteiros.</p>
                <p>Lembre-se que os números divisores são aqueles que ocorrem quando o resto da divisão é igual a zero. Por exemplo, o número 12 é divisível por 1, 2, 3, 4, 6 e 12. Se dividirmos 12 por esses números obteremos um resultado exato, sem que haja um resto na divisão.</p>
                <p className="conteudo__material__titulo">Como calcular o MDC?</p>
                <p>Para calcular o máximo divisor comum (MDC) entre números, devemos realizar a fatoração por meio da decomposição em fatores primos dos números indicados.</p>
                <p>Para exemplificar, vamos calcular através da fatoração o MDC do 20 e 24:</p>
                <img src="https://static.todamateria.com.br/upload/im/ag/image-638.jpg" alt="tabela de resolução de MDC" />
                <p>Para saber o MDC dos números, devemos olhar à direita da fatoração e ver quais números dividiram, simultaneamente, nas duas colunas e multiplicá-los.</p>
                <p>Assim, pela fatoração podemos concluir que o 4 (2x2) é o maior número que divide ambos e, portanto, é o máximo divisor comum de 20 e 24.</p>
                <p className="conteudo__material__titulo">Exemplos / Exercícios</p>
                {/* Exercício 1 */}
                <p><span style={{ fontWeight: "bold" }}>1)</span>(Vunesp) Em um colégio de São Paulo, há 120 alunos na 1.ª série do Ensino Médio, 144 na 2.ª e 60 na 3.ª. Na semana cultural, todos esses alunos serão organizados em equipes, com o mesmo número de elementos, sem que se misturem alunos de séries diferentes. O número máximo de alunos que pode haver em cada equipe é igual a:</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 7</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 10</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 12</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 28</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 30</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 1"
                    content1="Alternativa C!"
                    content2="Devemos calcular o MDC(120,144,60). Para isso, fazemos a fatoração entre os três valores e multiplicamos os fatores que dividem, simultaneamente, as duas colunas."
                    content3="Desta forma, o número máximo de alunos que pode haver em cada equipe é igual a 12."
                />

                {/* Exercício 2 */}
                <p><span style={{ fontWeight: "bold" }}>2)</span>(Enem-2015) Um arquiteto está reformando uma casa. De modo a contribuir com o meio ambiente, decide reaproveitar tábuas de madeira retiradas da casa. Ele dispõe de 40 tábuas de 540 cm, 30 de 810 cm e 10 de 1 080 cm, todas de mesma largura e espessura. Ele pediu a um carpinteiro que cortasse as tábuas em peças de mesmo comprimento, sem deixar sobras, e de modo que as novas peças ficassem com o maior tamanho possível, mas de comprimento menor que 2 m. Atendendo o pedido do arquiteto, o carpinteiro deverá produzir</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 105 peças</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 120 peças</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 210 peças</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 243 peças</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 420 peças</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 2"
                    content1="Alternativa E) 420 peças!"
                    content2="Calculamos o MDC entre as medidas das tábuas e o resultado foi 270cm. No entanto, o problema impõe um condição, as tábuas não podem ser maiores que 2m. Sabemos que 270cm é divisível por 2 e seu resultado dá 135cm (menos que 2m). Não podemos dividir por outros números pois queremos o maior tamanho possível desde que seja menor que 2m!"
                    content3="Dessa forma, cada nova tábua deve possuir 135 cm. Para calcular a quantidade, dividimos cada comprimento disponível por 135 e, multiplicamos pela quantidades. Para 540 = 540/135 = 4 peças x 40 tábuas = 160 tábuas de 135cm. Para 810 = 810/135 = 6 peças x 30 tábuas = 180 tábuas de 135cm. Para 1080 = 1080/135 = 8 peças x 10 tábuas = 80 tábuas de 135cm. Totalizando = 420 tábuas de 135cm."
                />

                {/* Exercício 3 */}
                <p><span style={{ fontWeight: "bold" }}>3)</span>(Enem-2015) O gerente de um cinema fornece anualmente ingressos gratuitos para escolas. Este ano serão distribuídos 400 ingressos para uma sessão vespertina e 320 ingressos para uma sessão noturna de um mesmo filme. Várias escolas podem ser escolhidas para receberem ingressos. Há alguns critérios para a distribuição dos ingressos:</p>
                <p>1) cada escola deverá receber ingressos para uma única sessão;</p>
                <p>2) todas as escolas contempladas deverão receber o mesmo número de ingressos;</p>
                <p>3) não haverá sobra de ingressos (ou seja, todos os ingressos serão distribuídos).</p>
                <p>O número mínimo de escolas que podem ser escolhidas para obter ingressos, segundo os critérios estabelecidos, é:</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 2 escolas</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 4 escolas</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 9 escolas</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 40 escolas</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 80 escolas</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 3"
                    content1="Alternativa C) 9 escolas!"
                    content2="Calculando o MDC entre 400 e 320 temos o número 80! Dividindo pelo número de alunos em cada escola temos 400 / 80 = 5 e 320 / 80 = 4"
                    content3="Ao total, temos 5 + 4 escolas, ou seja, 9 escolas."
                />
            </div>
        </>
    )
}