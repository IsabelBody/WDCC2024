import { useState } from 'react'
import './App.css'
import InfoPage from './Info'
import MapPage from './Map'

function App() {
  const [page, setPage] = useState("/")

  return (<Resolver url={page} setPage={setPage} />)
}

const Resolver = ({ url, setPage }) => {
  if (url === "/") {
    return <MapPage cb={setPage}/>
  } else if (url.split("/")[1] === "info") {
    return <InfoPage galaxy={url.split("/")[2]} cb={setPage} />
  }
}

export default App
