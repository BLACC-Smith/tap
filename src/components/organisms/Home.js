import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from '../molecules/Header';
import AddChallenge from '../molecules/AddChallenge';
import Feed from './Feed';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	margin-left: 24px;
	position: relative;
`;
const AddCTA = styled.div`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	background: #537ea5;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 1px 10px #537ea5;
	cursor: pointer;
	transition: all 0.3s;
	&:hover {
		transform: translateY(-10px);
		box-shadow: 0 5px 25px #537ea5;
	}
`;
const Icon = styled.i`
	font-size: 24px;
	color: #ffc000;
`;
const AddContainer = styled.div`
	position: absolute;
	bottom: 24px;
	right: 24px;
	z-index: 5;
`;
const Underlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: ${({ show }) => (show ? 1 : -1)};
`;

function Home() {
	const [showPopup, setShowPopup] = useState(false);
	return (
		<Container>
			<Header />
			<Underlay
				show={showPopup}
				onClick={() => showPopup && setShowPopup(false)}
			/>
			<AddContainer>
				<AddCTA onClick={() => setShowPopup(true)}>
					<Icon className="material-icons">keyboard_voice</Icon>
				</AddCTA>
				<AddChallenge show={showPopup} closeFn={setShowPopup} />
			</AddContainer>
			<Feed />
		</Container>
	);
}

export default Home;
