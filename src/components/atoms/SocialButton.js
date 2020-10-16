import React from 'react';
import styled from '@emotion/styled';
import googleLogo from '../../assets/googleLogo.png';
import facebookLogo from '../../assets/facebookLogo.png';

const Container = styled.div`
	position: relative;
	margin-top: 12px;
	width: 100%;
	border-radius: 6px;
	padding: 16px;
	display: flex;
	align-items: center;
	cursor: pointer;
	background: ${({ isGoogle }) => (isGoogle ? '#dd4d3f' : '#0075fb')};
`;
const Logo = styled.img`
	height: 35px;
	width: auto;
	object-fit: contain;
`;
const Label = styled.p`
	font-weight: 400;
	color: #fff;
	font-size: 18px;
	line-height: 18px;
	text-align: center;
	flex: 1;
	margin-left: -35px;
`;

function SocialButton({ onClick, isGoogle = false }) {
	return (
		<Container isGoogle={isGoogle} onClick={onClick}>
			<Logo src={isGoogle ? googleLogo : facebookLogo} />
			<Label>Continue with {isGoogle ? 'Google' : 'Facebook'}</Label>
		</Container>
	);
}

export default SocialButton;
