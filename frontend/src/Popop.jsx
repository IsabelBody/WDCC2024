const Popup = ({cb}) => {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Popup heading</h2>
                <p>Popup content</p>
                <button type="button" onClick={cb}>Close</button>
            </div>
        </div>
    );
}

export default Popup;