import andromeda from './assets/andromeda.png'
import Console from './Console'

const InfoPage = ({ galaxy, cb }) => {

    const desc = "Andromeda is a spiral galaxy approximately 2.537 million light-years from Earth, and the nearest major galaxy to the Milky Way. Its name is derived from the area of the sky in which it appears, the constellation of Andromeda."

    return (
    <>
        <img className="background" src={andromeda}/>
        <div className="panel">
            <h1>{galaxy}</h1>
            <p>{desc}</p>
        </div>
        <button onClick={() => cb("/")}>Back</button>
        <Console cb={cb}/>
    </>
    )
    
}

export default InfoPage