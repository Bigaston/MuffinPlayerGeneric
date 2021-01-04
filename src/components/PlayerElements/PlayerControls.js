import React from "react";

import playerStore from "../../stores/player";
import { useRecoilState } from "recoil";

import "./PlayerControls.css";

import classNames from "classnames";
import config from "../../config.json"

const PlayerControls = ({ episodesListLoading, showEpisodesListButtonFn, displayEpList, themeColor }) => {
	const [playerState] = useRecoilState(playerStore);

	const { playing, seeking, loading, minus15, playPause, plus15 } = playerState;

	const hasShowEpisodesListButtonFn =
		typeof showEpisodesListButtonFn === "function";

	return (
		<div className="controls">
			<img src={process.env.PUBLIC_URL + "/" + themeColor + "/backward.svg"} alt="-15s" onClick={minus15} />
			<img
				id="playButton"
				src={playing ? process.env.PUBLIC_URL + "/" + themeColor + "/pause.svg" : process.env.PUBLIC_URL + "/" + themeColor + "/play.svg"}
				alt={playing ? "Pause" : "Play"}
				style={{ opacity: seeking || loading ? 0.2 : 1 }}
				className={classNames("pulse-animation", { on: seeking || loading })}
				onClick={playPause}
			/>
			<img src={process.env.PUBLIC_URL + "/" + themeColor + "/forward.svg"} alt="+15s" onClick={plus15} />
			{(episodesListLoading || hasShowEpisodesListButtonFn) && displayEpList ? (
				<img
					src={process.env.PUBLIC_URL + "/" + themeColor + "/list.svg"}
					alt="Liste des épisodes"
					className={classNames("pulse-animation", { on: episodesListLoading })}
					onClick={() => episodesListLoading ?? showEpisodesListButtonFn()}
				/>
			) : null}
		</div>
	);
};

export default PlayerControls;
