import React from "react";
import "./App.css"; // CSS principal
import logo from "./img/LOGO.png";
import Navbar from "./components/navbar"; // Nome do componente renomeado
import Footer from "../src/components/footer"; // Importa o componente Footer
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <Navbar /> {/* Uso do componente Navbar com letra maiúscula */}
      <div className="App">
        {/* Logo */}
        <header className="App-header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        {/* Uso do componente Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
