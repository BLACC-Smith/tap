import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Challenge from '../molecules/Challenge';
import { getChallenges } from '../../firebase/functions';

const Container = styled.div`
	padding: 12px;
	height: 100%;
`;

const FeedUI = ({ challenges }) => {
	return (
		<Container>
			{challenges.map((item, idx) => (
				<Challenge challenge={item} key={idx} />
			))}
		</Container>
	);
};

const Feed = () => {
	const [challenges, setChallenges] = useState([]);

	useEffect(() => {
		getChallenges(setChallenges);
	}, []);
	return <FeedUI challenges={challenges} />;
};

export default Feed;
