import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ReactMic } from 'react-mic';
import '../../index.css';

const Container = styled.div`
	width: 50vw;
	height: 50vh;
	background: #fff;
	border-radius: 10px;
	position: absolute;
	top: -50vh;
	left: -50vw;
	transform: scale(${({ show }) => (show ? 1 : 0)});
	transform-origin: bottom right;
	box-shadow: 0 0 15px #c8c8c8;
	transition: all 0.3s;
	padding: 16px;
`;
const Content = styled.div``;
const Title = styled.p`
	font-size: 24px;
	color: #525456;
	font-weight: 600;
	margin-bottom: 48px;
`;
const AudioContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;
const Icon = styled.i`
	font-size: ${({ size }) => size}px;
	color: #c8c8c8;
	cursor: pointer;
`;
const AnswerChoices = styled.div`
	margin-top: 24px;
`;
const AnswerChoice = styled.input`
	border-radius: 6px;
	border: 1px solid #c8c8c8;
	cursor: pointer;
	background: #fff;
	margin-bottom: 8px;
	padding: 12px 16px;
	width: 100%;
`;
const PromptContainer = styled.div`
	border-radius: 6px;
	border: 1px solid #c8c8c8;
	cursor: pointer;
	background: #fff;
	margin-bottom: 8px;
	padding: 12px 16px;
	width: 100%;
	display: ${({ show }) => (show ? 'flex' : 'none')};
	justify-content: flex-start;
	align-items: center;
`;
const SecondaryText = styled.p`
	font-size: 16px;
	color: #c8c8c8;
	font-weight: 400;
	margin-left: 12px;
`;

function AddChallenge({ show }) {
	const [recording, setRecording] = useState(false);
	const [audioURL, setAudioUrl] = useState('');
	const [audio, setAudio] = useState(null);
	const [answerChoices, setAnswerChoices] = useState([]);

	const recordingStopped = (recording) => {
		setAudioUrl(recording.blobURL);
	};
	const playAudio = () => {
		if (audioURL) {
			if (audio?.paused) audio.play();
			else audio.currentTime = 0;
		}
	};
	const clearChallenge = () => {
		setAudioUrl('');
		setAudio(null);
	};

	useEffect(() => {
		!show && clearChallenge();
	}, [show]);

	useEffect(() => {
		audioURL && setAudio(new Audio(audioURL));
	}, [audioURL]);
	return (
		<Container show={show}>
			<Content>
				<Title>New Challenge</Title>
				<AudioContainer>
					<Icon
						size={48}
						className="material-icons"
						onClick={() => setRecording(!recording)}
					>
						{recording ? 'stop_circle' : 'keyboard_voice'}
					</Icon>
					<ReactMic
						record={recording}
						className="sound-wave"
						onStop={recordingStopped}
						strokeColor="#537ea5"
						backgroundColor="#eeeeee"
					/>
					<Icon size={48} className="material-icons" onClick={playAudio}>
						replay
					</Icon>
				</AudioContainer>
				<AnswerChoices>
					{answerChoices.map((item, idx) => (
						<AnswerChoice key={idx} placeholder={`Answer Choice ${idx + 1}`} />
					))}
					<PromptContainer
						show={answerChoices.length < 4}
						onClick={() =>
							answerChoices.length < 4 &&
							setAnswerChoices([...answerChoices, {}])
						}
					>
						<Icon size={24} className="material-icons">
							add
						</Icon>
						<SecondaryText>Add an answer choice</SecondaryText>
					</PromptContainer>
				</AnswerChoices>
			</Content>
		</Container>
	);
}

export default AddChallenge;
