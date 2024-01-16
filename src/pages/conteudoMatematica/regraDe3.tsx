import React, { useEffect, useState } from "react";
import './conteudoMatematica.css';

export default function RegraDe3() {
    const [resposta, setResposta] = useState<number>();
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
            let calculo: number = 0;
            if (tipoDeEntrada === "A") {
                calculo = ((valorB * valorC) / valorA);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    {valorA} x X = {valorB} x {valorC}<br></br>
                    {valorA}X = {valorB * valorC}<br></br>
                    X = {valorB * valorC} / {valorA}<br></br>
                    X = {calculo}<br></br><br></br>
                    <p>Contextualizando: {valorA} árvores produzem {valorB} frutos. Quantos frutos {valorC} árvores produzem? Resposta: {calculo} frutos!</p>
                </>)
            } else {
                calculo = ((valorA * valorB) / valorC);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    {valorA} x {valorB} = {valorC}X<br></br>
                    {valorA * valorB} = {valorC}X<br></br>
                    X = {valorA * valorB} / {valorC}<br></br>
                    X = {calculo}<br></br><br></br>
                    <p>Contextualizando: {valorA} pedreiros constroem um muro em {valorB} dias. Quantos dias {valorC} pedreiros levam para construir? Resposta: {calculo} dias!</p>
                </>)
            }
            setResposta(calculo);
        }
    }

    function handleValue1Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorA(Number(event.target.value));
    }

    function handleValue2Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorB(Number(event.target.value));
    }

    function handleValue3Change(event: React.ChangeEvent<HTMLInputElement>) {
        setValorC(Number(event.target.value));
    }

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
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="regraDe3" onClick={() => setTipoDeEntrada("B")} />
                </div>
            </div>
            <div className="conteudo__calculadora">
                <input type="number" onChange={handleValue1Change} placeholder="valor A" required />
                <p>Está para</p>
                <input type="number" onChange={handleValue2Change} placeholder="valor B" required />
            </div>
            {tipoDeEntrada === "A" ? (
                <svg style={{ position: "absolute", top: "39.5%", left: "54.6%", transform: "rotate(45deg)" }} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="20" y1="50" x2="90" y2="50" stroke="black" strokeWidth="2" />
                    <line x1="50" y1="15" x2="50" y2="80" stroke="black" strokeWidth="2" />
                    <polygon points="90,50 80,45 80,55" fill="black" />
                    <polygon points="45,22 55,22 50,10" fill="black" />
                </svg>
            ) : (
                <svg style={{ position: "absolute", top: "40%", left: "55%" }} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="30" x2="90" y2="30" stroke="black" strokeWidth="2" />
                    <line x1="10" y1="65" x2="90" y2="65" stroke="black" strokeWidth="2" />
                    <polygon points="90,30 80,25 80,35" fill="black" />
                    <polygon points="80,70 91,65 80,60" fill="black" />
                </svg>
            )}
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
                <p>A <span style={{fontWeight:"bold"}}>regra de três</span> é uma técnica usada para encontrar uma medida quando conhecemos outras três, desde que essas quatro medidas formem uma proporção. Esse método, conhecido como regra de três, faz uso de alguns conhecimentos importantes: propriedade fundamental das proporções, grandezas e medidas, razões e proporções. Pode-se dizer que a união de todos esses conhecimentos resulta, entre outras coisas, no que conhecemos como regra de três.</p>
                <br></br>
                <p style={{fontWeight:"bold", fontSize:"28px"}}>Como fazer a regra de três simples</p>
                <br></br>
                <p>O cálculo da regra de 3 é feito separando-se os valores em duas colunas. Na primeira linha coloca-se o nome das grandezas em cada coluna. Na linha debaixo preenche-se os respectivos valores conhecidos das duas grandezas. Na terceira linha escreve-se o outro valor conhecido e na coluna do valor desconhecido coloca-se x.</p>
                <br></br>
            </div>
        </>
    )
}
