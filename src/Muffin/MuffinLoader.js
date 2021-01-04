import axios from "axios";
import config from "../config.json"
import React, { useEffect, useState } from "react";

import { toSeconds } from "../utils"

import FullLoader from "./fullLoader"

const MuffinLoader = ({ guid, PlayerComponent }) => {
	const [currentEpisode, setCurrentEpisode] = useState();
	const [currentPodcast, setCurrentPodcast] = useState();
	const [episodesList, setEpisodeList] = useState();
	const [loading, setLoading] = useState(true);
	const [displayEpList, setDisplayEpList] = useState(true);
	const [themeColor, setThemeColor] = useState("white");

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.get("hide_list") !== null) { setDisplayEpList(false) }
		if (urlParams.get("theme") !== null) {
			if (urlParams.get("theme") === "white") {
				setThemeColor("white")
			} else if (urlParams.get("theme") === "black") {
				setThemeColor("black")
			} else {
				setThemeColor("white")
			}
		}

		let url = decodeURIComponent(urlParams.get("playlist"));

		url = config.cors + url

		axios({
			method: "GET",
			url: url
		}).then(res => {
			if (res.status === 200) {
				let episode = res.data.episodes[0];
				setCurrentEpisode({
					_id: 0,
					cover: { medium_url: episode.img },
					enclosure_duration: toSeconds(episode.duration),
					enclosure_url: episode.audio_url,
					title: episode.title,
					url: episode.url
				});

				setCurrentPodcast({
					title: res.data.title,
					url: res.data.url,
				});

				let list = [];
				res.data.episodes.forEach((ep, index) => {
					let ep_obj = {
						_id: index,
						cover: { medium_url: ep.img },
						enclosure_duration: toSeconds(ep.duration),
						enclosure_url: ep.audio_url,
						title: ep.title,
						url: ep.url
					}

					list.push(ep_obj)
				})
				setEpisodeList(list);

				setInterval(() => {
					setLoading(false);

				}, 200)
			}
		}).catch(err => {
			console.log(err);
		})
	}, []);

	return (
		<>
			<FullLoader loading={loading} />

			{loading ? <></>
				:
				<PlayerComponent
					currentEpisode={currentEpisode}
					currentPodcast={currentPodcast}
					episodesList={episodesList}
					setCurrentEpisode={setCurrentEpisode}
					displayEpList={displayEpList}
					themeColor={themeColor}
				/>
			}
		</>
	)
};

export default MuffinLoader;
