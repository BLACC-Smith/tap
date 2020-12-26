import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Challenge from '../molecules/Challenge';
import { getChallenges } from '../../firebase/functions';

const Container = styled.div`
	padding: 12px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FeedUI = ({ challenges, updateChallenges }) => {
	return (
		<Container>
			{challenges.map((item) => (
				<Challenge
					updateChallenges={updateChallenges}
					challenge={item}
					key={item.id}
				/>
			))}
		</Container>
	);
};

const Feed = () => {
	const [challenges, setChallenges] = useState([]);

	const updateChallenges = (id) => {
		setChallenges(challenges.filter((el) => el.id !== id));
	};
	useEffect(() => {
		getChallenges(setChallenges);
	}, []);
	return <FeedUI challenges={challenges} updateChallenges={updateChallenges} />;
};

export default Feed;
