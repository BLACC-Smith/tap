import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
	width: 100%;
	border: 1px solid;
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
const ChallengeUI = ({ challenge }) => {
	const [audio, setAudio] = useState(null);
	const avi =
		'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640';

	useEffect(() => {
		setAudio(new Audio(challenge.audio));
	}, []);

	const playAudio = () => {
		if (audio?.paused) audio.play();
		else audio.currentTime = 0;
	};
	return (
		<Container>
			<Image src={avi} />
			<Icon
				size={48}
				color="#537ea5"
				className="material-icons"
				onClick={playAudio}
			>
				play_circle
			</Icon>
		</Container>
	);
};

const Challenge = ({ challenge }) => {
	return <ChallengeUI challenge={challenge} />;
};

export default Challenge;
