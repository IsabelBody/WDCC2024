import { useState, useEffect } from 'react';
import Console from './Console';
import background from './assets/Untitled.png';
import axios from 'axios';



const locations = {
    andromeda : {x:"620px", y:"640px"},
    wDCCxSESA : {x: "830px", y:"370px"},
    draco : {x:"380px", y:"640px"},
    phoenix : {x: "380px", y:"340px" },
}


const MapPage = ({ cb }) => {
    const [path, setPath] = useState([])
    
    const ClickHandler = ({name, hoverText}) => {
        const [isHover, setIsHover] = useState(false)
        return (
            <>
                <div className="buttonWrapper">
                    <button className={`galaxyButton ${name}`} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)} onClick={() => cb(`/info/${name}`)}></button>
                    {isHover && (<div className={`hoverText`}>{hoverText}</div>)}
                </div>
                
            </>
        )
    }

    useEffect(() => {
        const f = async () => {
            await axios.post("http://localhost:5000/select-galaxy", { node: 5 });
            const res = await axios.get("http://localhost:5000/shortest-path");
            console.log(res.data.path)
        }
        f();
    }, [path])

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