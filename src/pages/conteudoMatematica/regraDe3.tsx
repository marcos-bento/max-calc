import React, { useEffect, useState } from "react";
import './conteudoMatematica.css';
import Accordion from "../../components/accordion/accordion";

export default function RegraDe3() {
    const [resposta, setResposta] = useState<string>();
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [valorC, setValorC] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");

    useEffect(() => {
        validaResposta();
    }, [valorA, valorB, valorC]);

    useEffect(() => {
        validaResposta();
    }, [tipoDeEntrada]);

    function validaResposta() {
        if (valorA && valorB && valorC) {
            let calculo: string = "";
            if (tipoDeEntrada === "A") {
                calculo = ((valorB * valorC) / valorA).toFixed(2);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    {valorA} x X = {valorB} x {valorC}<br></br>
                    {valorA}X = {valorB * valorC}<br></br>
                    X = {valorB * valorC} / {valorA}<br></br>
                    X = {calculo}<br></br><br></br>
                    <p>{`Contextualizando: ${valorA} ${valorA > 1 ? "árvores produzem" : "árvore produz"} ${valorB} ${valorB > 1 ? "frutos" : "fruto"}. Quantos frutos ${valorC} ${valorC > 1 ? "árvores produzem" : "árvore produz"} ? Resposta: ${calculo} ${calculo !== "1" ? "frutos" : "fruto"}!`}</p>
                </>)
            } else {
                calculo = ((valorA * valorB) / valorC).toFixed(2);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    {valorA} x {valorB} = {valorC}X<br></br>
                    {valorA * valorB} = {valorC}X<br></br>
                    X = {valorA * valorB} / {valorC}<br></br>
                    X = {calculo}<br></br><br></br>
                    <p>{`Contextualizando: ${valorA} ${valorA > 1 ? "pedreiros constroem" : "pedreiro constroi"} um muro em ${valorB} ${valorB > 1 ? "dias" : "dia"}. Quantos dias ${valorC} ${valorC > 1 ? "pedreiros levam" : "pedreiro leva"} para construir? Resposta: ${calculo} ${calculo !== "1" ? "dias" : "dia"}!`}</p>
                </>)
            }
            setResposta(calculo);
        }
    }

    function handleValue1Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorA(Number(event.target.value));
    };

    function handleValue2Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorB(Number(event.target.value));
    };

    function handleValue3Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorC(Number(event.target.value));
    };

    return (
        <>
            <h2 className="conteudo__titulo">Regra de 3!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Regra de 3 simples:</h3>
            {/* Radio Button para duas opções */}
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-a" >Diretamente proporcional:</label>
                    <input type="radio" id="entrada-a" checked={tipoDeEntrada === "A"} name="regraDe3" onChange={() => setTipoDeEntrada("A")} />
                </div>
                <div>
                    <label htmlFor="entrada-b" >Inversamente proporcional:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="regraDe3" onChange={() => setTipoDeEntrada("B")} />
                </div>
            </div>
            <div className="conteudo__calculadora">
                <input type="number" onChange={handleValue1Change} placeholder="valor A" required />
                <p>Está para</p>
                <input type="number" onChange={handleValue2Change} placeholder="valor B" required />
            </div>
            <div className="conteudo__svgcontainer">
                {tipoDeEntrada === "A" ? (
                    <svg style={{ transform: "rotate(45deg)" }} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="50" x2="90" y2="50" stroke="black" strokeWidth="2" />
                        <line x1="50" y1="15" x2="50" y2="80" stroke="black" strokeWidth="2" />
                        <polygon points="90,50 80,45 80,55" fill="black" />
                        <polygon points="45,22 55,22 50,10" fill="black" />
                    </svg>
                ) : (
                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="10" y1="30" x2="90" y2="30" stroke="black" strokeWidth="2" />
                        <line x1="10" y1="65" x2="90" y2="65" stroke="black" strokeWidth="2" />
                        <polygon points="90,30 80,25 80,35" fill="black" />
                        <polygon points="80,70 91,65 80,60" fill="black" />
                    </svg>
                )}
            </div>
            <div className="conteudo__calculadora">
                <input type="number" onChange={handleValue3Change} placeholder="valor C" required />
                <p>Está para</p>
                <input placeholder="X" disabled value={resposta} />
            </div>
            <div className="conteudo__resolucao">{resolucao}</div>
            {tipoDeEntrada === "A" ?
                <p className="conteudo__explicacao">Diretamente proporcional: Quando uma grandeza aumenta, a outra aumenta, ou se diminuir a outra também diminui, mutiplica-se em X</p>
                :
                <p className="conteudo__explicacao">Inversamente proporcional: Quando uma grandeza aumenta, a outra diminui, ou se uma diminuir a outra aumenta, mutiplica-se em linha!</p>
            }
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>A <span style={{ fontWeight: "bold" }}>regra de três</span> é uma técnica usada para encontrar uma medida quando conhecemos outras três, desde que essas quatro medidas formem uma proporção. Esse método, conhecido como regra de três, faz uso de alguns conhecimentos importantes: propriedade fundamental das proporções, grandezas e medidas, razões e proporções. Pode-se dizer que a união de todos esses conhecimentos resulta, entre outras coisas, no que conhecemos como regra de três.</p>
                <p className="conteudo__material__titulo">Como fazer a regra de três simples</p>
                <p>O cálculo da regra de 3 é feito separando-se os valores em duas colunas. Na primeira linha coloca-se o nome das grandezas em cada coluna. Na linha debaixo preenche-se os respectivos valores conhecidos das duas grandezas. Na terceira linha escreve-se o outro valor conhecido e na coluna do valor desconhecido coloca-se x.</p>
                <p className="conteudo__material__titulo">Exemplos / Exercícios</p>
                {/* Exercício 1 */}
                <p><span style={{ fontWeight: "bold" }}>1)</span> Durante o ano de 2020, devido à pandemia de COVID-19, o mundo viu-se dependente da criação de uma vacina para imunizar a população. No Brasil não foi diferente, e a corrida por uma vacina eficaz só terminou no ano de 2021. A primeira delas foi a Coronavac, produzida pelo Instituto Butantan, que anunciou que a vacina possui 78% de eficácia em casos leves. Isso significa que, se 100 pessoas forem vacinadas, 78 pessoas não terão sintoma algum e 22 pessoas terão sintomas leves.
                    <br></br><br></br> A partir desse anúncio, iniciou-se a campanha de imunização. Supondo-se que a cidade de Abadia de Goiás (próxima da capital Goiânia) tenha conseguido vacinar toda a sua população, que é de 8.950 habitantes, e considerando-se que toda ela tenha contato com o vírus e que essa proporção seja mantida, a quantidade de pessoas que terão sintomas leves nessa população será de:</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 6979</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 6780</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 2170</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 1969</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 1852</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 1"
                    content1="Alternativa D!"
                    content2="Analisando a situação, as grandezas são: pessoas vacinadas (PV) e pessoas com sintomas leves (PL). Com essas grandezas, o primeiro passo será montar a tabela. Sabemos que 100 está para 22 assim como 8950 está para x, em que x é a quantidade de pessoas que terão sintomas leves nessa população."
                    content3="Agora, analisando a proporcionalidade entre essas grandezas, se se aumenta o número de pessoas vacinadas, é possível concluir que a quantidade de pessoas que apresentam sintomas leves também será maior, logo, estamos trabalhando com grandezas diretamente proporcionais. Quando isso ocorre, basta multiplicar cruzado."
                />
                {/* Exercício 2 */}
                <p><span style={{ fontWeight: "bold" }}>2)</span> A água é um dos recursos mais importantes para a manutenção da vida. Infelizmente, ela nem sempre é bem cuidada, o que tem gerado grandes contaminações de água potável em nossa sociedade. Um dos meios de contaminação é o descarte incorreto de óleo de cozinha, em que 1 litro de óleo contamina 25 mil litros de água que poderia ser potável.
                    <br></br><br></br> Preocupado com essa situação, o síndico de um condomínio resolveu colocar na área comum um tanque para descarte correto desse  óleo. Ao final do mês, ele coletou um total de 135,6 litros. Caso esse volume de óleo fosse jogado fora de maneira incorreta, o volume de água contaminada seria de:</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 3 milhões de litros</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 3,2 milhões de litros</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 3,4 milhões de litros</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 3,5 milhões de litros</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 4 milhões de litros</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 2"
                    content1="Alternativa C!"
                    content2="As grandezas são litros de água e litros de óleo, como, à medida que a quantidade de óleo aumenta, a quantidade de água contaminada também aumenta, essas grandezas são diretamente proporcionais, logo, multiplicaremos cruzado"
                />
                {/* Exercício 3 */}
                <p><span style={{ fontWeight: "bold" }}>3)</span> Para atender a alta demanda em smartphones, uma fábrica decidiu aumentar o número de produtos produzidos diariamente. Para isso, ela investiu em mais 3 máquinas, totalizando-se 8 máquinas. Sabendo-se que eram produzidos diariamente 750 smartphones, haverá um aumento na produção diária de:</p>
                <ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 1200</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 1000</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 210</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 350</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 450</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 3"
                    content1="Alternativa E!"
                    content2="Analisando as grandezas, estamos trabalhando com quantidade de máquinas e quantidade de smartphones. Além disso, sabemos que se eu aumento o número de máquinas, a minha produção também aumentará, logo, as grandezas são diretamente proporcionais, assim, multiplicaremos cruzado."
                    content3="Note que havia um total de 8 máquinas quando foram adquiridas mais 3, então, como o nosso interesse é saber somente quanto a mais a fábrica vai produzir, então 8 – 3 = 5"
                />
            </div>
        </>
    )
}
