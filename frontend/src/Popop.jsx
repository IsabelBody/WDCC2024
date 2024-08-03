const Popup = ({heading, content, cb}) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>{heading}</h2>
                <p>{content}</p>
                <button type="button" onClick={cb}>Close</button>
            </div>
        </div>
    );
}

export default Popup;