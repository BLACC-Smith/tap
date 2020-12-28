import React, { useEffect, useState, useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Login from './Login';
import { MainContext } from '../../context/MainContext';
import { auth } from '../../firebase/config';
import Sidebar from '../molecules/Sidebar';
import styled from '@emotion/styled';
import ClipLoader from 'react-spinners/ClipLoader';
import loadable from '@loadable/component';

const LoadingWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const fallback = (
	<LoadingWrapper>
		<ClipLoader size={150} color={'#537ea5'} loading />
	</LoadingWrapper>
);
const Home = loadable(() => import('./Home'), { fallback });
const MyChallenges = loadable(() => import('./MyChallenges'), { fallback });
const Account = loadable(() => import('./Account'), { fallback });

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
	justify-content: center;
	align-items: center;
`;

function AppContainer() {
	const { user, updateUser } = useContext(MainContext);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		auth.onAuthStateChanged((user) => {
			updateUser(user);
			setLoading(false);
		});
	}, [updateUser]);

	return (
		<Container>
			{loading ? (
				<ClipLoader size={150} color={'#537ea5'} loading={loading} />
			) : (
				<Router>
					<Sidebar />
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/my-challenges">
							<MyChallenges />
						</Route>
						<Route path="/account">
							<Account />
						</Route>
						<PrivateRoute loggedIn={user} path="/">
							<Home />
						</PrivateRoute>
					</Switch>
				</Router>
			)}
		</Container>
	);
}

export default AppContainer;
