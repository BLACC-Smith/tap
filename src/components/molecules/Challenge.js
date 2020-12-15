import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WaveSurfer from 'wavesurfer.js';
import '../../index.css';

const Container = styled.div`
	width: 100%;
	box-shadow: 0 5px 10px rgba(200, 200, 200, 0.35);
	border-radius: 16px;
	padding: 16px;
	margin-bottom: 24px;
`;
const Preview = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	opacity: ${({ show }) => (show ? 1 : 0)};
	${({ absolute }) =>
		absolute ? 'position: absolute;top:12px;right:24px;' : ''}
`;
const Waveform = styled.div`
	width: 100%;
	margin: 0 24px;
`;
const AnswersContainer = styled.div`
	transition: all 0.3s;
	max-height: ${({ show }) => (show ? '25vh' : '0')};
	margin-top: ${({ show }) => (show ? '24px' : '0')};
	opacity: ${({ show }) => (show ? 1 : 0)};
	overflow: hidden;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	justify-items: center;
`;
const Answer = styled.p`
	border: 1px solid;
	padding: 16px;
	border-radius: 6px;
	cursor: pointer;
	padding: 12px 16px;
	width: 75%;
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

const ChallengeUI = ({ challenge }) => {
	const [waveform, setWaveform] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showAnswers, setShowAnswers] = useState(false);
	const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false);

	const avi =
		'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640';

	const handlePlay = () => {
		if (isPlaying) {
			waveform.pause();
			setIsPlaying(false);
			setShowAnswers(false);
		} else {
			waveform.play();
			setIsPlaying(true);
			setShowAnswers(true);
		}
	};
	const checkAnswer = (idx) => {
		if (challenge.answerChoices[idx].isAnswer) setAnsweredCorrectly(true);
		else {
			setAnsweredIncorrectly(true);
			setTimeout(() => {
				setAnsweredIncorrectly(false);
			}, 500);
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
	}, [challenge.storageId]);

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
	return (
		<Container>
			<Preview>
				<Image src={avi} />
				<Waveform id={`waveform-${challenge.storageId}`} />
				<Icon
					size={48}
					color="#537ea5"
					className="material-icons"
					onClick={handlePlay}
					show
				>
					{isPlaying ? 'pause_circle' : 'play_circle'}
				</Icon>
			</Preview>
			<AnswersContainer show={showAnswers}>
				{challenge.answerChoices.map((el, idx) => (
					<Answer
						key={idx}
						onClick={() => checkAnswer(idx)}
						showCorrect={el.isAnswer && answeredCorrectly}
						animateWrong={!el.isAnswer && answeredIncorrectly}
					>
						{el.answer}
						<Icon
							show={answeredCorrectly}
							absolute
							size={24}
							color="#fff"
							className="material-icons"
						>
							check_circle
						</Icon>
					</Answer>
				))}
			</AnswersContainer>
		</Container>
	);
};

const Challenge = ({ challenge }) => {
	return <ChallengeUI challenge={challenge} />;
};

export default Challenge;
