import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
	padding: 48px;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	margin-left: 24px;
	position: relative;

	@media (max-width: 600px) {
		margin: 0;
	}
`;
const Title = styled.p`
    font-size: 24px;
    color:'#525456
`;

const MyChallengesUI = () => {
	return (
		<Container>
			<Title>My Challenges</Title>
		</Container>
	);
};
const MyChallenges = () => {
	return <MyChallengesUI />;
};
export default MyChallenges;
