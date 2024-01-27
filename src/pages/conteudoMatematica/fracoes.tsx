import React, { ChangeEvent, useState } from "react";
import Botao from "../../components/botao/botao";
import Accordion from "../../components/accordion/accordion";

interface InputProps {
    value?: number | undefined;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function Fracoes() {
    const [valorA, setValorA] = useState<number>();
    const [valorB, setValorB] = useState<number>();
    const [operacao1, setOperacao1] = useState<number>(1);
    const [valorC, setValorC] = useState<number>();
    const [valorD, setValorD] = useState<number>();
    const [resolucao, setResolucao] = useState<React.ReactNode>(null);

    const handleOperacao1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOperacao1(Number(event.target.value));
    };

    const limparResolucao = () => {
        setResolucao(null);
    };

    const ehSimplificavel = (numerador: number, denominador: number) => {
        let menorNumero = (numerador > denominador ? denominador : numerador);
        let multiplicador = 1;
        for (let i = 2; i < menorNumero+1; i++) {
            if ((numerador % i === 0) && (denominador % i === 0)){
                numerador = numerador / i;
                denominador = denominador / i;
                multiplicador = multiplicador * i;
                i = 2;
            };
        };
        if (multiplicador === 1){
            return {simplificavel: false, numerador, denominador, numero: 1};
        };
        return {simplificavel: true, numerador, denominador, numero: multiplicador};
    };

    const exibirNaTelaSomaOuSubtracao = (calculo: React.ReactNode, respostaNumerador01: number, respostaNumerador02: number, denominadorComum: number, tipoOperacao: string) => {
        let numerador = (tipoOperacao === "+" ? (respostaNumerador01 + respostaNumerador02) : (respostaNumerador01 - respostaNumerador02));
        let retorno = ehSimplificavel(numerador, denominadorComum);
        return (
            <div className="conteudo__container__tabela">
                {calculo}
                <table>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">{respostaNumerador01}</th>
                            <th className="conteudo__tabela_celula">{tipoOperacao}</th>
                            <th className="conteudo__tabela_celula">{respostaNumerador02}</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">{numerador}</th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula"></th>
                                <th className="conteudo__tabela_celula">{retorno.numerador}</th>
                            </>
                                : ""}
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            <th className="conteudo__tabela_celula">=</th>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula"><hr></hr></th>
                                <div className="conteudo__calculadora__fracao-explicacaoSuperior">÷ {retorno.numero}</div>
                                <div className="conteudo__calculadora__fracao-explicacaoInferior">÷ {retorno.numero}</div>
                            </>
                                : ""}
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">{denominadorComum}</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">{denominadorComum}</th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula"></th>
                                <th className="conteudo__tabela_celula">{retorno.denominador}</th>
                            </>
                                : ""}
                        </tr>
                    </thead>
                </table>
            </div>
        );
    };

    const exibirNaTelaMultiplicacaoDivisao = (calculo: React.ReactNode, numerador: number, denominador: number,) =>{
        let retorno = ehSimplificavel(numerador, denominador);
        return (
            <div className="conteudo__container__tabela">
                {calculo}
                <table>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">{numerador}</th>
                            <th className="conteudo__tabela_celula"></th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula">{retorno.numerador}</th>
                            </>
                                : ""}
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula">=</th>
                                <th className="conteudo__tabela_celula"><hr></hr></th>
                                <div className="conteudo__calculadora__fracao-explicacaoSuperior">÷ {retorno.numero}</div>
                                <div className="conteudo__calculadora__fracao-explicacaoInferior">÷ {retorno.numero}</div>
                            </>
                                : ""}
                            </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">{denominador}</th>
                            <th className="conteudo__tabela_celula"></th>
                            {retorno.simplificavel ? 
                            <>
                                <th className="conteudo__tabela_celula">{retorno.denominador}</th>
                            </>
                                : ""}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

    const validaResposta = () => {
        if (!valorA || !valorB || !valorC || !valorD || valorB === 0 || valorD === 0) {
            alert("Preencha os campos corretamente!");
        } else {
            limparResolucao();
            let numerador01 = valorA;
            let denominador01 = valorB;
            let numerador02 = valorC;
            let denominador02 = valorD;
            let calculo: React.ReactNode;
            calculo = (
                <table>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">{numerador01}</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">{numerador02}</th>
                            <th className="conteudo__tabela_celula"></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            <th className="conteudo__tabela_celula">{operacao1 === 1 ? "+" : operacao1 === 2 ? "-" : operacao1 === 3 ? "x" : "/"} </th>
                            <th className="conteudo__tabela_celula"><hr></hr></th>
                            <th className="conteudo__tabela_celula">=</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">{denominador01}</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">{denominador02}</th>
                            <th className="conteudo__tabela_celula"></th>
                        </tr>
                    </thead>
                </table>
            );
            let denominadorComum:number;
            let respostaNumerador01:number;
            let respostaNumerador02:number;
            switch (operacao1) {
                case 1: //soma
                    //1ª Etapa: Localizar o Denominador comum
                    denominadorComum = (denominador01 === denominador02 ? denominador01 : denominador01 * denominador02);
                    respostaNumerador01 = (denominador01 === denominador02 ? numerador01 : numerador01 * denominador02);
                    respostaNumerador02 = (denominador01 === denominador02 ? numerador02 : numerador02 * denominador01);
                    calculo = exibirNaTelaSomaOuSubtracao(calculo, respostaNumerador01, respostaNumerador02, denominadorComum, "+");
                    break;
                case 2: //subtração
                    //1ª Etapa: Localizar o Denominador comum
                    denominadorComum = (denominador01 === denominador02 ? denominador01 : denominador01 * denominador02);
                    respostaNumerador01 = (denominador01 === denominador02 ? numerador01 : numerador01 * denominador02);
                    respostaNumerador02 = (denominador01 === denominador02 ? numerador02 : numerador02 * denominador01);
                    calculo = exibirNaTelaSomaOuSubtracao(calculo, respostaNumerador01, respostaNumerador02, denominadorComum, "-");
                    break;
                case 3: //multiplicação
                    denominadorComum = denominador01 * denominador02;
                    respostaNumerador01 = numerador01 * numerador02;
                    calculo = exibirNaTelaMultiplicacaoDivisao(calculo, respostaNumerador01, denominadorComum);
                    break;
                case 4: //multiplicação
                    denominadorComum = denominador01 * numerador02;
                    respostaNumerador01 = numerador01 * denominador02;
                    calculo = exibirNaTelaMultiplicacaoDivisao(calculo, respostaNumerador01, denominadorComum);
                    break;
                default:
                    break;
            };
            setResolucao(calculo);
        };
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, { setValue }: InputProps) => {
        setValue(Number(event.target.value));
    };

    return (
        <>
            <h2 className="conteudo__titulo">Operações com Frações!</h2>
            <h3 className="conteudo__subtitulo">Calculadora de Frações:</h3>
            <p className="conteudo__alertaCinza">(+) mais (-) menos (x) vezes (/) dividir</p>
            <div className="conteudo__calculadora">
                <div className="conteudo__calculadora__fracao">
                    <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorA })} placeholder="valor A" required />
                    <hr className="conteudo__calculadora__fracao-traco" />
                    <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorB })} placeholder="valor B" required />
                </div>

                <select value={operacao1} onChange={handleOperacao1Change} id="operacao01" name="operacao01">
                    <option disabled hidden value={undefined}>+</option>
                    <option value={1}>+</option>
                    <option value={2}>-</option>
                    <option value={3}>x</option>
                    <option value={4}>/</option>
                </select>

                <div className="conteudo__calculadora__fracao">
                    <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorC })} placeholder="valor C" required />
                    <hr className="conteudo__calculadora__fracao-traco" />
                    <input type="number" onChange={(event) => handleValueChange(event, { setValue: setValorD })} placeholder="valor D" required />
                </div>

            </div>
            <Botao texto={"Calcular"} onClick={validaResposta} />
            {resolucao}
            <br></br>
            <hr></hr>
            <div className="conteudo__material">
                <p className="conteudo__material__titulo">Sobre</p>
                <p>Na matemática, as frações correspondem a uma representação das partes de um todo. Ela determina a divisão de partes iguais sendo que cada parte é uma fração do inteiro.</p>
                <p>Como exemplo podemos pensar numa pizza dividida em 8 partes iguais, sendo que cada fatia corresponde a 1/8 (um oitavo) de seu total. Se eu como 3 fatias, posso dizer que comi 3/8 (três oitavos) da pizza.</p>
                <img src="https://static.todamateria.com.br/upload/57/c0/57c07b631afca-fracoes.jpg?auto_optimize=low" alt="Representação de uma fração sendo 1 numerador e 2 denominador" />
                <p className="conteudo__material__titulo">Como calcular</p>
                <p><span style={{fontWeight:"bold"}}>Adição e Subtração:</span> Para somar frações é necessário identificar se os denominadores são iguais ou diferentes. Se forem iguais, basta repetir o denominador e somar os numeradores.</p>
                <p>Exemplo: </p>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">2</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">1</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">3</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">+</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">=</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">5</th>
                        </tr>
                    </thead>
                </table>
                <p>Contudo, se os denominadores são diferentes, antes de somar devemos transformar as frações em frações equivalentes de mesmo denominador.</p>
                <p>Para isso podemos mutiplicar os denominadores entre si, e posteriormente mutiplicar numerador 1 com denominador 2 e numerador 2 com denominador 1 ficando dessa forma:</p>
                <img src="https://i.ytimg.com/vi/3iFtFVw6NhI/hqdefault.jpg" alt="Exemplo de macete para soma ou subtração de fração" />
                <p><span style={{fontWeight:"bold"}}>Múltiplicação e Divisão:</span> São incríveis de fácil! Na mútiplicação apenas faça a conta numerador com numerador e denominador com denominador, dessa forma:</p>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">2</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">1</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">2</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">x</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">=</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">25</th>
                        </tr>
                    </thead>
                </table>
                <p>Já a divisão você inverte a posição da segunda fração (o que era numerador vira denominador e vice-versa) e faz a mutiplicação igual o caso anterior:</p>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">2</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula"><span style={{color:"green"}}>1</span></th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">2</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula"><span style={{color:"red"}}>5</span></th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">10</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">÷</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">=</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">x</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                            <th className="conteudo__tabela_celula">=</th>
                            <th className="conteudo__tabela_celula"><hr /></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula"><span style={{color:"red"}}>5</span></th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">5</th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula"><span style={{color:"green"}}>1</span></th>
                            <th className="conteudo__tabela_celula"></th>
                            <th className="conteudo__tabela_celula">5</th>
                        </tr>
                    </thead>
                </table>
                <p>Alguns casos a resolução da operação incidirá em uma fração que pode ser reduzida, simplificada, dividida por um divisor em comum (o numerador e o denominador), quando isso acontecer podemos fazer o MDC para localizar qual o número dividirá a fração:</p>
                <p>Para realizar a simplificação basta dividir o numerador e o denominador pelo mesmo número natural, diferente de um, até chegar a uma fração que não mais seja divisível.</p>
                <p>Vamos utilizar a fração:</p>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">4</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr /></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">8</th>
                        </tr>
                    </thead>
                </table>
                <p>para demonstrar como simplificar. Podemos dividir por 2. E o resultado também pode ser dividido novamente por 2:</p>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAAqCAYAAADs6PSZAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAbSkFbcgAAApRJREFUeNrtnLFLW1EUxh+hhCKl0ElKh0CQIhmyOIkUyeLkUAQH6VgopYj/gaPg4CQuUjqVLlKKQyldSnFwyCLSwc3JwV0cQpZ4LjmhYnzm3te89N3zfj/4lmjI47vvnHdu8t6XJMWjp+qKjkUzCeCXQT7owu15/n9F33OCX/jFAv+lg1/4BX0WRUfYgF9FZ1m7l2+XS9ND3e+5zsT1CP1ZEH0VXelsfyp6g18jeSnaVL+i4YnozLMg/sWY77rIMeK69Jp65WjoybqGXw/yWfQu53Nr7OyL3mY4aN+Z2C3qD9FTY1fVmugPfnkRTUG4UeBXxoP2XWC3uLNGR80OftkpiKp2uFrOB33f7GyBeR2b8MtIQWyL1mO8rBWAx6K2XmHBQEE07+luFIQfz0SHoiWssFMQrrvNUBDB1LUYuJ3CWEH0RgiGcRvdj6IprLC5hzBx0BNiWnQgeoQVFAT0fySbxQYKAkaPmBDmGwAAAABAUWd7Zlb8AoBxdof/Jfwqr1/ACIBfAAAAAAAecytJdPhlGpLo8CuNrLE9pVrgAST32fdr0rE90UISXXn9Co3tmTjuya9d0bV2oZ+iF55drqxJdANIOsxGoa92n0RbSf8pMBdJ41I42jl9lpUkuiQh6TArecX25FatFd0AjXsmtpZER9JhOFHE9lzf2vQMCuIihwW2lERH0mE40cT2uP3Dxp1L2k4On2PlfhmSDsOJKranqSNSV7/JuBS9SiANkg7DiCq2x3W5LzqvVvW1OdG5FgoMNw+SDv2JLrbnW8qJ3xL9Zj2HIOkwjOhiezoZ/1ZWeIZgfH4VkrOUjU5D9xLgt+hghBUtCjciVVQt3UO8xx4KooysJv07Kbs6Jrlvml5jCwVhiRu5bI1hzlLPwAAAAq90RVh0TWF0aE1MADxtYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIj48bXRhYmxlPjxtdHI+PG10ZC8+PG10ZC8+PG10ZC8+PG10ZC8+PG10ZC8+PG10ZC8+PC9tdHI+PG10cj48bXRkPjxtZnJhYz48bXJvdz48bW4+NDwvbW4+PG1zdXA+PG1vPiYjeEEwOzwvbW8+PG1yb3c+PG1vPiYjeEY3OzwvbW8+PG1uPjI8L21uPjwvbXJvdz48L21zdXA+PC9tcm93Pjxtcm93Pjxtbj44PC9tbj48bXN1cD48bW8+JiN4QTA7PC9tbz48bXJvdz48bW8+JiN4Rjc7PC9tbz48bW4+MjwvbW4+PC9tcm93PjwvbXN1cD48L21yb3c+PC9tZnJhYz48L210ZD48bXRkPjxtbz49PC9tbz48L210ZD48bXRkPjxtZnJhYz48bXJvdz48bW4+MjwvbW4+PG1zdXA+PG1vPiYjeEEwOzwvbW8+PG1yb3c+PG1vPiYjeEY3OzwvbW8+PG1uPjI8L21uPjwvbXJvdz48L21zdXA+PC9tcm93Pjxtcm93Pjxtbj40PC9tbj48bXN1cD48bW8+JiN4QTA7PC9tbz48bXJvdz48bW8+JiN4Rjc7PC9tbz48bW4+MjwvbW4+PC9tcm93PjwvbXN1cD48L21yb3c+PC9tZnJhYz48L210ZD48bXRkPjxtbz49PC9tbz48L210ZD48bXRkPjxtZnJhYz48bW4+MTwvbW4+PG1uPjI8L21uPjwvbWZyYWM+PC9tdGQ+PG10ZC8+PC9tdHI+PG10cj48bXRkLz48bXRkLz48bXRkLz48bXRkLz48bXRkLz48bXRkLz48L210cj48L210YWJsZT48L21hdGg+GLkRFQAAAABJRU5ErkJggg==" alt="Imagem da fração sendo simplificada" />
                <p>Método 2: simplificação de fração pelo MDC:</p>
                <p>O máximo divisor comum (MDC ou M.D.C) corresponde ao maior número inteiro positivo capaz de dividir os números dados e fazer com que o resto da divisão seja igual a zero.</p>
                <p>Observe o cálculo do MDC dos termos da fração</p>
                <table style={{margin:"auto"}}>
                    <thead>
                        <tr>
                            <th className="conteudo__tabela_celula">8</th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula"><hr /></th>
                        </tr>
                        <tr>
                            <th className="conteudo__tabela_celula">24</th>
                        </tr>
                    </thead>
                </table>
                <p>através da fatoração:</p>
                <img src="data:image/png;base64,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dHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MIj48bWVuY2xvc2Ugbm90YXRpb249InJpZ2h0Ij48bXRhYmxlPjxtdHI+PG10ZD48bW4+ODwvbW4+PC9tdGQ+PG10ZD48bW4+MjQ8L21uPjwvbXRkPjwvbXRyPjxtdHI+PG10ZD48bW4+NDwvbW4+PC9tdGQ+PG10ZD48bW4+MTI8L21uPjwvbXRkPjwvbXRyPjxtdHI+PG10ZD48bW4+MjwvbW4+PC9tdGQ+PG10ZD48bW4+NjwvbW4+PC9tdGQ+PC9tdHI+PG10cj48bXRkPjxtbj4xPC9tbj48L210ZD48bXRkPjxtbj4zPC9tbj48L210ZD48L210cj48bXRyPjxtdGQ+PG1uPjE8L21uPjwvbXRkPjxtdGQ+PG1uPjE8L21uPjwvbXRkPjwvbXRyPjwvbXRhYmxlPjwvbWVuY2xvc2U+PG10YWJsZT48bXRyPjxtdGQ+PG1lbmNsb3NlIG5vdGF0aW9uPSJib3giPjxtbiBtYXRodmFyaWFudD0iYm9sZCI+MjwvbW4+PC9tZW5jbG9zZT48L210ZD48L210cj48bXRyPjxtdGQ+PG1lbmNsb3NlIG5vdGF0aW9uPSJib3giPjxtbiBtYXRodmFyaWFudD0iYm9sZCI+MjwvbW4+PC9tZW5jbG9zZT48L210ZD48L210cj48bXRyPjxtdGQ+PG1lbmNsb3NlIG5vdGF0aW9uPSJib3giPjxtbiBtYXRodmFyaWFudD0iYm9sZCI+MjwvbW4+PC9tZW5jbG9zZT48L210ZD48L210cj48bXRyPjxtdGQ+PG1uPjM8L21uPjwvbXRkPjwvbXRyPjxtdHI+PG10ZC8+PC9tdHI+PC9tdGFibGU+PG1zcGFjZSBsaW5lYnJlYWs9Im5ld2xpbmUiLz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bW8+JiN4QTA7PC9tbz48bWVuY2xvc2Ugbm90YXRpb249InRvcCI+PG1uPjI8L21uPjxtbz4mI3hBMDs8L21vPjxtaSBtYXRodmFyaWFudD0ibm9ybWFsIj54PC9taT48bW8+JiN4QTA7PC9tbz48bW4+MjwvbW4+PG1vPiYjeEEwOzwvbW8+PG1pIG1hdGh2YXJpYW50PSJub3JtYWwiPng8L21pPjxtbz4mI3hBMDs8L21vPjxtbj4yPC9tbj48bW8+JiN4QTA7PC9tbz48bW8+PTwvbW8+PG1uPjg8L21uPjwvbWVuY2xvc2U+PC9tYXRoPtbf4+gAAAAASUVORK5CYII=" alt="Exemplo de fatoração para MDC" />
                <p>Multiplicando os fatores comuns, encontramos que o número 8 é o máximo divisor comum entre os números 8 e 24.</p>
                <p>Portanto, o numerador e o denominador da fração podem ser divididos por 8 para que a fração reduzida escrita seja de maneira mais rápida.</p>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAqCAYAAABr9d/aAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAABGJhU0UAAAAbSkFbcgAAAqtJREFUeNrtm8FrE0EUxocgoUgvIiJFJFBKkRxCwYOEIpKLiHgQoYfSg4ggIkX8B3oUPPQg4kXEg4iXIEWklF4khFJKL6UUCSKIBw8evEkpSxHq98gLLsvuuqmT7Ozk++AH2d2wE/bb9+bN5q0xbmsSrIADcAg2wGVD5a4H4Ag8/8f3PoF5UFLk809evuIYKGZNh7bPq6lUQXQDfAOzoAo+aFqlLOskeAb2QQDWwbmEqEsiLhrPgC3wGjR1jHEPr59kmSWwm9cPeAUegxOgDJ6AbQvnlQLmamj7ghrpm96Ae3oj56Igsl3SqvF/58DfGcbySbkZuB9JbWLgdwsGSkq5FNq+pksJGmhZMjc9DG3XwbKF81bAmkZdoOlzggbaV01TptAGP7jgLo6BEiVvNTLKuu8i+KrGUo4buJJgVAO06In7BgbHPEY5YmAHTMXsr+pcSDlu4C01sWH+PnRu6Bx4n54UowqdAztahQZaid6kH30ZF4WiKIqiXJmTOEdR7t2FruPTdaWYQimKoqiCil3ajmqUu7Tlof+a3pTyDPkLeApO+2igj13a8oe3/JtTDu2bMd2+Wu80Sl3av2yfUC7aOz2xzD/S7reQ8aIfpUQdu7Tj5/rPtk/a1jmnd8EkAjZ1X5Lkux2Li17fu7TPgjs6D14fxoDSjbaXcvwFuJvBwFHv0o5mn0fDHDxISbkfQz/QhoG+d2mfMt0uBnmn5MowBqxrGo2qrJFZyWhgPxE/Cl3a48bOi0GpGtNBZmOOyZtJi5EUQdnJbNZC/X2koOipFhOVNLA/1bSQGViJK+ZNJRzfjjlGA9Ore+nok/cqe+2Ysta9PYjBpGx/abpv42atqPgfWrrkWe5qaF5v6dp5IGuUpt4pxymTqZy1qhFoaKAfi81+0iINHKD+AIJfFq925rRHAAABT3RFWHRNYXRoTUwAPG1hdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwiPjxtdGFibGU+PG10cj48bXRkPjxtZnJhYz48bXN1cD48bW4+ODwvbW4+PG1yb3c+PG1vPiYjeEY3OzwvbW8+PG1uPjg8L21uPjwvbXJvdz48L21zdXA+PG1yb3c+PG1zdXA+PG1uPjI0PC9tbj48bXJvdz48bW8+JiN4Rjc7PC9tbz48bW4+ODwvbW4+PC9tcm93PjwvbXN1cD48bW8+JiN4QTA7PC9tbz48L21yb3c+PC9tZnJhYz48L210ZD48bXRkPjxtbz49PC9tbz48L210ZD48bXRkPjxtZnJhYz48bW4+MTwvbW4+PG1uPjM8L21uPjwvbWZyYWM+PC9tdGQ+PC9tdHI+PC9tdGFibGU+PC9tYXRoPoaMGhgAAAAASUVORK5CYII=" alt="Fração sendo simplificada pelo resultado do MDC" />
                <p className="conteudo__material__titulo">Exemplos / Exercícios</p>
                {/* Exercício 1 */}
                <p><span style={{ fontWeight: "bold" }}>1)</span> Calcule:</p><ul className="conteudo__material__perguntas">
                    <li><span style={{ fontWeight: "bold" }}>A)</span> 1/3 + 1/6</li>
                    <li><span style={{ fontWeight: "bold" }}>B)</span> 1/3 - 1/6</li>
                    <li><span style={{ fontWeight: "bold" }}>C)</span> 2/5 * 3/6</li>
                    <li><span style={{ fontWeight: "bold" }}>D)</span> 4/7 / 2/6</li>
                    <li><span style={{ fontWeight: "bold" }}>E)</span> 2/8 + 4/7</li>
                    <li><span style={{ fontWeight: "bold" }}>F)</span> 11/8 / 5/8</li>
                </ul>
                <Accordion
                    title="Ver resposta da pergunta 1"
                    content1="A) 1/3 + 1/6 = 1/2 ----- B) 1/3 - 1/6 = 1/6"
                    content2="C) 2/5 * 3/6 = 1/5 ----- D) 4/7 + 2/6 = 19/21"
                    content3="E) 2/8 + 4/7 = 23/28 ----- F) 11/8 / 5/8 = 11/5"
                />
                
            </div>
        </>
    );
}