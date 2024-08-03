const LocationBox = ({ location, target = false }) => {
    return (
        <div className="sidebox locationbox">
            <span>{target ? "Navigating To" :"Currently At:"}</span>
            <h1>{location}</h1>
            <span>{`Type "info ${location}" for more...`}</span>
        </div>
    )
}

export default LocationBox;