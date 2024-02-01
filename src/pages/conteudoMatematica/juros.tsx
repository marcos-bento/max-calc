import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function Juros() {
    const [resolucao, setResolucao] = useState<React.ReactNode>();
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");
    const [taxaJuros, setTaxaJuros] = useState<number>();
    const [capital, setCapital] = useState<number>();
    const [tempo, setTempo] = useState<number>();
    const [resposta, setResposta] = useState<number>();

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
                // Calculo juros simples
                if (taxaJuros && capital && tempo) {
                    let juros = Number((capital * (taxaJuros/100) * tempo).toFixed(2).replace(".00",""));
                    setResposta(juros + capital);
                    calculo = (
                        <>
                            <p>Juros = Capital x Taxa de juros x Tempo</p>
                            <p>Juros = R${capital} x {(taxaJuros/100).toFixed(2)}% x {tempo}(meses/anos)</p>
                            <p>Juros = R${juros}</p>
                            <p>Valor total com Juros = R${juros + capital}</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "B":
                // Calculo juros compostos
                if (taxaJuros && capital && tempo) {
                    let juros = Number((taxaJuros/100).toFixed(2).replace(".00",""));
                    let potencia = Math.pow(juros+1, tempo);
                    let montante = Number((capital * potencia).toFixed(2).replace(".00",""));
                    setResposta(montante);
                    calculo = (
                        <>
                            <p>Montante = Capital x (1 + Taxa de juros) ^ Tempo</p>
                            <p>Montante = R${capital} x {`(1 + ${juros})`} ^ {tempo}(meses/anos)</p>
                            <p>Montante = R${capital} x {`(${juros+1})`} ^ {tempo}(meses/anos)</p>
                            <p>Montante = R${capital} x {`(${potencia})`} ^ {tempo}(meses/anos)</p>
                            <p>Montante = R${montante}</p>
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
                {/* Opção A: Descobrir juros simples */ }
                < p className="conteudo__alertaCinza">Juros Simples</p >
                <div className="conteudo__calculadora">
                    <input type="number" min={1} value={taxaJuros} onChange={(event) => handleValueChange(event, { setValue: setTaxaJuros })} placeholder="x %" required />
                    <p>% juros sobre</p>
                    <input type="number" min={1} value={capital} onChange={(event) => handleValueChange(event, { setValue: setCapital })} placeholder="capital" required />
                    <p>no período:</p>
                    <input type="number" min={1} value={tempo} onChange={(event) => handleValueChange(event, { setValue: setTempo })} placeholder="tempo" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="resultado" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("A")} />
            </>
            : 
            <>
                {/* Opção B: Descobrir juros compostos */ }
                < p className="conteudo__alertaCinza">Juros Compostos</p >
                <div className="conteudo__calculadora">
                    <input type="number" min={1} value={taxaJuros} onChange={(event) => handleValueChange(event, { setValue: setTaxaJuros })} placeholder="x %" required />
                    <p>% juros sobre</p>
                    <input type="number" min={1} value={capital} onChange={(event) => handleValueChange(event, { setValue: setCapital })} placeholder="capital" required />
                    <p>no período:</p>
                    <input type="number" min={1} value={tempo} onChange={(event) => handleValueChange(event, { setValue: setTempo })} placeholder="tempo" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="resultado" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("B")} />
            </>
            }
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>O juro simples é calculado tendo como base o valor inicial, conhecido como capital, a taxa de juro e o tempo. A fórmula do juro simples é J = C ∙ i ∙ t, em que J é o juro, C é o capital, i é a taxa de juro e t é o tempo.</p>
                <p>Para calcular o juro simples, basta substituir os valores na fórmula e realizar o cálculo. Além do juro simples, existe também o juro composto, que possui um acréscimo maior ao decorrer do tempo.</p>
            

                <p>Os Juros Compostos são calculados levando em conta a atualização do capital, ou seja, o juro incide não apenas no valor inicial, mas também sobre os juros acumulados (juros sobre juros).</p>
                <p>Esse tipo de juros, chamado também de “capitalização acumulada”, é muito utilizado nas transações comerciais e financeiras (sejam dívidas, empréstimos ou investimentos).</p>
                <p>Para calcular os juros compostos, utiliza-se a expressão: M = C (1+i)^t</p>
            </div>
        </> 
    )
}