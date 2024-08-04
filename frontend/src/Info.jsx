import axios from 'axios';
import { useEffect, useState } from 'react';

// Import all background images
import background1 from './assets/background1.png';
import background2 from './assets/background2.png';
import background3 from './assets/background3.png';
import background4 from './assets/background4.png';
import background5 from './assets/background5.png';
import background6 from './assets/background6.png';
import background7 from './assets/background7.png';
import background8 from './assets/background8.png';
import Console from './Console';

// Store all backgrounds in an array
const backgrounds = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8
];

const InfoPage = ({ galaxy, cb }) => {
    const [desc, setDesc] = useState("");
    const [background, setBackground] = useState(background1); // Default background

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

    useEffect(() => {
        // Set the background based on a random selection
        const index = Math.floor(Math.random() * backgrounds.length);
        setBackground(backgrounds[index]);
    }, [galaxy]);

    return (
        <>
            <div className="background" style={{ backgroundImage: `url(${background})` }} />
            <div className="panel">
                <h1>{galaxy}</h1>
                <p>{desc}</p>
            </div>
            <Console cb={cb} />
            
            {/* Inline CSS for legibility */}
            <style jsx>{`
                .background {
                    width: 100%;
                    height: 100vh; /* Make the background cover the full viewport height */
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    opacity: 0.5; /* Slightly transparent */
                    background-size: cover; /* Ensure the image covers the entire area */
                    background-position: center; /* Center the image */
                    background-repeat: no-repeat; /* Prevent the image from repeating */
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
