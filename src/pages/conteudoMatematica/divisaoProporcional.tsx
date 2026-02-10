import React, { ChangeEvent, useEffect, useState } from "react";
import './conteudoMatematica.css';
import Botao from "../../components/botao/botao";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function DivisaoProporcional() {
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [valorC, setValorC] = useState<number>();
    const [valorTotal, setValorTotal] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);
    const [tipoDeEntrada, setTipoDeEntrada] = useState<string>("A");

    useEffect(() => {
        setResolucao("");
    }, [tipoDeEntrada]);

    function validaResposta() {
        if (valorTotal && valorA && valorB && valorC) {
            let calculo: string;
            let resultadoA: string;
            let resultadoB: string;
            let resultadoC: string;
            if (tipoDeEntrada === "A") {
                // Se for diretamente proporcional:
                calculo = (valorTotal / (valorA + valorB + valorC)).toFixed(2).replace(".00","");
                resultadoA = (Number(calculo)*valorA).toFixed(2).replace(".00","");
                resultadoB = (Number(calculo)*valorB).toFixed(2).replace(".00","");
                resultadoC = (Number(calculo)*valorC).toFixed(2).replace(".00","");
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    <table className="conteudo__tabela">
                        <thead>
                            <tr>
                                <th className="conteudo__tabela_celula">K = </th>
                                <th className="conteudo__tabela_celula"></th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{valorTotal}</th>
                                <th></th>
                                <th className="conteudo__tabela_celula"></th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{valorTotal}</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{calculo}</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th><hr /></th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"></th>
                                <th>{valorA}</th>
                                <th>+</th>
                                <th>{valorB}</th>
                                <th>+</th>
                                <th>{valorC}</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{valorA + valorB + valorC}</th>
                            </tr>
                        </thead>
                    </table>
                    <br></br>
                    <p>A: {calculo} x {valorA} = {resultadoA}</p>
                    <p>B: {calculo} x {valorB} = {resultadoB}</p>
                    <p>C: {calculo} x {valorC} = {resultadoC}</p>
                    <br></br>
                    <p>{`Contextualizando: O total de lucro de uma ação foi de R$${valorTotal} e foi dividido proporcionalmente por suas quotas, sendo o investidor A que possui ${valorA} quotas recebendo R$${resultadoA}, o investidor B que possui ${valorB} quotas recebendo R$${resultadoB} e o investidor C que possui ${valorC} quotas recebendo R$${resultadoC}`}</p>
                </>)
            } else {
                // Se for inversamente proporcional:
                let denominador = (valorA * valorB * valorC);
                let numerador = (denominador/valorA)+(denominador/valorB)+(denominador/valorC);
                let konstante = ((valorTotal * denominador) / numerador).toFixed(2).replace(".00","");
                resultadoA = (Number(konstante)/valorA).toFixed(2).replace(".00","");
                resultadoB = (Number(konstante)/valorB).toFixed(2).replace(".00","");
                resultadoC = (Number(konstante)/valorC).toFixed(2).replace(".00","");
                setResolucao(<>
                    <p>Calculo:</p>
                    <br></br>
                    <table className="conteudo__tabela">
                        <thead>
                            <tr>
                                <th className="conteudo__tabela_celula">K</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">K</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">K</th>
                                <th></th>
                                <th className="conteudo__tabela_celula"></th>
                            </tr>
                            <tr>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th>+</th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th>+</th>
                                <th className="conteudo__tabela_celula"><hr /></th>
                                <th className="conteudo__tabela_celula">=</th>
                                <th>{valorTotal}</th>
                            </tr>
                            <tr>
                                <th>{valorA}</th>
                                <th></th>
                                <th>{valorB}</th>
                                <th></th>
                                <th>{valorC}</th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                    <br></br>
                    <p style={{color:"grey"}}>Mutiplica-se os denominadores: </p>
                    <br></br>
                    <table className="conteudo__tabela">
                        <thead>
                            <tr>
                                <th className="conteudo__tabela_celula">{denominador/valorA}K</th>
                                <th>+</th>
                                <th className="conteudo__tabela_celula">{denominador/valorB}K</th>
                                <th>+</th>
                                <th className="conteudo__tabela_celula">{denominador/valorC}K</th>
                                <th></th>
                                <th className="conteudo__tabela_celula">{numerador}K</th>
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
                                <th>{valorTotal}</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>{denominador}</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>{denominador}</th>
                            </tr>
                        </thead>
                    </table>
                    <br></br>
                    <p style={{color:"grey"}}>Agora o que tem letra pra um lado o que não tem vai pro outro. O que é dividindo passa mutiplicando:</p>
                    <br></br>
                    <p>{numerador}K = {valorTotal} x {denominador}</p>
                    <p>{numerador}K = {valorTotal * denominador}</p>
                    <p>K = {valorTotal * denominador} / {numerador}</p>
                    <p>K = {konstante}</p>
                    <br></br>
                    <p style={{color:"grey"}}>Agora que temos o valor da constante (K) vamos dividir pelos valores A, B e C:</p>
                    <br></br>
                    <p>A: {konstante} / {valorA} = {resultadoA}</p>
                    <p>B: {konstante} / {valorB} = {resultadoB}</p>
                    <p>C: {konstante} / {valorC} = {resultadoC}</p>
                    <br></br>
                    <p>{`Contextualizando: O total de bônus a ser distribuído em uma empresa é de R$${valorTotal} e foi dividido inversamente proporcional pelas faltas dos funcionários, sendo o funcionário A que possui ${valorA} faltas recebendo R$${resultadoA}, o funcionário B que possui ${valorB} faltas recebendo R$${resultadoB} e o funcionário C que possui ${valorC} faltas recebendo R$${resultadoC}`}</p>
                </>)
            };
            // setResposta(calculo);
        } else {
            alert("Preencha corretamente os campos!")
        }
    };

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
            <h2 className="conteudo__titulo">Divisão proporcional!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Divisão Proporcional:</h3>
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
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorTotal })} placeholder="Valor total" required />
            </div>
            <div className="conteudo__calculadora">
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorA })} placeholder="valor A" required />
                <p>--</p>
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorB })} placeholder="valor B" required />
                <p>--</p>
                <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorC })} placeholder="valor C" required />
            </div>
            <Botao texto={"Calcular"} onClick={validaResposta} />
            <div className="conteudo__resolucao">{resolucao}</div>
            {tipoDeEntrada === "A" ?
                <p className="conteudo__explicacao">Diretamente proporcional: Quando se quer dividir de forma proporcional aos valores propostos: <br></br>Ex: Quanto mais Quotas de uma ação mais você recebe por ela, enquanto outro com menos quotas recebe um valor proporcionalmente menor.</p>
                :
                <p className="conteudo__explicacao">Inversamente proporcional: Quando se quer dividir de forma inversamente proporcional aos valores propostos: <br></br>Ex: Quanto menos infrações um certo funcionário tiver, mais bônus ele receberá dividido do total!</p>}
            <hr></hr>
            <div className="conteudo__material">
                <p>Pense na situação em que você e seu amigo fizeram um investimento financeiro em parceria, entretanto você investiu mais dinheiro do que ele. Ao decorrer do tempo este investimento gerou um retorno satisfatório e vocês vão se reunir para dividir essa quantia de dinheiro, entretanto como será feita essa divisão? Afinal ela deve ocorrer de forma justa, sendo proporcional à quantidade que cada um investiu.</p>
                <p>A situação citada acima descreve bem as circunstâncias nas quais devemos utilizar a divisão proporcional. Ela é amplamente utilizada em situações correlacionadas com a Matemática Financeira, Administração, Economia, sociedade (divisão de lucros e prejuízos).</p>
            </div>
        </>
    );
};
