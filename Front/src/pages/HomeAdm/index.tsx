import { useState } from "react";
import NavBarAdm from "../../components/NavBarAdm";
import Sidebar from "../../components/Sidebar";


function HomeAdmPage(){

    const [menuOpen, setMenuOpen] = useState(false)


    return(
        <div>
            <NavBarAdm
                openMenu={()=> setMenuOpen(true)}
            />
            <Sidebar
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
            
        </div>
    )
}

export default HomeAdmPage;