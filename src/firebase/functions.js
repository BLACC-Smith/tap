import firebase, { auth } from './config';

const createUser = (email, password, cb) => {
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log({ user });
		})
		.catch((err) => console.log({ err }));
};
const signInWithGoogle = (cb) => {
	var provider = new firebase.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			console.log({ token });
			// The signed-in user info.
			var user = result.user;
			console.log({ user });
		})
		.catch((err) => {
			console.log({ err });
			// Handle Errors here.
			var errorCode = err.code;
			var errorMessage = err.message;
			// The email of the user's account used.
			var email = err.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = err.credential;
			// ...
		});
};

export { createUser, signInWithGoogle };
