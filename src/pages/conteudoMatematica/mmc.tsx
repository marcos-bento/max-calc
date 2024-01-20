import React, { ChangeEvent, useState } from "react";
import "./conteudoMatematica.css"
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
  }

export default function MMC(){
    const numPrimos = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [valorC, setValorC] = useState<number>();
    const [valorD, setValorD] = useState<number>();
    const [valorE, setValorE] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);
    
    const calculaResposta = () =>{
        if (!valorA || !valorB){
            alert("Insira os valores de A e B");
        } else {
            setResolucao(
                <>
                    <p>O MMC dos números:</p>
                    {valorA} e {valorB} {valorC ? " e "+valorC : ""} {valorD ? " e "+valorD : ""} {valorE ? " e "+valorE : ""}é 42!
                </>
            );
        };
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, { setValue }: InputProps) => {
        let inputValue:number;
        if (Number(event.target.value) < 0){
            inputValue = Number(event.target.value) * -1;
        } else {
            inputValue = Number(event.target.value);
        }
        setValue(inputValue);
    }

    return(
        <>
            <h2 className="conteudo__titulo">Mínimo Múltiplo Comum (MMC)!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de MMC:</h3>
            <p className="conteudo__alertaCinza">Os valores C, D e E são opcionais.</p>
            <div className="conteudo__calculadora">
                <input type="number" min={1} value={valorA} onChange={(event) => handleValueChange(event, { setValue: setValorA})} placeholder="valor A" required />
                <input type="number" min={1} value={valorB} onChange={(event) => handleValueChange(event, { setValue: setValorB})} placeholder="valor B" required />
                <input type="number" min={1} value={valorC} onChange={(event) => handleValueChange(event, { setValue: setValorC})} placeholder="valor C" required />
                <input type="number" min={1} value={valorD} onChange={(event) => handleValueChange(event, { setValue: setValorD})} placeholder="valor D" required />
                <input type="number" min={1} value={valorE} onChange={(event) => handleValueChange(event, { setValue: setValorE})} placeholder="valor E" required />
            </div>
            <Botao texto={"Calcular"} onClick={calculaResposta}/>
            <div className="conteudo__resolucao">{resolucao}</div>
        </>
    )
}