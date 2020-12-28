import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { MainContext } from '../../context/MainContext';
import tapLogo from '../../assets/tapLogo_D.jpg';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';

const Container = styled.div`
	height: 100%;
	width: 15%;
	min-width: 200px;
	background: #fff;
	box-shadow: 0 0 25px #c8c8c8;
	border-radius: 0 16px 16px 0;
	display: flex;
	padding: 24px 0 0 0;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	z-index: 10;

	@media (max-width: 600px) {
		height: 10%;
		width: 100%;
		position: absolute;
		bottom: 0;
		padding: 0;
		border-radius: 16px 16px 0 0;
	}
`;
const IconWrapper = styled.div`
	flex: 1;
	cursor: pointer;
`;
const Icon = styled.i`
	color: ${({ active }) => (active ? '#ffc000' : '#c8c8c8')};
	font-size: 32px;
`;
const NavContainer = styled.div`
	flex: 3;
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;

	@media (max-width: 600px) {
		flex: 1;
		justify-items: center;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
`;
const LogoContainer = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 600px) {
		display: none;
	}
`;
const Logo = styled.img`
	height: 35px;
	width: auto;
	obkect-fit: contain;
	margin: 0 0 48px -6px;
`;
const AccountInfo = styled.div`
	flex: 1;
	width: 100%;
	padding: 24px;
	display: flex;
	justify-content: center;
	align-items: flex-end;

	@media (max-width: 600px) {
		display: none;
	}
`;
const Logout = styled.div`
	padding: 12px;
	border-radius: 16px;
	background: #eeeeee;
	color: #9e9e9e;
	width: 100%;
	text-align: center;
	cursor: pointer;
`;

function Sidebar() {
	const { user, updateUser } = useContext(MainContext);

	const logout = () => {
		updateUser(null);
		window.localStorage.setItem('uid', '');
		auth.signOut();
	};
	return user ? (
		<Container>
			<LogoContainer>
				<Logo src={tapLogo} />
			</LogoContainer>
			<NavContainer>
				<IconWrapper>
					<Link to="/home">
						<Icon active className="material-icons">
							home
						</Icon>
					</Link>
				</IconWrapper>
				<IconWrapper>
					<Link to="/my-challenges">
						<Icon className="material-icons">dashboard</Icon>
					</Link>
				</IconWrapper>
				<IconWrapper>
					<Link to="/account">
						<Icon className="material-icons">person</Icon>
					</Link>
				</IconWrapper>
			</NavContainer>
			<AccountInfo>
				<Logout onClick={logout}>Logout</Logout>
			</AccountInfo>
		</Container>
	) : null;
}

export default Sidebar;
