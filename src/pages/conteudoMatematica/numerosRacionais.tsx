import React from "react";
import "./conteudoMatematica.css"

export default function NumerosRacionais(){
    return (
    <>
        <div className="conteudo__material">
            <h2 className="conteudo__material__titulo">Números Racionais</h2>
            <ul className="conteudo__material__anchorList">
                <li className="conteudo__material__anchorList-link"><a href="#oquee">O que é?</a></li> - 
                <li className="conteudo__material__anchorList-link"><a href="#fracoes">Frações</a></li> -
                <li className="conteudo__material__anchorList-link"><a href="#aplicacao">Aplicação</a></li>
            </ul>
            <h3 id="oquee" className="conteudo__subtitulo">O que é?</h3>
            <p>Números racionais são os números que podem ser representados por frações de números inteiros, contanto que o denominador seja qualquer número diferente de zero (0). Eles também são formados por elementos pertencentes aos conjuntos dos Números Reais (R), e Números Irracionais (I).</p>
            <p>O conjunto dos números racionais é a junção dos conjuntos numéricos de frações e dos decimais, já que esses algarismos podem ser escritos em formato de fração. A letra Q  representa esse conjunto, pois o termo “quociente” começa com a letra q, e remete ao resultado de uma divisão.</p>
            <p>Por estarem diretamente ligados às frações, para entender os números racionais é preciso conhecer um pouco mais sobre elas. A fração é dada pela divisão de determinados números inteiros, sendo representada da seguinte maneira: A sendo <span style={{fontWeight:"bold"}}>numerador</span> e B sendo <span style={{fontWeight:"bold"}}>denominador</span>.</p>
            <img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/representacao-fracao.jpg" alt="Exemplo de fração sendo A sobre B" />
            <p>Existe uma classificação para os números racionais. Veja abaixo:</p>
            <p><span style={{ fontWeight: "bold" }}>Racionais não nulos (Q*):</span> são representados pela letra Q, com o *. É o conjunto dos números racionais sem o zero (0).</p>
            <p><span style={{ fontWeight: "bold" }}>Racionais não negativos (Q+):</span> representados pela letra Q, com o sinal +, é o conjunto composto pelo zero (0), e pelos números racionais positivos.</p>
            <p><span style={{ fontWeight: "bold" }}>Racionais não positivos (Q-):</span> representados pela letra Q, com o sinal -, é o conjunto composto pelos números racionais negativos e o zero (0).</p>
            <p><span style={{ fontWeight: "bold" }}>Racionais positivos (Q*+):</span> representados pela letra Q, com o * e o sinal +, é o conjunto dos números racionais positivos.</p>
            <p><span style={{ fontWeight: "bold" }}>Racionais negativos (Q*-):</span> representados pela letra Q com o * e o -, é o conjunto dos números racionais negativos.</p>

            <h3 id="fracoes" className="conteudo__subtitulo">Frações</h3>
            <p>O conjunto dos números racionais é formado por números que podem virar frações, como já foi dito anteriormente. Para facilitar a identificação desse conjunto, veja quais são os números que podem ser escritos nesse formato:</p>
            <p><span style={{ fontWeight: "bold" }}>As próprias frações:</span> As frações são consideradas números ordinais, pois já estão escritas da forma que se pede.</p>
            <p><span style={{ fontWeight: "bold" }}>Números inteiros:</span> Os números inteiros, em sua totalidade, podem ser escritos em forma de fração. É só dividir o número por 1, já que todo o número, quando dividido por um, fica igual a ele mesmo. Veja o número 6, por exemplo, se escrito 6/1, permanece com valor igual.</p>
            <p><span style={{ fontWeight: "bold" }}>Decimais finitos:</span> Composto por casas decimais com números limitados, o decimal finito pode ser escrito em fração. Todo decimal finito é definido pela divisão por alguma potência de base 10.</p>
            <img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/numeros-decimais.jpg" alt="Exemplo de número decimal para Fração" />
            <p><span style={{ fontWeight: "bold" }}>Dízimas periódicas:</span> Dízima periódica é a repetição de um número dentro das casas decimais. Ex: 15,5555...</p>
            <p>Geratriz da dízima periódica é o nome dado à fração que deu origem à dízima periódica. Elas podem ser frações de dízimas simples ou frações de dízimas compostas. Veja os exemplos com frações de dízimas simples:</p>
            <img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/dizima-simples.jpg" alt="Exemplo de Dizima periódica para Fração" />

            <h3 id="aplicacao" className="conteudo__subtitulo">Aplicação</h3>
            <p>Entenda o assunto nos exemplos a seguir:</p>
            <p>1-    Um prédio recém construído teve 1/3 dos seus apartamentos vendidos e 1/6 reservado por pessoas interessadas. Sendo assim, responda:</p>
            <ul>
                <li>a)    Qual a fração dos apartamentos que foi vendida e reservada?</li>
                <li><img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/numeros-racionais-resposta1-exemplo2.jpg" alt="Resolução do exercício, resposta: 1/2" /></li>
                <li>b)    Qual a fração correspondente aos apartamentos que não foram vendidos ou reservados?</li>
                <li><img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/numeros-racionais-resposta2-exemplo2.jpg" alt="Resolução do exercício, resposta: 1/2" /></li>
            </ul>
            <br></br>
            <p>2-    A avenida em que João mora está sendo asfaltada. Os 5/9 da avenida já foram asfaltados. Que fração ainda resta asfaltar?</p>
            <img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/numeros-racionais-resposta-exemplo.jpg" alt="Resolução do exercício, resposta: 4/9" />
            <br></br>
            <p>3-    Para encher um álbum de figurinhas, Maria Eduarda contribuiu com 1/6 das figurinhas, enquanto Gabriela contribuiu com 3/4 das figurinhas. Com que fração das figurinhas as duas juntas contribuíram?</p>
            <img src="https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/numeros-racionais-resposta-exemplo3.jpg" alt="Resolução do exercício, resposta: 11/12" />
        </div>
    </>
    )
}