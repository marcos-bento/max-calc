import './navbar.css';
import React from "react";

export default function Navbar(){
    return (
        <div className="navbar">
            <h1 className='navbar__title'>Max Calc</h1>
            <ul className="navbar__links">
                <li>Matemática</li>
                <li>Português</li>
                <li>Informática</li>
            </ul>
        </div>
    );
}