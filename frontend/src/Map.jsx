import Console from './Console';
import background from './assets/Untitled.png';
import { useState } from 'react';

const MapPage = ({ cb }) => {


    const ClickHandler = ({name, hoverText}) => {

        const [isHover, setIsHover] = useState(false)
        
        return (
            <>
            <button className={`galaxyButton ${name}`} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)} onClick={() => cb(`/info/${name}`)}></button>
            {isHover && (<div>{hoverText}</div>)}
            </>
        )
    }
    return (
    <>
        <img className="background" src={background}/>
        <button onClick={() => cb("/info/WDCCxSESA")}>WDCCxSESA</button>
        <ClickHandler name={"WDCCxSESA"} hoverText="WDCCxSESA Galaxy"/>
        <ClickHandler name={"Andromeda"} hoverText="Andromeda Galaxy"/>
        <ClickHandler name={"Draco"} hoverText="Draco Galaxy"/>
        <ClickHandler name={"Phoenix"} hoverText="Phoenix Galaxy"/>
        {/* <ClickHandler name={"Leo"} hoverText="Leo Galaxy"/>
        <ClickHandler name={"Tukana Dwarf"} hoverText="Tukana Dwarf Galaxy"/>
        <ClickHandler name={"Cosmos Redshift7"} hoverText="Cosmos Redshift7 Galaxy"/>
        <ClickHandler name={"Aquarius dwarf"} hoverText="Aquarius dwarf Galaxy"/> */}


        <Console cb={cb}/>
    </>
    )
    
}


 
export default MapPage;