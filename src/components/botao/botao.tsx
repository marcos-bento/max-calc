import React from "react";
import "./botao.css"

interface props{
    texto:string,
    onClick: any,
}

export default function Botao({texto, onClick}:props){
    return(
        <>
            <button className="botao" onClick={onClick}>
                {texto}
            </button>
        </>
    )
}