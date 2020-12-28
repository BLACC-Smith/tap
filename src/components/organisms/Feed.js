import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Challenge from '../molecules/Challenge';
import { getChallenges, getUser } from '../../firebase/functions';
import { auth } from '../../firebase/config';

const Container = styled.div`
	padding: 12px;
	height: 90%;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		padding-bottom: 10vh;
	}
`;

const FeedUI = ({ challenges, updateChallenges, user }) => {
	return !user ? null : (
		<Container>
			{challenges
				.filter((el) => !user.playedChallenges.includes(el.id))
				.map((item) => (
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
	const [user, setUser] = useState('');

	const updateChallenges = (id) => {
		setChallenges(challenges.filter((el) => el.id !== id));
	};
	const getPlayedChallenges = async () => {
		const data = await getUser(auth.currentUser.uid);
		setUser(data);
	};
	useEffect(() => {
		getChallenges(setChallenges);
		getPlayedChallenges();
	}, []);
	return (
		<FeedUI
			challenges={challenges}
			updateChallenges={updateChallenges}
			user={user}
		/>
	);
};

export default Feed;
