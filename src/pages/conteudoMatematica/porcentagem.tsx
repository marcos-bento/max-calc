import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function Porcentagem() {
    const [resolucao, setResolucao] = useState<React.ReactNode>();
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");
    const [percentual1, setPercentual1] = useState<number>();
    const [valor1, setValor1] = useState<number>();
    const [resposta1, setResposta1] = useState<number>();
    const [condicional2, setCondicional2] = useState<number>(1);
    const [percentual2, setPercentual2] = useState<number>();
    const [valor2, setValor2] = useState<number>();
    const [resposta2, setResposta2] = useState<number>();
    const [valorInicial3, setValorInicial3] = useState<number>();
    const [valorFinal3, setValorFinal3] = useState<number>();
    const [resposta3, setResposta3] = useState<number>();

    useEffect(() => {
        limparResolucao();
    }, [tipoDeEntrada]);

    const limparResolucao = () =>{
        setResolucao(undefined);
    };

    const calculaResposta = (tipo: string) => {
        let calculo: React.ReactNode;
        switch (tipo) {
            case "A":
                // Calculo simples X% de um determinado valor
                if (percentual1 && valor1) {
                    setResposta1(Number(((valor1 / 100) * percentual1).toFixed(2).replace(".00", "")));
                    calculo = (
                        <>
                            <p>{valor1} / por 100 = {valor1 / 100}</p>
                            <p>{valor1 / 100} x {percentual1} = {((valor1 / 100) * percentual1).toFixed(2).replace(".00", "")}</p>
                            <p>{percentual1}% de {valor1} é igual a {((valor1 / 100) * percentual1).toFixed(2).replace(".00", "")}!</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "B":
                // Calculo simples acréscimo ou desconto de X% de um determinado valor
                if (percentual2 && valor2) {
                    let porcento = (Number(((valor2 / 100) * percentual2).toFixed(2).replace(".00", ""))); 
                    if (condicional2 === 1) {setResposta2(porcento + valor2)} else {setResposta2(valor2 - porcento)};
                    calculo = (
                        <>
                            <p>{valor2} / 100 = {valor2 / 100}</p>
                            <p>{valor2 / 100} x {percentual2} = {porcento}</p>
                            <p>{valor2} {condicional2 === 1 ? "+" : "-"} {porcento}</p>
                            <p>{percentual2}% de {condicional2 === 1 ? "acréscimo" : "desconto"} sobre {valor2} é igual a {condicional2 === 1 ? porcento + valor2 : valor2 - porcento}!</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
                case "C":
                // Calculo simples descobrir o diferencial de um percentual
                if (valorInicial3 && valorFinal3) {
                    let porcento:number = Number(((valorFinal3 - valorInicial3) / valorInicial3).toFixed(2).replace(".00", ""));
                    setResposta3(porcento * 100);
                    calculo = (
                        <>
                            <p>{valorFinal3} - {valorInicial3} = {valorFinal3 - valorInicial3}</p>
                            <p>{valorFinal3 - valorInicial3} / {valorInicial3} = {porcento}</p>
                            <p>{porcento} x 100 = {porcento * 100}</p>
                            <p>A diferença entre {valorInicial3} e {valorFinal3} é de {porcento*100}%!</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            default:
                break;
        };
        setResolucao(calculo);
    };

    const handleOperacao1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCondicional2(Number(event.target.value));
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, { setValue }: InputProps) => {
        let inputValue: number | string | undefined;
        if (Number(event.target.value) < 0) {
            inputValue = Number(event.target.value) * -1;
        } else if (Number(event.target.value) === 0) {
            inputValue = undefined;
        } else {
            inputValue = Number(event.target.value);
        }
        setValue(inputValue);
    };

    return (
        <>
            <h2 className="conteudo__titulo">Porcento!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de porcentagem:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-a">Valor de um percentual:</label>
                    <input type="radio" id="entrada-a" checked={tipoDeEntrada === "A"} name="porcentagem" onChange={() => setTipoDeEntrada("A")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">Valor final de um acréscimo ou desconto:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="porcentagem" onChange={() => setTipoDeEntrada("B")} />
                </div>
                <div>
                    <label htmlFor="entrada-c">Percentual do aumento ou desconto:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "C"} name="porcentagem" onChange={() => setTipoDeEntrada("C")} />
                </div>
            </div>
            <br></br>
            {tipoDeEntrada === "A" ? <>
                {/* Opção A: Descobrir o valor de d um determinado % */ }
                < p className="conteudo__alertaCinza">X% de um determinado valor</p >
            <div className="conteudo__calculadora">
                <input type="number" min={1} value={percentual1} onChange={(event) => handleValueChange(event, { setValue: setPercentual1 })} placeholder="x %" required />
                <p>de</p>
                <input type="number" min={1} value={valor1} onChange={(event) => handleValueChange(event, { setValue: setValor1 })} placeholder="valor" required />
                <p>=</p>
                <input type="number" min={1} value={resposta1} onChange={(event) => handleValueChange(event, { setValue: setResposta1 })} placeholder="resultado" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("A")} />
            </>
            : tipoDeEntrada === "B" ?
            <>
            {/* Opção B: Descobrir o valor final de um aumento ou desconto de % */ }
            < p className = "conteudo__alertaCinza" > Acréscimo ou desconto de X % sobre um determinado valor</p >
            <div className="conteudo__calculadora">
                <select className="conteudo__calculadora__selectInput" value={condicional2} onChange={handleOperacao1Change} id="operacao01" name="operacao01">
                    <option disabled hidden value={undefined}>+</option>
                    <option value={1}>(+) Acréscimo</option>
                    <option value={2}>(-) Desconto</option>
                </select>
                <p>de</p>
                <input type="number" min={1} value={percentual2} onChange={(event) => handleValueChange(event, { setValue: setPercentual2 })} placeholder="x %" required />
                <p>% sobre</p>
                <input type="number" min={1} value={valor2} onChange={(event) => handleValueChange(event, { setValue: setValor2 })} placeholder="valor" required />
                <p>=</p>
                <input type="number" min={1} value={resposta2} onChange={(event) => handleValueChange(event, { setValue: setResposta2 })} placeholder="resultado" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("B")} />
            </>
            :
            <>
            {/* Opção C: Descobrir o % de uma alteração de valor */ }
            <p className="conteudo__alertaCinza">Descobrir o percentual de uma alteração de valor:</p>
            <div className="conteudo__calculadora">
                <input type="number" min={1} value={valorInicial3} onChange={(event) => handleValueChange(event, { setValue: setValorInicial3 })} placeholder="valor inicial" required />
                <p>sobre</p>
                <input type="number" min={1} value={valorFinal3} onChange={(event) => handleValueChange(event, { setValue: setValorFinal3 })} placeholder="valor final" required />
                <p>=</p>
                <input value={resposta3+"%"} onChange={(event) => handleValueChange(event, { setValue: setResposta3 })} placeholder="resultado" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("C")} />
            </>
            }
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>Porcentagem, representada pelo símbolo %, é a divisão de um número qualquer por 100. A expressão 25%, por exemplo, significa que 25 partes de um todo foram divididas em 100 partes.</p>
                <p>Há três formas de representar uma porcentagem: forma percentual, forma fracionária e forma decimal. O cálculo do valor representado por uma porcentagem geralmente é feito a partir de uma multiplicação de frações ou de números decimais, por isso o domínio das quatro operações é fundamental para a compreensão de como calcular corretamente uma porcentagem.</p>
                <p>Forma Percentual: A representação na forma percentual ocorre quando o número é seguido do símbolo % (por cento). Exemplo: 5%,  0.1%,  150%.</p>
                <p>Forma Fracionária: Para realização de cálculos, uma das formas possíveis de representação de uma porcentagem é a forma fracionária, que pode ser uma fração irredutível ou uma simples fração sobre o número 100. Ex:</p>
                <img src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/06/1-fracao.jpg" alt="Exemplo de percentual sendo transformado em fração" />
                <p>Forma Decimal: A forma decimal é uma possibilidade de representação também. Para encontrá-la, é necessária a realização da divisão. Ex: A forma decimal de 25% é obtida pela divisão de 25 : 100 = 0,25.</p>
            </div>
        </> 
    )
}