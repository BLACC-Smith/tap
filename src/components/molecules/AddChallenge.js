import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { ReactMic } from 'react-mic';
import { MainContext } from '../../context/MainContext';
import '../../index.css';
import { createChallenge } from '../../firebase/functions';

const Container = styled.div`
	width: 50vw;
	height: 65vh;
	background: #fff;
	border-radius: 10px;
	position: absolute;
	top: -65vh;
	left: -50vw;
	transform: scale(${({ show }) => (show ? 1 : 0)});
	transform-origin: bottom right;
	box-shadow: 0 0 15px #c8c8c8;
	transition: all 0.3s;
	padding: 16px;
`;
const Content = styled.div`
	flex: 1;
	overflow: scroll;
`;
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
	color: ${({ color }) => color};
	cursor: pointer;
	transition: all 0.3s;
`;
const AnswerChoices = styled.div`
	margin-top: 24px;
`;
const AnswerChoice = styled.div`
	border-radius: 6px;
	border: 1px solid ${({ isAnswer }) => (isAnswer ? '#537ea5' : '#c8c8c8')};
	cursor: pointer;
	background: ${({ isAnswer }) => (isAnswer ? '#e7f2f7' : '#fff')};
	margin-bottom: 8px;
	padding: 12px 16px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s;
	${({ isAnswer }) =>
		isAnswer
			? `& i {
		color: #537ea5;
	}
	input {
		background: #e7f2f7;
		color: #537ea5;
	}`
			: ''}
	&:hover {
		background: #e7f2f7;
		border: 1px solid #537ea5;
		& i {
			color: #537ea5;
		}
		input {
			background: #e7f2f7;
			color: #537ea5;
		}
	}
`;
const Input = styled.input`
	color: #525456;
	font-weight: 500;
	fonst-size: 16px;
	width: 50%;
	border: none;
	transition: all 0.3s;
	&::placeholder {
		color: #c8c8c8;
	}
`;
const PromptContainer = styled.div`
	border-radius: 6px;
	cursor: pointer;
	background: #fff;
	margin-bottom: 8px;
	padding: 12px 16px;
	width: 100%;
	display: ${({ show }) => (show ? 'flex' : 'none')};
	justify-content: flex-start;
	align-items: center;
	transition: all 0.3s;
	border: 1px solid #fff;
	&:hover {
		border: 1px solid #c8c8c8;
	}
`;
const SecondaryText = styled.p`
	font-size: 16px;
	color: #c8c8c8;
	font-weight: 400;
	margin-left: 12px;
`;
const ActionsContainer = styled.div`
	margin-top: 32px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	bottom: 16px;
	width: calc(100% - 32px);
	background: #fff;
`;
const Button = styled.div`
	border-radius: 30px;
	border: ${({ color }) => color};
	background: ${({ bg }) => bg};
	padding: 8px 24px;
	font-size: 18px;
	font-weight: 400;
	margin-left: 8px;
	cursor: pointer;
	color: ${({ color }) => color};
`;
const HelperContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background: #eeeeee;
	border-radius: 6px;
	padding: 4px 8px;
	display: ${({ show }) => (show ? 'flex' : 'none')};
`;
const HelperText = styled.p`
	margint-top: 6px;
	color: #525456;
	font-size: 12px;
	font-weight: 400;
	margin-left: 12px;
`;

function AddChallenge({ show, closeFn }) {
	const [recording, setRecording] = useState(false);
	const [audioURL, setAudioUrl] = useState('');
	const [audio, setAudio] = useState(null);
	const [answerChoices, setAnswerChoices] = useState([]);
	const [helperText, setHelperText] = useState('');
	const { user } = useContext(MainContext);

	const recordingStopped = (recording) => {
		setAudioUrl(recording.blobURL);
	};
	const playAudio = () => {
		if (audioURL) {
			if (audio?.paused) audio.play();
			else audio.currentTime = 0;
		}
	};
	const clearChallenge = useCallback(() => {
		setRecording(false);
		setAudioUrl('');
		setAudio(null);
		setAnswerChoices([]);
		setHelperText('');
		closeFn(false);
	}, [closeFn]);

	const removeAnswerChoice = (idx) => {
		setAnswerChoices(
			answerChoices
				.filter((item) => item.id !== idx + 1)
				.map((item, pos) => ({ ...item, id: pos + 1 }))
		);
	};

	const updateAnserChoices = (e, idx) => {
		setAnswerChoices(
			answerChoices.map((item, pos) => {
				if (idx === pos) {
					return { ...item, answer: e.target.value };
				} else return item;
			})
		);
	};
	const markCorrectAnswer = (e, idx) => {
		if (e.target.tagName === 'DIV') {
			setAnswerChoices(
				answerChoices.map((item, pos) => {
					if (idx === pos) {
						return { ...item, isAnswer: true };
					} else return { ...item, isAnswer: false };
				})
			);
		}
	};

	const validateAnswerChoices = () => {
		if (!audioURL) {
			setHelperText('Record yourself before posting this challenge');
			return;
		}
		if (answerChoices.length < 2) {
			setHelperText('You must have at least 2 answer choices');
			return;
		} else {
			if (answerChoices.some((item) => item.isAnswer)) {
				createChallenge({ uid: user.uid, answerChoices, audioURL });
				clearChallenge();
			} else {
				setHelperText('Select the correct answer');
			}
		}
	};

	useEffect(() => {
		!show && clearChallenge();
	}, [show, clearChallenge]);

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
						color="#c8c8c8"
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
					<Icon
						size={48}
						color="#c8c8c8"
						className="material-icons"
						onClick={playAudio}
					>
						replay
					</Icon>
				</AudioContainer>
				<AnswerChoices>
					{answerChoices.map((item, idx) => (
						<AnswerChoice
							isAnswer={item.isAnswer}
							key={idx}
							onClick={(e) => markCorrectAnswer(e, idx)}
						>
							<Input
								placeholder={`Answer Choice ${idx + 1}`}
								value={answerChoices[idx].answer}
								onChange={(e) => updateAnserChoices(e, idx)}
							/>
							<Icon
								size={24}
								color="#c8c8c8"
								className="material-icons"
								onClick={() => removeAnswerChoice(idx)}
							>
								close
							</Icon>
						</AnswerChoice>
					))}
					<PromptContainer
						show={answerChoices.length < 4}
						onClick={() =>
							answerChoices.length < 4 &&
							setAnswerChoices([
								...answerChoices,
								{ id: answerChoices.length + 1, answer: '', isAnswer: false },
							])
						}
					>
						<Icon size={24} color="#c8c8c8" className="material-icons">
							add
						</Icon>
						<SecondaryText>Add an answer choice</SecondaryText>
					</PromptContainer>
				</AnswerChoices>
				<HelperContainer show={helperText}>
					<Icon size={24} color="#537ea5" className="material-icons">
						error_outline
					</Icon>
					<HelperText>{helperText}</HelperText>
				</HelperContainer>
				<ActionsContainer>
					<Button bg="#fff" color="#bdbdbd">
						Cancel
					</Button>
					<Button bg="#537ea5" color="#fff" onClick={validateAnswerChoices}>
						POST
					</Button>
				</ActionsContainer>
			</Content>
		</Container>
	);
}

export default AddChallenge;
