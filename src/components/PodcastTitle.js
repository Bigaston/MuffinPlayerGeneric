import React from "react";

const PodcastTitle = ({ currentEpisode, currentPodcast }) => {
	const { enclosure_url } = currentEpisode;

	const { url, title } = currentPodcast;

	return (
		<p id="podtitle">
			<a href={url} target="_parent" alt={"Découvrir le podcast " + title}>
				{title}
			</a>{" "}
			<a href={enclosure_url} target="_parent" alt="Télécharger">
				<img id="download" src={process.env.PUBLIC_URL + "/download.svg"} alt="Télécharger" />
			</a>
		</p>
	);
};

export default PodcastTitle;
