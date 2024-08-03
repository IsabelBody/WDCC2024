const InfoPage = ({ galaxy, cb }) => {
    return (
    <>
        {galaxy}
        <button onClick={() => cb("/")}>Back</button>
    </>
    )
    
}

export default InfoPage