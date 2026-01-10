import React from "react";
import ButtonComp from "../../components/Button";
import CardObject from "../../components/CardObject";
import Navbar from "../../components/NavBar";
import PesquisaBar from "../../components/PesquisaBar";

function HomePage(){
    return(
        <div>
            <Navbar/>
            <PesquisaBar/>
            <CardObject/>
        </div>
    )
}

export default HomePage;