import React, { ChangeEvent, ReactNode, useState } from "react";
import Botao from "../../components/botao/botao";
import "./conteudoMatematica.css";

interface FracaoProps {
    numerador: ReactNode;
    denominador: ReactNode;
}

interface RadicalProps {
    conteudo: ReactNode;
}

function Fracao({ numerador, denominador }: FracaoProps) {
    return (
        <div className="conteudo__resolucao__fracao">
            <div className="conteudo__resolucao__fracao-numerador">{numerador}</div>
            <hr className="conteudo__resolucao__fracao-traco" />
            <div className="conteudo__resolucao__fracao-denominador">{denominador}</div>
        </div>
    );
}

function Radical({ conteudo }: RadicalProps) {
    return (
        <span className="conteudo__resolucao__radical">
            <span className="conteudo__resolucao__radical-simbolo">√</span>
            <span className="conteudo__resolucao__radical-conteudo">{conteudo}</span>
        </span>
    );
}

export default function EquacaoSegundoGrau() {
    const [a, setA] = useState<number | undefined>();
    const [b, setB] = useState<number | undefined>();
    const [c, setC] = useState<number | undefined>();
    const [resolucao, setResolucao] = useState<React.ReactNode>();

    const lerNumero = (
        evento: ChangeEvent<HTMLInputElement>,
        setNumero: React.Dispatch<React.SetStateAction<number | undefined>>
    ) => {
        const valor = evento.target.value;
        if (valor === "") {
            setNumero(undefined);
            return;
        }
        setNumero(Number(valor));
    };

    const formatar = (valor: number) => Number(valor.toFixed(6)).toString();

    const LinhaFormula = ({ esquerda, numerador, denominador }: { esquerda: string; numerador: ReactNode; denominador: ReactNode }) => (
        <div className="conteudo__resolucao__linhaFormula">
            <span>{esquerda}</span>
            <Fracao numerador={numerador} denominador={denominador} />
        </div>
    );

    const LinhaBloco = ({ esquerda, direita }: { esquerda: string; direita: ReactNode }) => (
        <div className="conteudo__resolucao__blocoLinha">
            <div className="conteudo__resolucao__blocoLinha-esquerda">{esquerda}</div>
            <div className="conteudo__resolucao__blocoLinha-direita">{direita}</div>
        </div>
    );

    const calcular = () => {
        if (a === undefined || b === undefined || c === undefined) {
            alert("Preencha os campos corretamente!");
            return;
        }

        if (a === 0) {
            alert("O coeficiente 'a' deve ser diferente de zero.");
            return;
        }

        const bQuadrado = b * b;
        const quatroAC = 4 * a * c;
        const delta = bQuadrado - quatroAC;
        const doisA = 2 * a;

        if (delta > 0) {
            const raizDelta = Math.sqrt(delta);
            const numeradorX1 = (-b) + raizDelta;
            const numeradorX2 = (-b) - raizDelta;
            const x1 = numeradorX1 / doisA;
            const x2 = numeradorX2 / doisA;

            setResolucao(
                <>
                    <p>Equacao: {a}x² + ({b})x + ({c}) = 0</p>
                    <br></br>
                    <p>1) Calculo do Delta (Δ):</p>
                    <p>Δ = b² - 4ac</p>
                    <p>Δ = ({b})² - 4 x ({a}) x ({c})</p>
                    <p>Δ = {formatar(bQuadrado)} - {formatar(quatroAC)}</p>
                    <p>Δ = {formatar(delta)}</p>
                    <br></br>
                    <p>2) Como Δ &gt; 0, existem duas raizes reais diferentes.</p>
                    <LinhaFormula esquerda="x =" numerador={<><span>-b +/- </span><Radical conteudo="Δ" /></>} denominador="2a" />
                    <LinhaFormula esquerda="x =" numerador={<><span>({-b} +/- </span><Radical conteudo={formatar(delta)} /><span>)</span></>} denominador={formatar(doisA)} />
                    <LinhaFormula esquerda="x =" numerador={`(${-b} +/- ${formatar(raizDelta)})`} denominador={formatar(doisA)} />
                    <br></br>
                    <p>3) Raizes detalhadas:</p>
                    <div className="conteudo__resolucao__blocosRaiz">
                        <div className="conteudo__resolucao__blocoRaiz">
                            <LinhaBloco esquerda="x1 =" direita={<Fracao numerador={`${-b} + ${formatar(raizDelta)}`} denominador={formatar(doisA)} />} />
                            <LinhaBloco esquerda="x1 =" direita={<Fracao numerador={formatar(numeradorX1)} denominador={formatar(doisA)} />} />
                            <LinhaBloco esquerda="x1 =" direita={<span>{formatar(x1)}</span>} />
                        </div>
                        <div className="conteudo__resolucao__blocoRaiz">
                            <LinhaBloco esquerda="x2 =" direita={<Fracao numerador={`${-b} - ${formatar(raizDelta)}`} denominador={formatar(doisA)} />} />
                            <LinhaBloco esquerda="x2 =" direita={<Fracao numerador={formatar(numeradorX2)} denominador={formatar(doisA)} />} />
                            <LinhaBloco esquerda="x2 =" direita={<span>{formatar(x2)}</span>} />
                        </div>
                    </div>
                </>
            );
            return;
        }

        if (delta === 0) {
            const x = (-b) / doisA;
            setResolucao(
                <>
                    <p>Equacao: {a}x² + ({b})x + ({c}) = 0</p>
                    <br></br>
                    <p>1) Calculo do Delta (Δ):</p>
                    <p>Δ = b² - 4ac</p>
                    <p>Δ = ({b})² - 4 x ({a}) x ({c})</p>
                    <p>Δ = {formatar(bQuadrado)} - {formatar(quatroAC)}</p>
                    <p>Δ = {formatar(delta)}</p>
                    <br></br>
                    <p>2) Como Δ = 0, existe uma raiz real dupla.</p>
                    <LinhaFormula esquerda="x =" numerador="-b" denominador="2a" />
                    <LinhaFormula esquerda="x =" numerador={formatar(-b)} denominador={formatar(doisA)} />
                    <p>x = {formatar(x)}</p>
                </>
            );
            return;
        }

        const raizAbsDelta = Math.sqrt(-delta);
        const parteReal = (-b) / doisA;
        const parteImaginaria = raizAbsDelta / doisA;

        setResolucao(
            <>
                <p>Equacao: {a}x² + ({b})x + ({c}) = 0</p>
                <br></br>
                <p>1) Calculo do Delta (Δ):</p>
                <p>Δ = b² - 4ac</p>
                <p>Δ = ({b})² - 4 x ({a}) x ({c})</p>
                <p>Δ = {formatar(bQuadrado)} - {formatar(quatroAC)}</p>
                <p>Δ = {formatar(delta)}</p>
                <br></br>
                <p>2) Como Δ &lt; 0, nao existem raizes reais.</p>
                <p>As solucoes ficam no conjunto dos complexos:</p>
                <LinhaFormula esquerda="x =" numerador={<><span>-b +/- i</span><Radical conteudo="|Δ|" /></>} denominador="2a" />
                <LinhaFormula esquerda="x =" numerador={<><span>({-b} +/- i</span><Radical conteudo={formatar(-delta)} /><span>)</span></>} denominador={formatar(doisA)} />
                <LinhaFormula esquerda="x =" numerador={`(${-b} +/- i ${formatar(raizAbsDelta)})`} denominador={formatar(doisA)} />
                <br></br>
                <p>3) Forma algebrica:</p>
                <div className="conteudo__resolucao__blocosRaiz">
                    <div className="conteudo__resolucao__blocoRaiz">
                        <LinhaBloco esquerda="x1 =" direita={<span>{formatar(parteReal)} + {formatar(parteImaginaria)}i</span>} />
                    </div>
                    <div className="conteudo__resolucao__blocoRaiz">
                        <LinhaBloco esquerda="x2 =" direita={<span>{formatar(parteReal)} - {formatar(parteImaginaria)}i</span>} />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <h2 className="conteudo__titulo">Equacao do 2o Grau!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Bhaskara:</h3>
            <p className="conteudo__alertaCinza">Formato: ax² + bx + c = 0</p>
            <div className="conteudo__calculadora">
                <input type="number" value={a} onChange={(evento) => lerNumero(evento, setA)} placeholder="a" />
                <input type="number" value={b} onChange={(evento) => lerNumero(evento, setB)} placeholder="b" />
                <input type="number" value={c} onChange={(evento) => lerNumero(evento, setC)} placeholder="c" />
            </div>
            <Botao texto={"Calcular"} onClick={calcular} />
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>A equacao do 2o grau tem forma ax² + bx + c = 0, com a diferente de zero.</p>
                <p>O Delta (Δ) determina o tipo de raiz: duas reais, uma real dupla ou duas complexas.</p>
            </div>
        </>
    );
}
