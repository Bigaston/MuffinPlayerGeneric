import React, { useEffect, useState } from "react";


import "./fullLoader.css"

export default function FullLoader({ loading }) {
	let [classList, setClassList] = useState("fullLoad");
	let [isHere, setIsHere] = useState(true)

	useEffect(() => {
		if (!loading) {
			setClassList("fullLoad fadeOut")
			setInterval(() => {
				setClassList("fullLoad");
				setIsHere(false);
			}, 550)
		}
	}, [loading])

	return (
		<>
			{isHere ?
				<div className={classList}>
					<img src={process.env.PUBLIC_URL + "/loader.gif"} alt="Chargement..."></img>
				</div>
				: <></>}

		</>
	)
}