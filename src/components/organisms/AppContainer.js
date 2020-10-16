import React, { useEffect, useContext, useState } from 'react';
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
function AppContainer() {
	const { user, updateUser } = useContext(MainContext);
	const loggedIn = window.localStorage.getItem('uid');

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			updateUser(user);
		});
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<PrivateRoute loggedIn={user || loggedIn} path="/">
					<Home />
				</PrivateRoute>
			</Switch>
		</Router>
	);
}

export default AppContainer;
