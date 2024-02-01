import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function CalculaVolume() {
    const [resolucao, setResolucao] = useState<React.ReactNode>();
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");
    const [raioCirculo, setRaioCirculo] = useState<number>();
    const [resposta, setResposta] = useState<number>();
    const [baseRetangulo, setBaseRetangulo] = useState<number>();
    const [alturaRetangulo, setAlturaRetangulo] = useState<number>();
    const [comprimentoRetangulo, setComprimentoRetangulo] = useState<number>();
    const [raioCilindro, setRaioCilindro] = useState<number>();
    const [alturaCilindro, setAlturaCilindro] = useState<number>();

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
                // Calculo área da esfera
                if (raioCirculo) {
                    let raioAoCubo = (Math.pow(raioCirculo, 3));
                    let volumeCirculo = Number(((raioAoCubo * 12.56)/3).toFixed(2).replace(".00",""));
                    setResposta(volumeCirculo);
                    calculo = (
                        <>
                            <p>Volume = (4 x π x Raio³) / 3</p>
                            <p>Volume = (4 x 3,14 x {`(${raioCirculo})³`}) / 3</p>
                            <p>Volume = (12,56 x {`(${raioCirculo})³`}) / 3</p>
                            <p>Volume = (12,56 x {raioAoCubo}) / 3</p>
                            <p>Volume = {raioAoCubo * 12.56} / 3</p>
                            <p>Volume = {volumeCirculo}un³</p>
                            <br></br>
                            <p>Importante: Não esquecer de acompanhar a unidade de medida! (Metro, centimetro, milimetro e etc)</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "B":
                // Calculo área do paralelepípedo
                if (baseRetangulo && alturaRetangulo && comprimentoRetangulo) {
                    let volumeRetangulo = baseRetangulo * alturaRetangulo * comprimentoRetangulo;
                    setResposta(volumeRetangulo);
                    calculo = (
                        <>
                            <p>Volume = Base x Altura x Comprimento</p>
                            <p>Volume = {baseRetangulo} x {alturaRetangulo} x {comprimentoRetangulo}</p>
                            <p>Volume = {volumeRetangulo}un³</p>
                            <br></br>
                            <p>Importante: Não esquecer de acompanhar a unidade de medida! (Metro, centimetro, milimetro e etc)</p>
                        </>
                    );
                } else {
                    alert("Preencha os campos corretamente!");
                };
                break;
            case "C":
                // Calculo área do cilindro
                if (raioCilindro && alturaCilindro) {
                    let raioAoQuadrado = Math.pow(raioCilindro, 2);
                    let volumeCilindro = (3.14 * raioAoQuadrado * alturaCilindro);
                    setResposta(volumeCilindro);
                    calculo = (
                        <>
                            <p>Volume = π x Raio² x Altura</p>
                            <p>Volume = 3,14 x {raioCilindro}² x {alturaCilindro}</p>
                            <p>Volume = 3,14 x {raioAoQuadrado} x {alturaCilindro}</p>
                            <p>Volume = ({raioAoQuadrado * 3.14} x {alturaCilindro})</p>
                            <p>Volume = {volumeCilindro}un³</p>
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
            <h2 className="conteudo__titulo">Caldulo de volume!</h2>
            <h3 className="conteudo__alertaCinza">Selecione a forma geométrica tridimensional:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-a">esfera:</label>
                    <input type="radio" id="entrada-a" checked={tipoDeEntrada === "A"} name="geometria" onChange={() => setTipoDeEntrada("A")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">paralelepípedo / cubo:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "B"} name="geometria" onChange={() => setTipoDeEntrada("B")} />
                </div>
                <div>
                    <label htmlFor="entrada-b">cilindro:</label>
                    <input type="radio" id="entrada-b" checked={tipoDeEntrada === "C"} name="geometria" onChange={() => setTipoDeEntrada("C")} />
                </div>
            </div>
            <br></br>
            {tipoDeEntrada === "A" ? <>
                {/* Opção A: calcular volume de uma esfera */ }
                < p className="conteudo__alertaCinza">Esfera!</p >
                <div className="conteudo__calculadora">
                    <p>Raio:</p>
                    <input type="number" min={1} value={raioCirculo} onChange={(event) => handleValueChange(event, { setValue: setRaioCirculo })} placeholder="raio" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("A")} />
                <img style={{display:"block",margin:"auto", width:"200px"}} src="https://matematicabasica.net/wp-content/uploads/2019/02/esfera-1.png" alt="Representação de uma esfera" />
            </>
            : tipoDeEntrada === "B" ?
            <>
                {/* Opção B: calcular volume de um paralelepípedo */ }
                < p className="conteudo__alertaCinza">Paralelepípedo ou cubo!</p >
                <div className="conteudo__calculadora">
                    <p>Base:</p>
                    <input type="number" min={1} value={baseRetangulo} onChange={(event) => handleValueChange(event, { setValue: setBaseRetangulo })} placeholder="base" required />
                    <p>Altura:</p>
                    <input type="number" min={1} value={alturaRetangulo} onChange={(event) => handleValueChange(event, { setValue: setAlturaRetangulo })} placeholder="altura" required />
                    <p>Comprimento:</p>
                    <input type="number" min={1} value={comprimentoRetangulo} onChange={(event) => handleValueChange(event, { setValue: setComprimentoRetangulo })} placeholder="Comprimento" required />
                    <p>=</p>
                    <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
                </div>
                <Botao texto={"Calcular"} onClick={() => calculaResposta("B")} />
                <img style={{display:"block",margin:"auto", width:"230px"}} src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/07/elementos-paralelepipedo.jpg" alt="Representação de um paralelepípedo" />
            </>
            :
            <>
            {/* Opção C: calcular volume de um Cilindro */ }
            < p className="conteudo__alertaCinza">Cilindro!</p >
            <div className="conteudo__calculadora">
                <p>Raio:</p>
                <input type="number" min={1} value={raioCilindro} onChange={(event) => handleValueChange(event, { setValue: setRaioCilindro })} placeholder="raio" required />
                <p>Altura:</p>
                <input type="number" min={1} value={alturaCilindro} onChange={(event) => handleValueChange(event, { setValue: setAlturaCilindro })} placeholder="altura" required />
                <p>=</p>
                <input type="number" min={1} value={resposta} onChange={(event) => handleValueChange(event, { setValue: setResposta })} placeholder="área" disabled />
            </div>
            <Botao texto={"Calcular"} onClick={() => calculaResposta("C")} />
            <img style={{display:"block",margin:"auto", width:"200px"}} src="https://static.preparaenem.com/2021/03/1-cilindro-reto.jpg" alt="Representação de um cilindro" />
        </>
            }
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
        </> 
    );
}