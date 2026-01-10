import type { IconType } from "react-icons";
import "./style.css"

interface MainButton{
    text: string,
    href?: string,
    color: string,
    textColor: string,
    icon?: IconType,
    iconColor?: string

}

function ButtonComp({text, href, color, icon: Icon, iconColor, textColor}:MainButton){
    return(
        <a href={href}>
            <div className="boxButton" style={{backgroundColor: color}}>
                {Icon && <Icon size={20} color={iconColor}/>}
                <span style={{color: textColor}}>
                    {text}
                </span>
            </div>
        </a>    
    )
}

export default ButtonComp;