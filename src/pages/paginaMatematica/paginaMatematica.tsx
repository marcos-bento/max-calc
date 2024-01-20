import Navbar from "../../components/navbar/navbar";
import "../../styles/style.css";
import React, { useState } from "react";
import './paginaMatematica.css';
import RegraDe3 from "../conteudoMatematica/regraDe3";
import RegraDe3Composta from "../conteudoMatematica/regraDe3Composta";
import NumerosInteiros from "../conteudoMatematica/numerosInteiros";
import MMC from "../conteudoMatematica/mmc";

export default function PaginaMatematica() {
  const [conteudo, setConteudo] = useState(0);
  let componente: React.JSX.Element = <></>;

  switch(conteudo){
    case 1:
      componente = <RegraDe3/>;
    break;
    case 1.1:
      componente = <RegraDe3Composta/>;
    break;
    case 2:
      componente = <NumerosInteiros/>;
    break;
    case 2.1:
      componente = <MMC/>;
    break;
    case 2.2:
      componente = <p>Mínimo Divisor Comúm (MDC)</p>;
    break;
    case 3:
      componente = <p>Números Racionais</p>;
    break;
    case 4:
      componente = <p>Divisão Proporcional</p>;
    break;
    case 5:
      componente = <p>Porcentagem</p>;
    break;
    case 6:
      componente = <p>Juros simples</p>;
    break;
    case 7:
      componente = <p>Juros compostos</p>;
    break;
    case 8:
      componente = <p>Cálculo de Área</p>;
    break;
    case 9:
      componente = <p>Cálculo de Volume</p>;
    break;
    case 10:
      componente = <p>Raciocínio Sequencial</p>;
    break;
    default:
      componente = <>
      <h1 className="conteudo__artigo__titulo">Material de estudo de Matemática!</h1>
      <p className="conteudo__artigo__texto">Todo conteúdo apresentado nesse website tem como intuíto fomentar a educação e o aprendizado, seja ele guiado ou solo.</p>
      </>;
    break;
  }

  return (
    <>
      <Navbar/>
      <div className="conteudo">
        <aside className="conteudo__lateral">
          <h2>Veja também:</h2>
          <ul className="conteudo__lateral__links">
            <li onClick={() => setConteudo(1)}>Regra de 3</li>
            <li onClick={() => setConteudo(1.1)}>Regra de 3 Composta</li>
            <li onClick={() => setConteudo(2.1)}>MMC: Múltiplo comum</li>
            <li onClick={() => setConteudo(2.2)}>MDC: Divisor comum</li>
            <li onClick={() => setConteudo(2)}>Números inteiros</li>
            <li onClick={() => setConteudo(3)}>Números Racionais</li>
            <li onClick={() => setConteudo(4)}>Divisão Proporcional</li>
            <li onClick={() => setConteudo(5)}>Porcentagem</li>
            <li onClick={() => setConteudo(6)}>Juros simples</li>
            <li onClick={() => setConteudo(7)}>Juros compostos</li>
            <li onClick={() => setConteudo(8)}>Cálculo de Área</li>
            <li onClick={() => setConteudo(9)}>Cálculo de Volume</li>
            <li onClick={() => setConteudo(10)}>Raciocínio Sequencial</li>
          </ul>
        </aside>

        <article className="conteudo__artigo">
          {componente}
        </article>
      </div>
    </>
  );
}
