import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { MainContext } from '../../context/MainContext';
import { auth } from '../../firebase/config';
import Header from '../molecules/Header';

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	margin-left: 24px;
`;

function Home() {
	const { updateUser } = useContext(MainContext);

	const logout = () => {
		updateUser(null);
		window.localStorage.setItem('uid', '');
		auth.signOut();
	};

	return (
		<Container>
			<Header />
		</Container>
	);
}

export default Home;
