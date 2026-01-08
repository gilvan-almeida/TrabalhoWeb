import React from "react";
import ButtonComp from "../../components/Button";

function HomePage(){
    return(
        <div>
            <h1>
                Home Page
            </h1>
            <ButtonComp
                text="Ola"
                color="red"
                textColor="white"
            />
        </div>
    )
}

export default HomePage;