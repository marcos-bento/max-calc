import Navbar from "../../components/navbar/navbar";
import "../../styles/style.css";
import React, { useState } from "react";
import './paginaMatematica.css';
import RegraDe3 from "../conteudoMatematica/regraDe3";
import RegraDe3Composta from "../conteudoMatematica/regraDe3Composta";
import NumerosInteiros from "../conteudoMatematica/numerosInteiros";
import MMC from "../conteudoMatematica/mmc";
import MDC from "../conteudoMatematica/mdc";
import NumerosRacionais from "../conteudoMatematica/numerosRacionais";
import Fracoes from "../conteudoMatematica/fracoes";
import DivisaoProporcional from "../conteudoMatematica/divisaoProporcional";
import Porcentagem from "../conteudoMatematica/porcentagem";

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
      componente = <MDC/>;
    break;
    case 3:
      componente = <NumerosRacionais/>;
    break;
    case 3.1:
      componente = <Fracoes/>;
    break;
    case 4:
      componente = <DivisaoProporcional/>;
    break;
    case 5:
      componente = <Porcentagem/>;
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
      <div className="conteudo__artigo__texto"><img src="https://files.passeidireto.com/d672f411-ac0d-4301-8be1-665c7734ef44/d672f411-ac0d-4301-8be1-665c7734ef44.jpeg" alt="Símbolos variádos matemáticos"/></div>
      <p className="conteudo__artigo__texto">símbolos retirados do site Gran Cursos Online</p>
      </>;
    break;
  }

  return (
    <>
      <Navbar/>
      <div className="conteudo">
        <aside className="conteudo__lateral">
          <ul className="conteudo__lateral__links">
            <li className="conteudo__lateral__links_titulo">calculadoras:</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(1)}>Regra de 3 Simples</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(1.1)}>Regra de 3 Composta</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(2.1)}>MMC: Múltiplo comum</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(2.2)}>MDC: Divisor comum</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(3.1)}>Frações</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(4)}>Divisão Proporcional</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(5)}>Porcentagem</li>
            <li className="conteudo__lateral__links_titulo">Conceitos:</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(2)}>Números inteiros</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(3)}>Números Racionais</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(6)}>Juros simples</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(7)}>Juros compostos</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(8)}>Cálculo de Área</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(9)}>Cálculo de Volume</li>
            <li className="conteudo__lateral__links_link" onClick={() => setConteudo(10)}>Raciocínio Sequencial</li>
          </ul>
        </aside>
        <article className="conteudo__artigo">
          {componente}
        </article>
      </div>
    </>
  );
}
