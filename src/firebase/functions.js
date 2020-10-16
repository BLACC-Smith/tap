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
		.then(async ({ user }) => {
			const token = await user.getIdToken();
			console.log({ token });
		})
		.catch((err) => {
			console.log({ err });
		});
};
const signInWithFacebook = (cb) => {
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({ display: 'popup' });
	auth
		.signInWithPopup(provider)
		.then(async ({ user }) => {
			const token = await user.getIdToken();
			console.log({ token });
		})
		.catch((err) => {
			console.log({ err });
		});
};

export { createUser, signInWithGoogle, signInWithFacebook };
