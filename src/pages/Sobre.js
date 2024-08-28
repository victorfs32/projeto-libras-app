import React from "react";
import Navbar from "../components/navbar";
import "./Sobre.css"; // Importa o arquivo CSS
import Footer from "../components/footer";

const Sobre = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="box">
          <h1 className="H1">EM BREVE!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sobre;
