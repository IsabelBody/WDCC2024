// App.jsx
import { useState } from 'react';
import './App.css';
import InfoPage from './Info';
import MapPage from './Map';
import consoleImage from './assets/console.png'; // Import the background image

function App() {
  const [page, setPage] = useState("/");

  const navigateToMap = () => setPage("/map"); // Set page to "/map" to navigate to MapPage

  const HomePage = () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${consoleImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 1, // Ensure it's above other content
      }}
      onClick={navigateToMap}
    >
    </div>
  );

  return (
    <>
      {page === "/" && <HomePage />}
      {page === "/map" && <MapPage cb={setPage} />}
      {page.split("/")[1] === "info" && <InfoPage galaxy={page.split("/")[2]} cb={setPage} />}
    </>
  );
}

export default App;
