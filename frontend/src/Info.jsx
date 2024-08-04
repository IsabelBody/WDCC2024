// Info.jsx
import axios from 'axios';
import andromeda from './assets/andromeda.png';
import Console from './Console';
import { useEffect, useState } from 'react';

const InfoPage = ({ galaxy, cb }) => {
    const [desc, setDesc] = useState("");

    useEffect(() => {
        const fetchGalaxyInfo = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:5000/galaxy/${galaxy}`);
                setDesc(res.data.description || "Description not available.");
            } catch (error) {
                console.error("Error fetching galaxy data:", error);
                setDesc("Error fetching description.");
            }
        };
        fetchGalaxyInfo();
    }, [galaxy]);

    return (
        <>
            <img className="background" src={andromeda} alt={`${galaxy} image`} />
            <div className="panel">
                <h1>{galaxy}</h1>
                <p>{desc}</p>
            </div>
            <Console cb={cb} />
            
            {/* Inline CSS for legibility */}
            <style jsx>{`
                .background {
                    width: 100%;
                    height: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    opacity: 0.5; /* Slightly transparent */
                }

                .panel {
                    display: inline-block; /* Change from block to inline-block */
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
                    border-radius: 10px;
                    max-width: 100%; /* Ensure it doesn't exceed the viewport width */
                    margin: 50px auto;
                    text-align: center;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                }

                h1 {
                    font-size: 2.5rem;
                    color: #333; /* Dark gray color for better contrast */
                    margin-bottom: 20px;
                }

                p {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: #555; /* Medium gray for better readability */
                }
            `}</style>
        </>
    );
}

export default InfoPage;
