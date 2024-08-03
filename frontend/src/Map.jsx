import { useState, useEffect } from "react";
import Console from "./Console";
import background from "./assets/space.png";
import noise from "./assets/noise.png";
import banding from "./assets/banding.png";
import axios from "axios";
import LocationBox from "./Location";
import Popup from "./Popop";
import warning from "./assets/warning.svg";

const locations = {
	andromeda: { x: "620", y: "200", warning: "Solar Flare in Progress" },
	wdcc: { x: "830", y: "400" },
	draco: { x: "200", y: "100" },
	phoenix: { x: "250", y: "500" },
	leo: { x: 50, y: 800 },
	tucana_dwarf: { x: 600, y: 800 },
	cosmic_redshift: { x: 1100, y: 700 },
	aquarius_dwarf: { x: 1100, y: 280 },
};

const numberToGalaxy = {
    7: "andromeda",
    0: "wdcc",
    6: "draco",
    5: "phoenix",
    1: "aquarius_dwarf",
    2: "cosmic_redshift",
    3: "tucana_dwarf",
    4: "leo",
};

const Glitch = ({ time, children }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const random = visible ? Math.random() * time : Math.random() * 200;
        const interval = setTimeout(() => {
            setVisible(!visible);
        }, random);
        return () => clearTimeout(interval);
    }, [visible, time]);

    return visible && children;
};

const Line = ({ x1, y1, x2, y2, offset }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const interval = setTimeout(() => {
            setVisible(true);
        }, offset);
        return () => clearTimeout(interval);
    }, [offset]);

    return (
        visible && (
            <Glitch time={2500}>
                <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    style={{ stroke: "white", strokeWidth: 2 }}
                />
            </Glitch>
        )
    );
};

const Warning = () => {
    return (
        <div className="warningIcon">
            <img alt="warning" src={warning} />
            <span>!</span>
        </div>
    );
};

const MapPage = ({ cb }) => {
	const [target, setTarget] = useState(null);
	const [current, setCurrent] = useState("wdcc");
	const [lines, setLines] = useState([]);
    const [popup, setPopup] = useState(false);
    const [unwanted, setUnwanted] = useState([]);

    const ClickHandler = ({ name, hoverText }) => {
        const [isHover, setIsHover] = useState(false);
        return (
            <>
                <div
                    style={{
                        position: "absolute",
                        left: `${locations[name].x - 45}px`,
                        top: `${locations[name].y - 45}px`,
                    }}
                >
                    <button
                        type="button"
                        className={`galaxyButton ${name} ${
                            current === name ? "current" : ""
                        }`}
                        onMouseLeave={() => setIsHover(false)}
                        onMouseEnter={() => setIsHover(true)}
                        onClick={() => cb(`/info/${name}`)}
                    />
                    <div
                        className="label"
                        style={{
                            textAlign: "center",
                            marginTop: "5px",
                            color: "white",
                        }}
                    >
                        {name}
                    </div>
                    {locations[name].warning && <Warning />}
				</div>
            </>
        );
    };

	useEffect(() => {
		const f = async () => {
			if (!target) return;
			await axios.post("http://localhost:5000/select-galaxy", {
				name: target,
			});
			const res = await axios.post("http://localhost:5000/shortest-path", { unwanted: [] });
			if (res.data.total_cost > 1000 ) {
				setPopup(<Popup heading="Route Warnings" content="We can't find an alternative route" cb={() => setPopup(false)} />);
				return;
			}
			console.log(res.data.path.map((x) => numberToGalaxy[x]));
			const lines = [];
			const warnings = [];
			for (let i = 0; i < res.data.path.length - 1; i++) {
				const from = locations[numberToGalaxy[res.data.path[i]]];
				const to = locations[numberToGalaxy[res.data.path[i + 1]]];
				if (to.warning) { warnings.push(to.warning); }
				lines.push(
					<Line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} offset={(i + 1) * 1000} />,
				);
			}
			setLines(lines);
			if (warnings.length) {
				setPopup(<Popup heading="Route Warnings" content={warnings.join(", ")} cb={() => setPopup(false)} />);
			}
		};
		f();
	}, [target]);

    const travel = async () => {
        await axios.post("http://localhost:5000/travel");
        setCurrent(target);
        setTarget(null);
        setLines([]);
    };

    return (
        <>
            <img className="background" src={background} alt="background" />
            <div className="canvas">
                <svg width="100%" height="100%">
                    {lines}
                </svg>
                {Object.entries(locations).map((location, i) => (
                    <ClickHandler
                        key={i}
                        name={location[0]}
                        hoverText={location[0]}
                    />
                ))}
            </div>
            <Glitch time={10000}>
                <div className="leftside">
                    <div className="sidebox">
                        <h3>Current conditions:</h3>
                        <p>Life Support Systems: Active</p>
                        <p>Power Levels: High</p>
                        <p>Hull Integrity: OK</p>
                        <p>Engine Status: Cruising</p>
                    </div>
                    <LocationBox location={current} />
                </div>
            </Glitch>
            {target && (
                <Glitch time={10000}>
                    <div className="rightside">
                        <LocationBox location={target} target={true} />
                        <div className="sidebox">
                            <h3>Flight Path:</h3>
                            <p>{"> Leo"}</p>
                            <p>{"> Andromeda"}</p>
                        </div>
                        <div className="sidebox">
                            <p>{`Type "travel" to navigate`}</p>
                        </div>
                    </div>
                </Glitch>
            )}
            {popup}
            <Console cb={cb} path={setTarget} travel={travel} />
            <img className="foreground" src={noise} alt="background" />
            <img
                className="foreground"
                src={banding}
                alt="background"
                style={{ opacity: 0.6 }}
            />
        </>
    );
};

export default MapPage;
