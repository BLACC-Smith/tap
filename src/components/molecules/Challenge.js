import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WaveSurfer from 'wavesurfer.js';

const Container = styled.div`
	width: 100%;
	box-shadow: 0 5px 10px rgba(200, 200, 200, 0.35);
	border-radius: 16px;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24px;
`;
const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
`;
const Icon = styled.i`
	font-size: ${({ size }) => size}px;
	color: ${({ color }) => color};
	cursor: pointer;
	transition: all 0.3s;
`;
const Waveform = styled.div`
	width: 100%;
	margin: 0 24px;
`;

const ChallengeUI = ({ challenge }) => {
	const [waveform, setWaveform] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const avi =
		'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640';

	const handlePlay = () => {
		if (isPlaying) {
			waveform.pause();
			setIsPlaying(false);
		} else {
			waveform.play();
			setIsPlaying(true);
		}
	};
	useEffect(() => {
		setWaveform(
			WaveSurfer.create({
				container: `#waveform-${challenge.storageId}`,
				scrollParent: true,
				barWidth: 5,
				cursorWidth: 1,
				backend: 'WebAudio',
				height: 50,
				progressColor: '#537ea5',
				responsive: true,
				waveColor: 'rgba(83,126,165,.25)',
				barHeight: 30,
				cursorColor: 'transparent',
			})
		);
	}, []);
	useEffect(() => {
		waveform && waveform.load(challenge.audio);
	}, [waveform]);
	useEffect(() => {
		if (waveform) {
			waveform.on('finish', () => setIsPlaying(false));
			waveform.on('seek', () => {
				waveform.play();
				setIsPlaying(true);
			});
		}
	});
	return (
		<Container>
			<Image src={avi} />
			<Waveform id={`waveform-${challenge.storageId}`} />
			<Icon
				size={48}
				color="#537ea5"
				className="material-icons"
				onClick={handlePlay}
			>
				{isPlaying ? 'pause_circle' : 'play_circle'}
			</Icon>
		</Container>
	);
};

const Challenge = ({ challenge }) => {
	return <ChallengeUI challenge={challenge} />;
};

export default Challenge;
