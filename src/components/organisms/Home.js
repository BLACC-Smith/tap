import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { MainContext } from '../../context/MainContext';
import { auth } from '../../firebase/config';

const Container = styled.div``;
function Home() {
	const { updateUser } = useContext(MainContext);

	const logout = () => {
		updateUser(null);
		window.localStorage.setItem('uid', '');
		auth.signOut();
	};

	return (
		<Container>
			Welcome Home
			<button onClick={logout}>Sign out</button>
		</Container>
	);
}

export default Home;
