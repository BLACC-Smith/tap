import React, { useEffect, useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import { MainContext } from '../../context/MainContext';
import { auth } from '../../firebase/config';
import Sidebar from '../molecules/Sidebar';
import styled from '@emotion/styled';

const PrivateRoute = ({ children, loggedIn, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				loggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
`;
function AppContainer() {
	const { user, updateUser } = useContext(MainContext);
	const loggedIn = window.localStorage.getItem('uid');

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			updateUser(user);
		});
	}, [updateUser]);

	return (
		<Container>
			<Router>
				<Sidebar loggedIn={loggedIn} />
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute loggedIn={user || loggedIn} path="/">
						<Home />
					</PrivateRoute>
				</Switch>
			</Router>
		</Container>
	);
}

export default AppContainer;
