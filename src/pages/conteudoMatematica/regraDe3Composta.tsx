import React, { ChangeEvent, useEffect, useState } from "react";
import './conteudoMatematica.css';
import Accordion from "../../components/accordion/accordion";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function RegraDe3Composta() {
    const [resposta, setResposta] = useState<string>();
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [valorC, setValorC] = useState<number>();
    const [valorD, setValorD] = useState<number>();
    const [valorE, setValorE] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");

    useEffect(() => {
        validaResposta();
    }, [valorA, valorB, valorC, valorD, valorE]);

    useEffect(() => {
        validaResposta();
    }, [tipoDeEntrada]);

    function validaResposta() {
        if (valorA && valorB && valorC && valorD && valorE) {
            console.log("A: ",valorA, "B: ",valorB, "C: ",valorC, "D: ",valorD, "E: ",valorE)
            let calculo: string = "";
            if (tipoDeEntrada === "A") {
                // Se for diretamente proporcional:
                calculo = ((valorB * valorD * valorE)/(valorA * valorC)).toFixed(2);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    <table className="conteudo__tabela">
                        <thead>
                            <tr>
                                <th className="conteudo__tabela_celula">{valorB}</th>
                                <th>x</th>
                                <th className="conteudo__tabela_celula">{valorD}</th>
                                <th>x</th>
                                <th className="conteudo__tabela_celula">{valorE}</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{valorB * valorD * valorE}</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula">{calculo}</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"></th>
                                <th>{valorA}</th>
                                <th className="conteudo__tabela_celula">x</th>
                                <th>{valorC}</th>
                                <th className="conteudo__tabela_celula"></th>
                                <th className="conteudo__tabela_celula"></th>
                                <th>{valorA * valorC}</th>
                            </tr>
                        </thead>
                    </table>
                    <br></br><br></br>
                    <p>{`Contextualizando: ${valorA} ${valorA > 1 ? "árvores produzem" : "árvore produz"} em ${valorC} ${valorC > 1 ? "dias" : "dia"} ${valorE} ${valorE > 1 ? "frutos" : "fruto"}. Quantos frutos ${valorB} ${valorB > 1 ? "árvores produzem" : "árvore produz"} em ${valorD} ${valorD > 1 ? "dias" : "dia"}? Resposta: ${calculo} ${calculo !== "1" ? "frutos" : "fruto"}!`}</p>
                </>)
            } else {
                // Se for inversamente proporcional:
                calculo = ((valorA * valorC * valorE) / (valorB * valorD)).toFixed(2);
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    <table className="conteudo__tabela">
                        <thead>
                            <tr>
                                <th className="conteudo__tabela_celula">{valorA}</th>
                                <th>x</th>
                                <th className="conteudo__tabela_celula">{valorC}</th>
                                <th>x</th>
                                <th className="conteudo__tabela_celula">{valorE}</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{valorA * valorC * valorE}</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula">{calculo}</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"></th>
                                <th>{valorB}</th>
                                <th className="conteudo__tabela_celula">x</th>
                                <th>{valorD}</th>
                                <th className="conteudo__tabela_celula"></th>
                                <th className="conteudo__tabela_celula"></th>
                                <th>{valorB * valorD}</th>
                            </tr>
                        </thead>
                    </table>
                    <br></br><br></br>
                </>)
            };
            setResposta(calculo);
        };
    };

    // function handleValue1Change(event: React.ChangeEvent<HTMLInputElement>) {
    //     setValorA(Number(event.target.value));
    // }

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
    };

    return (
        <>
            <h2 className="conteudo__titulo">Regra de 3 Composta!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Regra de 3 composta:</h3>
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
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorA })} placeholder="valor A" required />
                <p>Está para</p>
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorC })} placeholder="valor C" required />
                <p>Está para</p>
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorE })} placeholder="valor E" required />
            </div>
            {/*  SVG duas setas horizontais */}
            {/* <div className="conteudo__svgcontainer">
                <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="30" x2="90" y2="30" stroke="black" strokeWidth="2" />
                    <line x1="10" y1="65" x2="90" y2="65" stroke="black" strokeWidth="2" />
                    <polygon points="90,30 80,25 80,35" fill="black" />
                    <polygon points="80,70 91,65 80,60" fill="black" />
                </svg>
            </div> */}
            {/* SVG duas setas horizontais OU duas setas em X */}
            {/* <div className="conteudo__svgcontainer">
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
            </div> */}
            <div className="conteudo__calculadora">
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorB })} placeholder="valor B" required />
                <p>Está para</p>
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorD })} placeholder="valor D" required />
                <p>Está para</p>
                <input placeholder="X" disabled value={resposta} />
            </div>
            <div className="conteudo__resolucao">{resolucao}</div>
            {tipoDeEntrada === "A" ?
                <p className="conteudo__explicacao">Diretamente proporcional: Quando uma grandeza aumenta, a outra aumenta, ou se diminuir a outra também diminui, mutiplica-se em X</p>
                :
                ""}
            <hr></hr>
            <div className="conteudo__material">
                <p>A regra de três composta é um método utilizado para encontrar valores desconhecidos, quando o problema envolve grandezas que possuem proporção. É importante lembrar que existem duas possibilidades para as grandezas quando elas são proporcionais. Elas podem ser direta ou inversamente proporcionais.</p>
                <p>Quando existem três ou mais grandezas que são proporcionais, aplicamos a regra de três composta seguindo um passo a passo para a resolução. Os passos são:</p>
                <ul>
                    <li>- Identificação das grandezas;</li>
                    <li>- Construção da tabela;</li>
                    <li>- Análise da relação entre as grandezas;</li>
                    <li>- Resolução da equação gerada pelo problema.</li>
                </ul>
                <p>A regra de três composta é uma extensão da regra de três simples, então, para dominar a composta, é essencial dominar a resolução da simples, que é aplicada quando há apenas duas grandezas.</p>
            </div>
        </>
    )
}
