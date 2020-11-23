import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ challenge }) => {
	const [playing, setPlaying] = useState(false);
	const [waveform, setWaveform] = useState(null);
	useEffect(() => {
		setWaveform(
			WaveSurfer.create({
				container: '#waveform',
				scrollParent: true,
			})
		);
	}, []);
	useEffect(() => {
		if (waveform) {
			console.log('has waveform');
			waveform.load(challenge.audio);
		} else console.log('no waveform yet');
	}, [waveform]);

	const handlePlay = () => {
		setPlaying(!playing);
		waveform.playPause();
	};

	return (
		<div>
			<div id="waveform" />
			<button onClick={handlePlay}>{!playing ? 'Play' : 'Pause'}</button>
		</div>
	);
};

export default Waveform;
