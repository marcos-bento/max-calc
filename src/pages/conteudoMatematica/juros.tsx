import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function Juros() {
    const [resolucao, setResolucao] = useState<React.ReactNode>();
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");
    const [percentual1, setPercentual1] = useState<number>();
    const [valor1, setValor1] = useState<number>();
    const [tempo1, setTempo1] = useState<number>();

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
                    // setResposta1(Number(((valor1 / 100) * percentual1).toFixed(2).replace(".00", "")));
                    calculo = (
                        <>
     
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "B":
                // Calculo simples acréscimo ou desconto de X% de um determinado valor
                
                break;
            default:
                break;
        };
        setResolucao(calculo);
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
            <h2 className="conteudo__titulo">Juros!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de juros simples e compostos:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-a">Juros simples:</label>
                    <input type="radio" id="entrada-a" checked={tipoDeEntrada === "A"} name="juros" onChange={() => setTipoDeEntrada("A")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">Juros compostos:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="juros" onChange={() => setTipoDeEntrada("B")} />
                </div>
            </div>
            <br></br>
            {tipoDeEntrada === "A" ? <>
                {/* Opção A: Descobrir o valor de d um determinado % */ }
                < p className="conteudo__alertaCinza">Juros Simples</p >
            <div className="conteudo__calculadora">
                <input type="number" min={1} value={percentual1} onChange={(event) => handleValueChange(event, { setValue: setPercentual1 })} placeholder="x %" required />
                <p>% juros sobre</p>
                <input type="number" min={1} value={valor1} onChange={(event) => handleValueChange(event, { setValue: setValor1 })} placeholder="capital" required />
                <p>no período:</p>
                <input type="number" min={1} value={valor1} onChange={(event) => handleValueChange(event, { setValue: setValor1 })} placeholder="tempo" required />
                <p>=</p>
                <input type="number" min={1} value={tempo1} onChange={(event) => handleValueChange(event, { setValue: setTempo1 })} placeholder="resultado" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("A")} />
            </>
            : 
            <>
            {/* Opção B: Descobrir o valor final de um aumento ou desconto de % */ }
            {/* < p className = "conteudo__alertaCinza" >Juros Compostos</p >
            <div className="conteudo__calculadora">
                <p>de</p>
                <input type="number" min={1} value={percentual2} onChange={(event) => handleValueChange(event, { setValue: setPercentual2 })} placeholder="x %" required />
                <p>% sobre</p>
                <input type="number" min={1} value={valor2} onChange={(event) => handleValueChange(event, { setValue: setValor2 })} placeholder="valor" required />
                <p>=</p>
                <input type="number" min={1} value={resposta2} onChange={(event) => handleValueChange(event, { setValue: setResposta2 })} placeholder="resultado" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("B")} /> */}
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