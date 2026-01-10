import React from "react";
import ButtonComp from "../../components/Button";
import CardObject from "../../components/CardObject";
import Navbar from "../../components/NavBar";

function HomePage(){
    return(
        <div>
            <Navbar/>
            <h1>
                Home Page
            </h1>
            <CardObject/>
        </div>
    )
}

export default HomePage;