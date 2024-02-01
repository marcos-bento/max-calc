import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function CalculaArea() {
    const [resolucao, setResolucao] = useState<React.ReactNode>();
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");
    const [raioCirculo, setRaioCirculo] = useState<number>();
    const [resposta, setResposta] = useState<number>();
    const [baseTriangulo, setBaseTriangulo] = useState<number>();
    const [alturaTriangulo, setAlturaTriangulo] = useState<number>();
    const [baseQuadrado, setBaseQuadrado] = useState<number>();
    const [alturaQuadrado, setAlturaQuadrado] = useState<number>();

    useEffect(() => {
        limparResolucao();
    }, [tipoDeEntrada]);

    const limparResolucao = () =>{
        setResolucao(undefined);
        setResposta(undefined);
    };

    const calculaResposta = (tipo: string) => {
        let calculo: React.ReactNode;
        switch (tipo) {
            case "A":
                // Calculo área do círculo
                if (raioCirculo) {
                    let raioAoQuadrado = (Math.pow(raioCirculo, 2));
                    let areaCirculo = 3.14 * raioAoQuadrado;
                    setResposta(areaCirculo);
                    calculo = (
                        <>
                            <p>Área = PI x Raio²</p>
                            <p>Área = 3,14 x {`(${raioCirculo})²`}</p>
                            <p>Área = 3,14 x {raioAoQuadrado}</p>
                            <p>Área = {areaCirculo}²</p>
                            <br></br>
                            <p>Importante: Não esquecer de acompanhar a unidade de medida! (Metro, centimetro, milimetro e etc)</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "B":
                // Calculo área do tríangulo
                if (baseTriangulo && alturaTriangulo) {
                    let areaTriangulo = Number(((baseTriangulo*alturaTriangulo)/2).toFixed(2).replace(".00",""));
                    setResposta(areaTriangulo);
                    calculo = (
                        <>
                            <p>Área = (Base x Altura) / 2</p>
                            <p>Área = ({baseTriangulo} x {alturaTriangulo}) / 2</p>
                            <p>Área = {baseTriangulo * alturaTriangulo} / 2</p>
                            <p>Área = {areaTriangulo}un²</p>
                            <br></br>
                            <p>Importante: Não esquecer de acompanhar a unidade de medida! (Metro, centimetro, milimetro e etc)</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "C":
                // Calculo área do Quadrado
                if (baseQuadrado && alturaQuadrado) {
                    let areaQuadrado = (baseQuadrado*alturaQuadrado);
                    setResposta(areaQuadrado);
                    calculo = (
                        <>
                            <p>Área = (Base x Altura)</p>
                            <p>Área = ({baseQuadrado} x {alturaQuadrado})</p>
                            <p>Área = {areaQuadrado}un²</p>
                            <br></br>
                            <p>Importante: Não esquecer de acompanhar a unidade de medida! (Metro, centimetro, milimetro e etc)</p>
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
            <h2 className="conteudo__titulo">Caldulo de área!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Área:</h3>
            <h3 className="conteudo__alertaCinza">Selecione a forma geométrica:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-a">círculo:</label>
                    <input type="radio" id="entrada-a" checked={tipoDeEntrada === "A"} name="geometria" onChange={() => setTipoDeEntrada("A")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">triângulo:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="geometria" onChange={() => setTipoDeEntrada("B")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">quadrilatero:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "C"} name="geometria" onChange={() => setTipoDeEntrada("C")} />
                </div>
            </div>
            <br></br>
            {tipoDeEntrada === "A" ? <>
                {/* Opção A: calcular área de um círculo */ }
                < p className="conteudo__alertaCinza">Circulo!</p >
                <div className="conteudo__calculadora">
                    <input type="number" min={1} value={raioCirculo} onChange={(event) => handleValueChange(event, { setValue: setRaioCirculo })} placeholder="raio" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("A")} />
                <img style={{display:"block",margin:"auto", width:"200px"}} src="https://br.neurochispas.com/wp-content/uploads/2021/08/formula-para-a-area-de-um-circulo.png" alt="Representação de um círculo" />
            </>
            : tipoDeEntrada === "B" ?
            <>
                {/* Opção B: calcular área de um triângulo */ }
                < p className="conteudo__alertaCinza">Triângulo</p >
                <div className="conteudo__calculadora">
                    <p>Base:</p>
                    <input type="number" min={1} value={baseTriangulo} onChange={(event) => handleValueChange(event, { setValue: setBaseTriangulo })} placeholder="base" required />
                    <p>Altura:</p>
                    <input type="number" min={1} value={alturaTriangulo} onChange={(event) => handleValueChange(event, { setValue: setAlturaTriangulo })} placeholder="altura" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("B")} />
                <img style={{display:"block",margin:"auto", width:"230px"}} src="https://static.todamateria.com.br/upload/re/ai/rea_isosceles.jpg" alt="Representação de um triângulo" />
            </>
            :
            <>
            {/* Opção C: calcular área de um quadrilátero */ }
            < p className="conteudo__alertaCinza">Retângulo / Quadrado</p >
            <div className="conteudo__calculadora">
            <p>Base:</p>
                <input type="number" min={1} value={baseQuadrado} onChange={(event) => handleValueChange(event, { setValue: setBaseQuadrado })} placeholder="base" required />
                <p>Altura:</p>
                <input type="number" min={1} value={alturaQuadrado} onChange={(event) => handleValueChange(event, { setValue: setAlturaQuadrado })} placeholder="altura" required />
                <p>=</p>
                <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("C")} />
            <img style={{display:"block",margin:"auto", width:"250px"}} src="https://br.neurochispas.com/wp-content/uploads/2021/07/formula-para-a-area-de-um-retangulo.png" alt="Representação de um retângulo" />
        </>
            }
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
        </> 
    )
}