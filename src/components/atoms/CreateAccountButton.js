import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { createUser } from "../../firebase/functions";

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

function CreateAccountButton(props) {
	const [error, setError] = useState(null);
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		createUser(props.email, props.password, setError);
	}, [props.email, props.password, clicked]);

	return (
		<>
			<Button
				onClick={() => {
					setClicked(!clicked);
					error !== null
						? alert("Account Exists Already!")
						: (window.location.href = "/login"); // ****Update to homescreen when created****
				}}
			>
				Create Account
			</Button>
			<Link onClick={() => (window.location.href = "/login")}>
				Already have an account? Login here.
			</Link>
		</>
	);
}

export default CreateAccountButton;
