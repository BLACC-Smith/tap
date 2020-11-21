import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import SocialButton from '../atoms/SocialButton';
import {
	createUser,
	signInWithGoogle,
	signInWithFacebook,
} from '../../firebase/functions';
import { MainContext } from '../../context/MainContext';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: #ffc000;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Card = styled.div`
	padding: 36px 15%;
	border-radius: 8px;
	box-shadow: 0 0 25px #c8c8c8;
	background: #fff;
	width: 75%;
	max-width: 1000px;
	height: 75%;
	display: flex;
	flex-direction: column;
	position: relative;
`;
const Title = styled.p`
	font-size: 36px;
	font-weight: 600;
	color: #525456;
	text-align: center;
	margin-bottom: 48px;
`;
const OrSection = styled.div`
	display: felx;
	justify-content: center;
	align-items: center;
	margin: 24px 0;
	width: 100%;
`;
const Or = styled.p`
	color: #c8c8c8;
	font-weight: 500;
	font-size: 24px;
	margin: 0 8px;
`;
const Divider = styled.div`
	height: 1px;
	background: #c8c8c8;
	width: 25%;
`;
const Input = styled.input`
	border: 1px solid #c8c8c8;
	border-radius: 8px;
	padding: 12px;
	color: #525456;
	font-size: 16px;
	margin-bottom: 12px;
	text-align: center;
`;
const Icon = styled.i`
	color: #537ea5;
	position: absolute;
	top: 16px;
	right: 16px;
`;
const Button = styled.div`
	padding: 16px;
	background: #537ea5;
	border-radius: 6px;
	margin-top: 24px;
	font-size: 18px;
	color: #fff;
	font-weight: 500;
	letter-spacing: 1.5px;
	text-align: center;
	cursor: pointer;
`;
const Link = styled.p`
	margin-top: 12px;
	text-align: center;
	color: #c8c8c8;
	font-weight: 400;
	text-decoration: underline;
	font-style: italic;
	cursor: pointer;
`;

function Login() {
	let history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user } = useContext(MainContext);

	useEffect(() => {
		user && history.replace('/');
	}, [user, history]);
	return (
		<Container>
			<Card>
				<Icon className="material-icons">lock</Icon>
				<Title>Login</Title>
				<SocialButton isGoogle onClick={signInWithGoogle} />
				<SocialButton onClick={signInWithFacebook} />
				<OrSection>
					<Divider />
					<Or>Or</Or>
					<Divider />
				</OrSection>
				<Input
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button onClick={() => createUser(email, password)}>Login</Button>
				<Link>Don't have an account yet? Click here</Link>
			</Card>
		</Container>
	);
}

export default Login;
