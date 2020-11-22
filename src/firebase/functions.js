import firebase, { auth, firestore, storage } from './config';

export const addUser = (uid) => {
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
export const createUser = (email, password) => {
	auth
		.createUserWithEmailAndPassword(email, password)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
export const signInWithGoogle = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	auth
		.signInWithPopup(provider)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
export const signInWithFacebook = () => {
	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({ display: 'popup' });
	auth
		.signInWithPopup(provider)
		.then(async ({ user }) => addUser(user.uid))
		.catch((err) => console.log({ err }));
};
export const createChallenge = async (data, onComplete) => {
	try {
		const storageRef = storage.ref(`recordings/${data.uid}/test`);
		const uploadTask = storageRef.put(data.audio);
		uploadTask.on(
			'state_changed',
			() => {},
			(err) => {
				throw new Error(`createChallenge: ${err.toString()}`);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					firestore
						.collection('challenges')
						.add({ ...data, audio: downloadURL })
						.then(() => onComplete())
						.catch((err) => {
							throw new Error(`createChallenge: ${err.toString()}`);
						});
				});
			}
		);
	} catch (error) {
		throw new Error(`createChallenge: ${error.toString()}`);
	}
};

export const getChallenges = async (callback) => {
	try {
		const snapshot = await firestore.collection('challenges').get();
		if (snapshot.empty)
			throw new Error('getChallenges: Error getting challenges');

		const data = [];
		snapshot.forEach((doc) => {
			data.push(doc.data());
		});
		callback(data);
	} catch (error) {
		throw new Error(`getChallenges: ${error}`);
	}
};
