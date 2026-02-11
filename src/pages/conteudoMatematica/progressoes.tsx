import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";
import "./conteudoMatematica.css";

type TipoProgressao = "PA" | "PG";

export default function Progressoes() {
    const [tipo, setTipo] = useState<TipoProgressao>("PA");
    const [primeiroTermo, setPrimeiroTermo] = useState<number | undefined>();
    const [razao, setRazao] = useState<number | undefined>();
    const [indice, setIndice] = useState<number | undefined>();
    const [resolucao, setResolucao] = useState<React.ReactNode>();

    useEffect(() => {
        setResolucao(undefined);
    }, [tipo]);

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

    const montarSequencia = (quantidade: number, calculoTermo: (posicao: number) => number) => {
        const termos: number[] = [];
        for (let i = 1; i <= quantidade; i += 1) {
            termos.push(calculoTermo(i));
        }
        return termos;
    };

    const calcular = () => {
        if (primeiroTermo === undefined || razao === undefined || indice === undefined) {
            alert("Preencha os campos corretamente!");
            return;
        }

        if (indice < 1 || !Number.isInteger(indice)) {
            alert("O valor de n deve ser um inteiro maior ou igual a 1.");
            return;
        }

        if (tipo === "PA") {
            const an = primeiroTermo + ((indice - 1) * razao);
            const sn = (indice * (primeiroTermo + an)) / 2;
            const termos = montarSequencia(indice, (posicao) => primeiroTermo + ((posicao - 1) * razao));
            const somaExpandida = termos.map((termo) => formatar(termo)).join(" + ");

            setResolucao(
                <>
                    <p>Progressão escolhida: PA</p>
                    <p>Dados: a1 = {primeiroTermo}, r = {razao}, n = {indice}</p>
                    <br></br>
                    <p>1) Termo geral da PA:</p>
                    <p>an = a1 + (n - 1) x r</p>
                    <p>an = {primeiroTermo} + ({indice} - 1) x {razao}</p>
                    <p>an = {primeiroTermo} + {formatar((indice - 1) * razao)}</p>
                    <p>an = {formatar(an)}</p>
                    <br></br>
                    <p>2) Termos da PA até n:</p>
                    <p>{somaExpandida}</p>
                    <br></br>
                    <p>3) Soma dos n primeiros termos:</p>
                    <p>Sn = n x (a1 + an) / 2</p>
                    <p>Sn = {indice} x ({primeiroTermo} + {formatar(an)}) / 2</p>
                    <p>Sn = {indice} x {formatar(primeiroTermo + an)} / 2</p>
                    <p>Sn = {formatar(sn)}</p>
                    <br></br>
                    <p>4) Conferência pela soma direta dos termos:</p>
                    <p>Sn = {somaExpandida}</p>
                    <p>Sn = {formatar(sn)}</p>
                </>
            );
            return;
        }

        const an = primeiroTermo * Math.pow(razao, indice - 1);
        const sn = razao === 1
            ? indice * primeiroTermo
            : primeiroTermo * ((Math.pow(razao, indice) - 1) / (razao - 1));
        const termos = montarSequencia(indice, (posicao) => primeiroTermo * Math.pow(razao, posicao - 1));
        const somaExpandida = termos.map((termo) => formatar(termo)).join(" + ");

        setResolucao(
            <>
                <p>Progressão escolhida: PG</p>
                <p>Dados: a1 = {primeiroTermo}, r = {razao}, n = {indice}</p>
                <br></br>
                <p>1) Termo geral da PG:</p>
                <p>an = a1 x r^(n - 1)</p>
                <p>an = {primeiroTermo} x {razao}^({indice} - 1)</p>
                <p>an = {primeiroTermo} x {formatar(Math.pow(razao, indice - 1))}</p>
                <p>an = {formatar(an)}</p>
                <br></br>
                <p>2) Termos da PG até n:</p>
                <p>{somaExpandida}</p>
                <br></br>
                <p>3) Soma dos n primeiros termos:</p>
                {razao === 1 ? (
                    <>
                        <p>Como r = 1, usamos Sn = n x a1</p>
                        <p>Sn = {indice} x {primeiroTermo}</p>
                        <p>Sn = {formatar(sn)}</p>
                    </>
                ) : (
                    <>
                        <p>Sn = a1 x (r^n - 1) / (r - 1)</p>
                        <p>Sn = {primeiroTermo} x ({razao}^{indice} - 1) / ({razao} - 1)</p>
                        <p>Sn = {primeiroTermo} x ({formatar(Math.pow(razao, indice))} - 1) / {formatar(razao - 1)}</p>
                        <p>Sn = {primeiroTermo} x {formatar(Math.pow(razao, indice) - 1)} / {formatar(razao - 1)}</p>
                        <p>Sn = {formatar(sn)}</p>
                    </>
                )}
                <br></br>
                <p>4) Conferência pela soma direta dos termos:</p>
                <p>Sn = {somaExpandida}</p>
                <p>Sn = {formatar(sn)}</p>
            </>
        );
    };

    return (
        <>
            <h2 className="conteudo__titulo">Progressões!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de PA e PG:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-pa">PA:</label>
                    <input type="radio" id="entrada-pa" checked={tipo === "PA"} name="progressoes" onChange={() => setTipo("PA")} />
                </div>
                <div>
                    <label htmlFor="entrada-pg">PG:</label>
                    <input type="radio" id="entrada-pg" checked={tipo === "PG"} name="progressoes" onChange={() => setTipo("PG")} />
                </div>
            </div>
            <br></br>
            <p className="conteudo__alertaCinza">Informe: primeiro termo (a1), razão (r) e posição (n).</p>
            <div className="conteudo__calculadora">
                <input type="number" value={primeiroTermo} onChange={(evento) => lerNumero(evento, setPrimeiroTermo)} placeholder="a1" />
                <input type="number" value={razao} onChange={(evento) => lerNumero(evento, setRazao)} placeholder="r" />
                <input type="number" value={indice} onChange={(evento) => lerNumero(evento, setIndice)} placeholder="n" />
            </div>
            <Botao texto={"Calcular"} onClick={calcular} />
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>PA tem crescimento por adição da razão. PG tem crescimento por multiplicação da razão.</p>
                <p>Esta calculadora retorna o termo na posição n e a soma dos n primeiros termos com detalhamento.</p>
            </div>
        </>
    );
}
