import React from "react";

import "./EpisodesListItem.css";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

import { convertHMS } from "../../utils";

const EpisodesListItem = ({ episode, setCurrentEpisode, themeColor }) => {
	const [playerState] = useRecoilState(playerStore);

	const { src: playerSrc, playing, playPause } = playerState;

	const currently_me = episode.enclosure_url === playerSrc;

	function playPauseMe() {
		if (currently_me) {
			playPause();
		} else {
			setCurrentEpisode(episode);
		}
	}

	return (
		<div className="oneEpisode">
			<img
				onClick={playPauseMe}
				src={currently_me && playing ? process.env.PUBLIC_URL + "/" + themeColor + "/pause.svg" : process.env.PUBLIC_URL + "/" + themeColor + "/play.svg"}
				alt={currently_me && playing ? "Mettre en pause" : "Reprendre"}
			/>
			<p className="OneEpTitle">{episode.title}</p>
			<p className="OneEpDuration">{convertHMS(episode.enclosure_duration)}</p>
		</div>
	);
};

export default EpisodesListItem;
