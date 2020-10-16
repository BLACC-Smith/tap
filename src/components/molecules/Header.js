import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
	height: 10%;
	width: 100%;
	background: #fff;
	padding: 16px;
	display: flex;
	justify-content: center;
`;

const SearchbarContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 4px 16px;
	border: 1px solid #c8c8c8;
	border-radius: 8px;
	width: 100%;
	max-width: 750px;
`;
const Icon = styled.i`
	color: #525456;
	font-size: 24px;
	cursor: pointer;
	margin-right: 12px;
`;
const Searchbar = styled.input`
	height: 50px;
	font-size: 20px;
	color: #525456;
	border: none;
	font-weight: 300;
	flex: 1;
`;

function Header() {
	return (
		<Container>
			<SearchbarContainer>
				<Icon className="material-icons">search</Icon>
				<Searchbar placeholder="Search for a username, genre, or artist" />
			</SearchbarContainer>
		</Container>
	);
}

export default Header;
