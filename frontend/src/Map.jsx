import { useState, useEffect } from "react";
import Console from "./Console";
import background from "./assets/Untitled.png";
import axios from "axios";
import LocationBox from "./Location";

const locations = {
	andromeda: { x: "620", y: "200" },
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

const Line = ({ x1, y1, x2, y2 }) => {
	return (
		<line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }}
		/>
	);
};

const MapPage = ({ cb }) => {
	const [target, setTarget] = useState(null);
    const [current, setCurent] = useState("wdcc");
	const [lines, setLines] = useState([]);

	const ClickHandler = ({ name, hoverText }) => {
		const [isHover, setIsHover] = useState(false);
		return (
			<>
				<button
					type="button"
					className={`galaxyButton ${name}`}
					style={{
						left: `${locations[name].x - 45}px`,
						top: `${locations[name].y - 45}px`,
					}}
					onMouseLeave={() => setIsHover(false)}
					onMouseEnter={() => setIsHover(true)}
					onClick={() => cb(`/info/${name}`)}
				/>
				{isHover && <div className={"hoverText"}>{hoverText}</div>}
			</>
		);
	};

	useEffect(() => {
		const f = async () => {
			await axios.post("http://localhost:5000/select-galaxy", {
				name: target,
			});
			const res = await axios.get("http://localhost:5000/shortest-path");
			console.log(res.data.path.map((x) => numberToGalaxy[x]));
			const lines = [];
			for (let i = 0; i < res.data.path.length - 1; i++) {
				const from = locations[numberToGalaxy[res.data.path[i]]];
				const to = locations[numberToGalaxy[res.data.path[i + 1]]];
				lines.push(
					<Line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />,
				);
			}
			setLines(lines);
		};
		f();
	}, [target]);

	return (
		<>
			<img className="background" src={background} alt="background" />
			<div className="canvas">
				<svg width="100%" height="100%">
					{lines}
				</svg>
				{Object.entries(locations).map((location, i) => (
					<ClickHandler key={i} name={location[0]} hoverText={location[0]} />
				))}
			</div>
            <div className="leftside">
                <div className="sidebox">
                    <h3>Current conditions:</h3>
                    <p>Life Support Systems: Active</p>
                    <p>Power Levels: High</p>
                    <p>Hull Integrity: OK</p>
                    <p>Engine Status: Cruising</p>
                </div>
                <LocationBox location={current}/>
            </div>
            {target && 
            <div className="rightside">
                <LocationBox location={target} target={true}/>
                <div className="sidebox">
                    <h3>Flight Path:</h3>
                    <p>{"> Leo"}</p>
                    <p>{"> Andromeda"}</p>
                </div>
            </div>}
			{/* <ClickHandler name={"Leo"} hoverText="Leo Galaxy"/>
            <ClickHandler name={"Tukana Dwarf"} hoverText="Tukana Dwarf Galaxy"/>
            <ClickHandler name={"Cosmos Redshift7"} hoverText="Cosmos Redshift7 Galaxy"/>
            <ClickHandler name={"Aquarius dwarf"} hoverText="Aquarius dwarf Galaxy"/> */}

			<Console cb={cb} path={setTarget}/>
		</>
	);
};

export default MapPage;
