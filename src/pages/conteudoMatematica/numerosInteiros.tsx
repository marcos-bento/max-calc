import React from "react";
import "./conteudoMatematica.css"

export default function NumerosInteiros(){
    return (
    <>
        <div className="conteudo__material">
            <h2 className="conteudo__material__titulo">Números inteiros</h2>
            <ul className="conteudo__material__anchorList">
                <li className="conteudo__material__anchorList-link"><a href="#oquee">O que é?</a></li> - 
                <li className="conteudo__material__anchorList-link"><a href="#operacoes">Operações</a></li> -
                <li className="conteudo__material__anchorList-link"><a href="#multiplosEdiv">Mútiplos e Divisores</a></li>
            </ul>
            <h3 id="oquee" className="conteudo__subtitulo">O que é?</h3>
            <p>Os números inteiros são os números positivos e negativos, que não apresentam parte decimal e, o zero. Estes números formam o conjunto dos números inteiros, indicado por ℤ.</p>
            <p>Não pertencem aos números inteiros: as frações, números decimais, os números irracionais e os complexos.</p>
            <p>O conjunto dos números inteiros é infinito e pode ser representado da seguinte maneira:</p>
            <p><span style={{ fontWeight: "bold" }}>ℤ</span>{" = {..., - 3, - 2, - 1, 0, 1, 2, 3,...}"}</p>
            <p>Os números inteiros negativos são sempre acompanhados pelo sinal (-), enquanto os números inteiros positivos podem vir ou não acompanhados de sinal (+).</p>
            <p>O zero é um número neutro, ou seja, não é um número nem positivo e nem negativo.</p>
            <p>O conjunto dos números Inteiros é infinito e sempre possui um antecessor e um sucessor, veja na reta numérica abaixo a representação dos números Inteiros:</p>
            <img src="https://static.todamateria.com.br/upload/re/ta/retanumericainteiros.jpg" alt="reta numérica" />
            <p>Nesse contexto os números para esquerda serão sempre menores que os números da direita, por exemplo o número -4 <span style={{ fontWeight: "bold" }}>é menor</span> que o -2.</p>

            <h3 id="operacoes" className="conteudo__subtitulo">Operações</h3>
            <p>As operações com números inteiros envolvem a adição, subtração, multiplicação e divisão entre números positivos e negativos. As contas com os números inteiros possuem regras de sinais específicas.</p>
            <p>Para somar ou subtrair números inteiros é preciso se atentar aos seus sinais. Caso sejam todos positivos, somamos ou subtraímos como números naturais.</p>
            <p>Ao somar números inteiros positivos, adicionamos seus valores e o resultado será sempre positivo.</p>
            <ul><li>3 + 4 = 7</li><li>15 + 3 = 18</li><li>258 + 12 = 270</li></ul>
            <p>Se os todos os números forem negativos, somamos seus valores e o resultado será sempre negativo.</p>
            <ul><li>-3 + (-4) = -7</li><li>-15 + (-3) = -18</li><li>-258 + (-12) = -270</li></ul>
            <p>Nesse caso é interessante pensar na seguinte analogia: "Se eu devia R$3,00 e agora devo + R$4,00, quanto eu devo no total?" Essa operação é -3 + (-4) = -7.</p>
            <p>Outra forma de escrever essa operação é omitir o sinal de mais e retirar os parênteses: <span style={{ fontWeight: "bold" }}>- 3 - 4 = -7</span></p>
            <p>Quando são sinais diferentes, subtraem-se os valores e se utiliza o sinal do maior.</p>
            <ul><li>+ 9 - 7 = 2 / ou / 9 - 7 = 2</li><li>- 9 + 7 = -2</li></ul>
            <p>Para multiplicar ou dividir números inteiros, a princípio, as operações devem ser realizadas considerando apenas seus valores.</p>
            <p>O resultado será positivo ou negativo, dependendo apenas dos sinais serem iguais ou diferentes. Ao multiplicar ou dividir números inteiros de mesmo sinal o resultado será sempre positivo.</p>
            <ul><li>3 x 2 = 6</li><li>-3 x (-2) = 6</li><li>10 / 2 = 5</li><li>-10 / -2 = 5</li></ul>
            <p>Nos casos de multiplicar ou dividir números com sinais diferentes, o resultado será sempre negativo.</p>
            <ul><li>-3 x 2 = -6</li><li>10 / (-2) = -5</li></ul>
            <p>Regra de Sinais: Quando são sinais iguais, o resultado é sempre positivo. O que significa dizer que na multiplicação e na divisão "menos com menos dá mais".</p>
            <p>Quando são sinais diferentes, o resultado é sempre negativo. O que significa dizer que na multiplicação e na divisão "mais com menos dá menos".</p>

            <h3 id="multiplosEdiv" className="conteudo__subtitulo">Mútiplos e Divisores</h3>
            <p>Sejam a e b dois números inteiros conhecidos, o número a é múltiplo de b se, e somente se, existir um número inteiro k tal que a = b · k. Desse modo, o conjunto dos múltiplos de a é obtido multiplicando a por todos números inteiros, os resultados dessas multiplicações são os múltiplos de a.</p>
            <p>Por exemplo, listemos os 12 primeiros múltiplos de 2. Para isso temos que multiplicar o número 2 pelos 12 primeiros números inteiros, assim:</p>
            <ul>
                <li>2 . 1 = <span style={{ fontWeight: "bold" }}>2</span></li>
                <li>2 . 2 = <span style={{ fontWeight: "bold" }}>4</span></li>
                <li>2 . 3 = <span style={{ fontWeight: "bold" }}>6</span></li>
                <li>2 . 4 = <span style={{ fontWeight: "bold" }}>8</span></li>
                <li>2 . 5 = <span style={{ fontWeight: "bold" }}>10</span></li>
                <li>2 . 6 = <span style={{ fontWeight: "bold" }}>12</span></li>
                <li>2 . 7 = <span style={{ fontWeight: "bold" }}>14</span></li>
                <li>2 . 8 = <span style={{ fontWeight: "bold" }}>16</span></li>
                <li>2 . 9 = <span style={{ fontWeight: "bold" }}>18</span></li>
                <li>2 . 10 = <span style={{ fontWeight: "bold" }}>20</span></li>
                <li>2 . 11 = <span style={{ fontWeight: "bold" }}>22</span></li>
                <li>2 . 12 = <span style={{ fontWeight: "bold" }}>24</span></li>
            </ul>
            <p>Portanto, os múltiplos de 2 são:</p>
            <p>{"M(2) = {2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24}"}</p>
            <p>Observe que listamos somente os 12 primeiros números, mas poderíamos ter listado quantos fossem necessários, pois a lista de múltiplos é dada pela multiplicação de um número por todos os inteiros. Assim, o conjunto dos múltiplos é infinito.</p>
            <p>Para verificar se um número é ou não múltiplo de outro, devemos encontrar um número inteiro de forma que a multiplicação entre eles resulte no primeiro número. Veja os exemplos:</p>
            <p>→ O número 49 é múltiplo de 7, pois existe número inteiro que, multiplicado por 7, resulta em 49. 49 = 7 . <span style={{ fontWeight: "bold" }}>7</span></p>
            <p>→ O número 324 é múltiplo de 3, pois existe número inteiro que, multiplicado por 3, resulta em 324. 324 = 3 . <span style={{ fontWeight: "bold" }}>108</span></p>
            <p>→ O número 523 <span style={{ fontWeight: "bold" }}>não é</span> múltiplo de 2, pois não existe número inteiro que, multiplicado por 2, resulte em 523. 523 = 2 . <span style={{ fontWeight: "bold" }}>?</span></p>
            <p>Para finalizar é importante salientar a existência dos números primos! Estes são números divisíveis apenas por 1 e por ele mesmo. Ex:</p>
            <ul>
                <li>2 é divisível por 2 e por 1 então ele <span style={{ fontWeight: "bold" }}>é primo</span>.</li>
                <li>3 é divisível por 3 e por 1 então ele <span style={{ fontWeight: "bold" }}>é primo</span>.</li>
                <li>4 é divisível por 4, por 2 e por 1 então ele <span style={{ fontWeight: "bold" }}>não é primo</span>.</li>
                <li>5 é divisível por 5 e por 1 então ele <span style={{ fontWeight: "bold" }}>é primo</span>.</li>
                <li>6 é divisível por 6, por 3, por 2 e por 1 então ele <span style={{ fontWeight: "bold" }}>não é primo</span>.</li>
            </ul>
            <p>Os números primos são utilizados para calculos como o MMC que você pode acompanhar ao lado. Para facilitar de 2 até 100 os números primos são os circulados abaixo:</p>
            <img src="https://br.neurochispas.com/wp-content/uploads/2021/05/tabela-de-numeros-primos-ate-100.jpg" alt="Tabela de números primos"/>
        </div>
    </>
    )
}