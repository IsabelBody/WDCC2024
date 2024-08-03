import axios from 'axios'
import andromeda from './assets/andromeda.png'
import Console from './Console'
import { useEffect } from 'react';

const InfoPage = ({ galaxy, cb }) => {

    const desc = "Andromeda is a spiral galaxy approximately 2.537 million light-years from Earth, and the nearest major galaxy to the Milky Way. Its name is derived from the area of the sky in which it appears, the constellation of Andromeda."

    useEffect(() => {
        const f = async () => {
            const res = await axios.get(`http://localhost:5000/galaxy/5`);
            console.log(res.data)
        }
        f();
    }, [])

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