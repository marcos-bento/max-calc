import React, { ChangeEvent, useEffect, useState } from "react";
import Botao from "../../components/botao/botao";
import "./conteudoMatematica.css";

type TipoSistema = "2x2" | "3x3";

export default function SistemaLinear() {
    const [tipo, setTipo] = useState<TipoSistema>("2x2");
    const [resolucao, setResolucao] = useState<React.ReactNode>();

    const [a1, setA1] = useState<number | undefined>();
    const [b1, setB1] = useState<number | undefined>();
    const [c1, setC1] = useState<number | undefined>();

    const [a2, setA2] = useState<number | undefined>();
    const [b2, setB2] = useState<number | undefined>();
    const [c2, setC2] = useState<number | undefined>();

    const [a3, setA3] = useState<number | undefined>();
    const [b3, setB3] = useState<number | undefined>();
    const [c3, setC3] = useState<number | undefined>();

    const [d1, setD1] = useState<number | undefined>();
    const [d2, setD2] = useState<number | undefined>();
    const [d3, setD3] = useState<number | undefined>();

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

    const determinante3x3 = (
        m11: number, m12: number, m13: number,
        m21: number, m22: number, m23: number,
        m31: number, m32: number, m33: number
    ) => {
        return (
            (m11 * m22 * m33) +
            (m12 * m23 * m31) +
            (m13 * m21 * m32) -
            (m13 * m22 * m31) -
            (m11 * m23 * m32) -
            (m12 * m21 * m33)
        );
    };

    const detalharDeterminante3x3 = (
        nome: string,
        m11: number, m12: number, m13: number,
        m21: number, m22: number, m23: number,
        m31: number, m32: number, m33: number
    ) => {
        const p1 = m11 * m22 * m33;
        const p2 = m12 * m23 * m31;
        const p3 = m13 * m21 * m32;
        const n1 = m13 * m22 * m31;
        const n2 = m11 * m23 * m32;
        const n3 = m12 * m21 * m33;
        const resultado = p1 + p2 + p3 - n1 - n2 - n3;

        return (
            <>
                <p>{nome} = (a11a22a33 + a12a23a31 + a13a21a32) - (a13a22a31 + a11a23a32 + a12a21a33)</p>
                <p>{nome} = ({m11}x{m22}x{m33} + {m12}x{m23}x{m31} + {m13}x{m21}x{m32}) - ({m13}x{m22}x{m31} + {m11}x{m23}x{m32} + {m12}x{m21}x{m33})</p>
                <p>{nome} = ({formatar(p1)} + {formatar(p2)} + {formatar(p3)}) - ({formatar(n1)} + {formatar(n2)} + {formatar(n3)})</p>
                <p>{nome} = {formatar(resultado)}</p>
            </>
        );
    };

    const calcular2x2 = () => {
        if (
            a1 === undefined || b1 === undefined || c1 === undefined ||
            a2 === undefined || b2 === undefined || c2 === undefined
        ) {
            alert("Preencha os campos corretamente!");
            return;
        }

        const d = (a1 * b2) - (a2 * b1);
        const dx = (c1 * b2) - (c2 * b1);
        const dy = (a1 * c2) - (a2 * c1);

        if (d === 0) {
            const classificacao = (dx === 0 && dy === 0) ? "SPI (infinitas soluções)" : "SI (sem solução)";
            setResolucao(
                <>
                    <p>Sistema informado:</p>
                    <p>{a1}x + {b1}y = {c1}</p>
                    <p>{a2}x + {b2}y = {c2}</p>
                    <br></br>
                    <p>1) Determinante principal:</p>
                    <p>D = a1b2 - a2b1</p>
                    <p>D = ({a1}x{b2}) - ({a2}x{b1})</p>
                    <p>D = {formatar(a1 * b2)} - {formatar(a2 * b1)}</p>
                    <p>D = {formatar(d)}</p>
                    <br></br>
                    <p>2) Determinantes auxiliares:</p>
                    <p>Dx = c1b2 - c2b1 = ({c1}x{b2}) - ({c2}x{b1}) = {formatar(dx)}</p>
                    <p>Dy = a1c2 - a2c1 = ({a1}x{c2}) - ({a2}x{c1}) = {formatar(dy)}</p>
                    <br></br>
                    <p>3) Como D = 0, não podemos dividir Dx/D e Dy/D.</p>
                    <p>Classificação do sistema: {classificacao}</p>
                </>
            );
            return;
        }

        const x = dx / d;
        const y = dy / d;

        setResolucao(
            <>
                <p>Sistema informado:</p>
                <p>{a1}x + {b1}y = {c1}</p>
                <p>{a2}x + {b2}y = {c2}</p>
                <br></br>
                <p>1) Determinante principal:</p>
                <p>D = a1b2 - a2b1</p>
                <p>D = ({a1}x{b2}) - ({a2}x{b1})</p>
                <p>D = {formatar(a1 * b2)} - {formatar(a2 * b1)}</p>
                <p>D = {formatar(d)}</p>
                <br></br>
                <p>2) Determinantes auxiliares:</p>
                <p>Dx = c1b2 - c2b1</p>
                <p>Dx = ({c1}x{b2}) - ({c2}x{b1}) = {formatar(dx)}</p>
                <p>Dy = a1c2 - a2c1</p>
                <p>Dy = ({a1}x{c2}) - ({a2}x{c1}) = {formatar(dy)}</p>
                <br></br>
                <p>3) Regra de Cramer:</p>
                <p>x = Dx / D = {formatar(dx)} / {formatar(d)} = {formatar(x)}</p>
                <p>y = Dy / D = {formatar(dy)} / {formatar(d)} = {formatar(y)}</p>
                <br></br>
                <p>Classificação: SPD (solução única).</p>
            </>
        );
    };

    const calcular3x3 = () => {
        if (
            a1 === undefined || b1 === undefined || c1 === undefined || d1 === undefined ||
            a2 === undefined || b2 === undefined || c2 === undefined || d2 === undefined ||
            a3 === undefined || b3 === undefined || c3 === undefined || d3 === undefined
        ) {
            alert("Preencha os campos corretamente!");
            return;
        }

        const d = determinante3x3(a1, b1, c1, a2, b2, c2, a3, b3, c3);
        const dx = determinante3x3(d1, b1, c1, d2, b2, c2, d3, b3, c3);
        const dy = determinante3x3(a1, d1, c1, a2, d2, c2, a3, d3, c3);
        const dz = determinante3x3(a1, b1, d1, a2, b2, d2, a3, b3, d3);

        if (d === 0) {
            const classificacao = (dx === 0 && dy === 0 && dz === 0)
                ? "SPI (infinitas soluções)"
                : "SI (sem solução)";

            setResolucao(
                <>
                    <p>Sistema informado:</p>
                    <p>{a1}x + {b1}y + {c1}z = {d1}</p>
                    <p>{a2}x + {b2}y + {c2}z = {d2}</p>
                    <p>{a3}x + {b3}y + {c3}z = {d3}</p>
                    <br></br>
                    <p>1) Determinante principal e auxiliares:</p>
                    {detalharDeterminante3x3("D", a1, b1, c1, a2, b2, c2, a3, b3, c3)}
                    <br></br>
                    {detalharDeterminante3x3("Dx", d1, b1, c1, d2, b2, c2, d3, b3, c3)}
                    <br></br>
                    {detalharDeterminante3x3("Dy", a1, d1, c1, a2, d2, c2, a3, d3, c3)}
                    <br></br>
                    {detalharDeterminante3x3("Dz", a1, b1, d1, a2, b2, d2, a3, b3, d3)}
                    <br></br>
                    <p>2) Como D = 0, não podemos calcular x = Dx/D, y = Dy/D e z = Dz/D.</p>
                    <p>Classificação do sistema: {classificacao}</p>
                </>
            );
            return;
        }

        const x = dx / d;
        const y = dy / d;
        const z = dz / d;

        setResolucao(
            <>
                <p>Sistema informado:</p>
                <p>{a1}x + {b1}y + {c1}z = {d1}</p>
                <p>{a2}x + {b2}y + {c2}z = {d2}</p>
                <p>{a3}x + {b3}y + {c3}z = {d3}</p>
                <br></br>
                <p>1) Determinantes:</p>
                {detalharDeterminante3x3("D", a1, b1, c1, a2, b2, c2, a3, b3, c3)}
                <br></br>
                {detalharDeterminante3x3("Dx", d1, b1, c1, d2, b2, c2, d3, b3, c3)}
                <br></br>
                {detalharDeterminante3x3("Dy", a1, d1, c1, a2, d2, c2, a3, d3, c3)}
                <br></br>
                {detalharDeterminante3x3("Dz", a1, b1, d1, a2, b2, d2, a3, b3, d3)}
                <br></br>
                <p>2) Regra de Cramer:</p>
                <p>x = Dx / D = {formatar(dx)} / {formatar(d)} = {formatar(x)}</p>
                <p>y = Dy / D = {formatar(dy)} / {formatar(d)} = {formatar(y)}</p>
                <p>z = Dz / D = {formatar(dz)} / {formatar(d)} = {formatar(z)}</p>
                <br></br>
                <p>Classificação: SPD (solução única).</p>
            </>
        );
    };

    return (
        <>
            <h2 className="conteudo__titulo">Sistema Linear!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de sistema 2x2 e 3x3:</h3>
            <div className="conteudo__opcoes">
                <div>
                    <label htmlFor="entrada-2x2">2x2:</label>
                    <input type="radio" id="entrada-2x2" checked={tipo === "2x2"} name="sistemaLinear" onChange={() => setTipo("2x2")} />
                </div>
                <div>
                    <label htmlFor="entrada-3x3">3x3:</label>
                    <input type="radio" id="entrada-3x3" checked={tipo === "3x3"} name="sistemaLinear" onChange={() => setTipo("3x3")} />
                </div>
            </div>
            <br></br>
            {tipo === "2x2" ? (
                <>
                    <p className="conteudo__alertaCinza">Formato: a1x + b1y = c1 e a2x + b2y = c2</p>
                    <div className="conteudo__calculadora">
                        <input type="number" value={a1} onChange={(evento) => lerNumero(evento, setA1)} placeholder="a1" />
                        <input type="number" value={b1} onChange={(evento) => lerNumero(evento, setB1)} placeholder="b1" />
                        <input type="number" value={c1} onChange={(evento) => lerNumero(evento, setC1)} placeholder="c1" />
                    </div>
                    <div className="conteudo__calculadora">
                        <input type="number" value={a2} onChange={(evento) => lerNumero(evento, setA2)} placeholder="a2" />
                        <input type="number" value={b2} onChange={(evento) => lerNumero(evento, setB2)} placeholder="b2" />
                        <input type="number" value={c2} onChange={(evento) => lerNumero(evento, setC2)} placeholder="c2" />
                    </div>
                    <Botao texto={"Calcular"} onClick={calcular2x2} />
                </>
            ) : (
                <>
                    <p className="conteudo__alertaCinza">Formato: ax + by + cz = d</p>
                    <div className="conteudo__calculadora">
                        <input type="number" value={a1} onChange={(evento) => lerNumero(evento, setA1)} placeholder="a1" />
                        <input type="number" value={b1} onChange={(evento) => lerNumero(evento, setB1)} placeholder="b1" />
                        <input type="number" value={c1} onChange={(evento) => lerNumero(evento, setC1)} placeholder="c1" />
                        <input type="number" value={d1} onChange={(evento) => lerNumero(evento, setD1)} placeholder="d1" />
                    </div>
                    <div className="conteudo__calculadora">
                        <input type="number" value={a2} onChange={(evento) => lerNumero(evento, setA2)} placeholder="a2" />
                        <input type="number" value={b2} onChange={(evento) => lerNumero(evento, setB2)} placeholder="b2" />
                        <input type="number" value={c2} onChange={(evento) => lerNumero(evento, setC2)} placeholder="c2" />
                        <input type="number" value={d2} onChange={(evento) => lerNumero(evento, setD2)} placeholder="d2" />
                    </div>
                    <div className="conteudo__calculadora">
                        <input type="number" value={a3} onChange={(evento) => lerNumero(evento, setA3)} placeholder="a3" />
                        <input type="number" value={b3} onChange={(evento) => lerNumero(evento, setB3)} placeholder="b3" />
                        <input type="number" value={c3} onChange={(evento) => lerNumero(evento, setC3)} placeholder="c3" />
                        <input type="number" value={d3} onChange={(evento) => lerNumero(evento, setD3)} placeholder="d3" />
                    </div>
                    <Botao texto={"Calcular"} onClick={calcular3x3} />
                </>
            )}
            <div className="conteudo__resolucao">{resolucao}</div>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>Esta calculadora utiliza a Regra de Cramer para resolver sistemas lineares.</p>
                <p>Quando o determinante principal é zero, o sistema pode não ter solução ou ter infinitas soluções.</p>
            </div>
        </>
    );
}
