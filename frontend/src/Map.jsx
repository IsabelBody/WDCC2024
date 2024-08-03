import Console from './Console';
import background from './assets/Untitled.png';

const MapPage = ({ cb }) => {
    return (
    <>
        <img className="background" src={background}/>
        <div>Map</div>
        <button onClick={() => cb("/info/milkyway")}>Milky Way</button>
        <Console cb={cb}/>
    </>
    )
    
}

export default MapPage;