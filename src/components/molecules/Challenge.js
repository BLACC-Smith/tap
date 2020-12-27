import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WaveSurfer from 'wavesurfer.js';
import '../../index.css';
import { MainContext } from '../../context/MainContext';
import { updatePlayedChallenges } from '../../firebase/functions';

const Container = styled.div`
	background: #fff;
	height: 100%;
	width: 375px;
	max-height: 65vh;
	box-shadow: 0 0 10px rgba(200, 200, 200, 0.35);
	border-radius: 16px;
	padding: 16px 0;
	position: absolute;
	margin-bottom: 24px;
	display: grid;
	grid-template-rows: 1fr 1fr;
	align-items: center;
	${({ remove }) =>
		remove
			? `
		animation-name: hide-left;
		animation-duration: .5s;
		animation-fill-mode: forwards;
		`
			: ''}
	${({ answeredCorrectly }) =>
		answeredCorrectly
			? `
		animation-name: hide-right;
		animation-duration: .5s;
		animation-fill-mode: forwards;
		`
			: ''}
`;
const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	position: absolute;
	top: 12px;
	left: 12px;
`;
const IconWrapper = styled.div`
	background: #fff;
	border-radius: 50%;
	z-index: 5;
	height: ${({ main }) => (main ? '50' : '35')}px;
	width: ${({ main }) => (main ? '50' : '35')}px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: ${({ main }) => (main ? 'pointer' : 'none')};
	background: ${({ bg }) => bg};
	transition: all 0.3s;
`;
const Icon = styled.i`
	font-size: ${({ main }) => (main ? '32' : '24')}px;
	color: #fff;
`;
const Waveform = styled.div`
	width: 100%;
	padding: 8px 24px;
	position: relative;
	z-index: 1;
`;
const ActionsContainer = styled.div`
	position: absolute;
	bottom: -24px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const AnswersContainer = styled.div`
	transition: all 0.3s;
	max-height: ${({ show }) => (show ? '25vh' : '0')};
	margin-top: ${({ show }) => (show ? '24px' : '0')};
	opacity: ${({ show }) => (show ? 1 : 0)};
	overflow: hidden;
	display: grid;
	grid-template-rows: 1fr;
	row-gap: 16px;
`;
const Answer = styled.p`
	border: 1px solid;
	padding: 16px;
	border-radius: 30px;
	cursor: pointer;
	padding: 12px 16px;
	width: 75%;
	margin: auto;
	transition: all 0.3s;
	color: #bdbdbd;
	border: 1px solid #bdbdbd;
	font-size: 16px;
	line-height: 24px;
	position: relative;
	text-align: center;

	${({ showCorrect }) =>
		showCorrect
			? `
			border-radius: 30px;
			background:#4CAF50;
			border:0;
			color: #fff;
		`
			: `
			&:hover {
				background: #e7f2f7;
				border: 1px solid #537ea5;
				color: #537ea5;
			}
			i {
				right: 0;
			}
		`}
	${({ animateWrong }) =>
		animateWrong
			? `
		animation-name: shake;
		animation-duration: .5s
		`
			: ''}
`;

const ChallengeUI = ({
	challenge,
	handlePlay,
	checkAnswer,
	removeChallenge,
	numChances,
	isPlaying,
	selectedId,
	answeredCorrectly,
	answeredIncorrectly,
}) => {
	const avi =
		'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640';

	return (
		<Container remove={removeChallenge} answeredCorrectly={answeredCorrectly}>
			<Image src={avi} />
			<ActionsContainer>
				<IconWrapper bg={numChances > 1 ? 'red' : '#bdbdbd'}>
					<Icon className="material-icons">close</Icon>
				</IconWrapper>
				<IconWrapper bg="#537ea5" main remove={false}>
					<Icon main className="material-icons" onClick={handlePlay}>
						{isPlaying ? 'pause' : 'play_arrow'}
					</Icon>
				</IconWrapper>
				<IconWrapper bg="#bdbdbd" remove={false}>
					<Icon className="material-icons">check</Icon>
				</IconWrapper>
			</ActionsContainer>
			<Waveform id={`waveform-${challenge.storageId}`}></Waveform>
			<AnswersContainer show>
				{challenge.answerChoices.map((el) => (
					<Answer
						key={el.id}
						onClick={() => checkAnswer(el.id)}
						showCorrect={el.isAnswer && answeredCorrectly}
						animateWrong={
							selectedId === el.id && !el.isAnswer && answeredIncorrectly
						}
					>
						{el.answer}
					</Answer>
				))}
			</AnswersContainer>
		</Container>
	);
};

const Challenge = ({ challenge, updateChallenges }) => {
	const { user } = useContext(MainContext);
	const [waveform, setWaveform] = useState(null);
	const [numChances, setNumChances] = useState(0);
	const [selectedId, setSelectedId] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);
	const [removeChallenge, setRemoveChallenge] = useState(false);

	useEffect(() => {
		if (numChances > 1) {
			setRemoveChallenge(true);
			waveform.pause();
			setTimeout(() => {
				updateChallenges(challenge.id);
				updatePlayedChallenges(user.uid, challenge.id);
			}, 650);
		}
	}, [numChances, updateChallenges, challenge.id]);

	useEffect(() => {
		waveform && waveform.load(challenge.audio);
	}, [waveform, challenge.audio]);

	useEffect(() => {
		if (waveform) {
			waveform.on('finish', () => setIsPlaying(false));
			waveform.on('seek', () => {
				waveform.play();
				setIsPlaying(true);
			});
		}
	});

	useEffect(() => {
		setWaveform(
			WaveSurfer.create({
				container: `#waveform-${challenge.storageId}`,
				scrollParent: true,
				barWidth: 7,
				cursorWidth: 1,
				backend: 'WebAudio',
				height: 100,
				progressColor: '#537ea5',
				responsive: true,
				waveColor: 'rgba(83,126,165,.25)',
				barHeight: 35,
				cursorColor: 'transparent',
				barRadius: 10,
				backgroundColor: '#fff',
			})
		);
	}, [challenge.storageId]);
	const handlePlay = () => {
		if (isPlaying) {
			waveform.pause();
			setIsPlaying(false);
		} else {
			waveform.play();
			setIsPlaying(true);
		}
	};
	const checkAnswer = (idx) => {
		if (challenge.answerChoices[idx - 1].isAnswer) {
			setAnsweredCorrectly(true);
			setTimeout(() => {
				updateChallenges(challenge.id);
				updatePlayedChallenges(user.uid, challenge.id);
			}, 650);
		} else {
			setSelectedId(idx);
			if (numChances === 2) {
				setNumChances(numChances + 1);
				return;
			}
			setAnsweredIncorrectly(true);
			setNumChances(numChances + 1);
			setTimeout(() => {
				setAnsweredIncorrectly(false);
			}, 500);
		}
	};
	return (
		<ChallengeUI
			waveform={waveform}
			challenge={challenge}
			setIsPlaying={setIsPlaying}
			checkAnswer={checkAnswer}
			handlePlay={handlePlay}
			selectedId={selectedId}
			removeChallenge={removeChallenge}
			updateChallenges={updateChallenges}
			numChances={numChances}
			isPlaying={isPlaying}
			answeredCorrectly={answeredCorrectly}
			answeredIncorrectly={answeredIncorrectly}
		/>
	);
};

export default Challenge;
