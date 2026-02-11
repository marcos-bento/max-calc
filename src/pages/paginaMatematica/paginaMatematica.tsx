import Navbar from "../../components/navbar/navbar";
import "../../styles/style.css";
import React, { useCallback, useEffect, useState } from "react";
import "./paginaMatematica.css";
import RegraDe3 from "../conteudoMatematica/regraDe3";
import RegraDe3Composta from "../conteudoMatematica/regraDe3Composta";
import NumerosInteiros from "../conteudoMatematica/numerosInteiros";
import MMC from "../conteudoMatematica/mmc";
import MDC from "../conteudoMatematica/mdc";
import NumerosRacionais from "../conteudoMatematica/numerosRacionais";
import Fracoes from "../conteudoMatematica/fracoes";
import DivisaoProporcional from "../conteudoMatematica/divisaoProporcional";
import Porcentagem from "../conteudoMatematica/porcentagem";
import Juros from "../conteudoMatematica/juros";
import CalculaArea from "../conteudoMatematica/calculoArea";
import CalculaVolume from "../conteudoMatematica/calculoVolume";
import ConversaoNumeros from "../conteudoMatematica/conversaoNumeros";
import EquacaoSegundoGrau from "../conteudoMatematica/equacaoSegundoGrau";
import Progressoes from "../conteudoMatematica/progressoes";
import SistemaLinear from "../conteudoMatematica/sistemaLinear";

type ConteudoSlug =
  | "home"
  | "regra-de-3-simples"
  | "regra-de-3-composta"
  | "mmc"
  | "mdc"
  | "numeros-inteiros"
  | "numeros-racionais"
  | "fracoes"
  | "divisao-proporcional"
  | "porcentagem"
  | "juros"
  | "calculo-area"
  | "calculo-volume"
  | "conversao-numeros"
  | "equacao-segundo-grau"
  | "progressoes"
  | "sistema-linear"
  | "raciocinio-sequencial";

const slugsValidos: ConteudoSlug[] = [
  "home",
  "regra-de-3-simples",
  "regra-de-3-composta",
  "mmc",
  "mdc",
  "numeros-inteiros",
  "numeros-racionais",
  "fracoes",
  "divisao-proporcional",
  "porcentagem",
  "juros",
  "calculo-area",
  "calculo-volume",
  "conversao-numeros",
  "equacao-segundo-grau",
  "progressoes",
  "sistema-linear",
  "raciocinio-sequencial",
];

export default function PaginaMatematica() {
  const lerConteudoDoHash = useCallback((): ConteudoSlug => {
    const hashValor = window.location.hash.replace("#", "").trim();
    return slugsValidos.includes(hashValor as ConteudoSlug)
      ? (hashValor as ConteudoSlug)
      : "home";
  }, []);

  const [conteudo, setConteudo] = useState<ConteudoSlug>(lerConteudoDoHash);

  const atualizarConteudo = (novoConteudo: ConteudoSlug) => {
    setConteudo(novoConteudo);
    const novoHash = novoConteudo === "home" ? "" : `#${novoConteudo}`;
    const novaUrl = `${window.location.pathname}${novoHash}`;
    window.history.replaceState(null, "", novaUrl);
  };

  useEffect(() => {
    const aoNavegar = () => setConteudo(lerConteudoDoHash());
    window.addEventListener("popstate", aoNavegar);
    return () => window.removeEventListener("popstate", aoNavegar);
  }, [lerConteudoDoHash]);

  let componente: React.JSX.Element = <></>;

  switch (conteudo) {
    case "regra-de-3-simples":
      componente = <RegraDe3 />;
      break;
    case "regra-de-3-composta":
      componente = <RegraDe3Composta />;
      break;
    case "numeros-inteiros":
      componente = <NumerosInteiros />;
      break;
    case "mmc":
      componente = <MMC />;
      break;
    case "mdc":
      componente = <MDC />;
      break;
    case "numeros-racionais":
      componente = <NumerosRacionais />;
      break;
    case "fracoes":
      componente = <Fracoes />;
      break;
    case "divisao-proporcional":
      componente = <DivisaoProporcional />;
      break;
    case "porcentagem":
      componente = <Porcentagem />;
      break;
    case "juros":
      componente = <Juros />;
      break;
    case "calculo-area":
      componente = <CalculaArea />;
      break;
    case "calculo-volume":
      componente = <CalculaVolume />;
      break;
    case "conversao-numeros":
      componente = <ConversaoNumeros />;
      break;
    case "equacao-segundo-grau":
      componente = <EquacaoSegundoGrau />;
      break;
    case "progressoes":
      componente = <Progressoes />;
      break;
    case "sistema-linear":
      componente = <SistemaLinear />;
      break;
    case "raciocinio-sequencial":
      componente = <p>Raciocínio Sequencial</p>;
      break;
    default:
      componente = (
        <>
          <h1 className="conteudo__artigo__titulo">Material de estudo de Matemática!</h1>
          <p className="conteudo__artigo__texto">
            Todo conteúdo apresentado nesse website tem como intuito fomentar a educação e o aprendizado, seja ele guiado ou solo.
          </p>
          <div className="conteudo__artigo__texto">
            <img
              src="https://files.passeidireto.com/d672f411-ac0d-4301-8be1-665c7734ef44/d672f411-ac0d-4301-8be1-665c7734ef44.jpeg"
              alt="Símbolos variados matemáticos"
            />
          </div>
          <p className="conteudo__artigo__texto">símbolos retirados do site Gran Cursos Online</p>
        </>
      );
      break;
  }

  return (
    <>
      <Navbar />
      <div className="conteudo">
        <aside className="conteudo__lateral">
          <ul className="conteudo__lateral__links">
            <li className="conteudo__lateral__links_titulo">calculadoras:</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("regra-de-3-simples")}>Regra de 3 Simples</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("regra-de-3-composta")}>Regra de 3 Composta</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("mmc")}>MMC: Múltiplo comum</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("mdc")}>MDC: Divisor comum</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("fracoes")}>Frações</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("divisao-proporcional")}>Divisão Proporcional</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("porcentagem")}>Porcentagem</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("juros")}>Juros</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("calculo-area")}>Cálculo de Área</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("calculo-volume")}>Cálculo de Volume</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("conversao-numeros")}>Conversão de Números</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("equacao-segundo-grau")}>Equação do 2º Grau</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("progressoes")}>Progressões (PA/PG)</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("sistema-linear")}>Sistema Linear</li>
            <li className="conteudo__lateral__links_titulo">Conceitos:</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("numeros-inteiros")}>Números inteiros</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("numeros-racionais")}>Números Racionais</li>
            <li className="conteudo__lateral__links_link" onClick={() => atualizarConteudo("raciocinio-sequencial")}>Raciocínio Sequencial</li>
          </ul>
        </aside>
        <article className="conteudo__artigo">
          {componente}
        </article>
      </div>
    </>
  );
}
