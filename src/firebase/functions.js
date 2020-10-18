import firebase, { auth, firestore } from './config';

const addUser = (uid) => {
	firestore
		.collection('users')
		.doc(uid)
		.set({
			challenges: [],
			followers: [],
			following: [],
		})
		.catch((err) => console.log({ err }));
};
const createUser = (email, password) => {
	auth
		.createUserWithEmailAndPassword(email, password)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
const signInWithGoogle = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
const signInWithFacebook = () => {
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({ display: 'popup' });
	auth
		.signInWithPopup(provider)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
const createChallenge = (data) => {
	firestore
		.collection('challenges')
		.add(data)
		.catch((err) => console.log({ err }));
};

export {
	createUser,
	createChallenge,
	addUser,
	signInWithGoogle,
	signInWithFacebook,
};
