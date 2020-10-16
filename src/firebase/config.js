import '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCXoHfM7-uEFVbVCsTFN-U9W_WUjCRUBo4',
	authDomain: 'tap-rebuild.firebaseapp.com',
	databaseURL: 'https://tap-rebuild.firebaseio.com',
	projectId: 'tap-rebuild',
	storageBucket: 'tap-rebuild.appspot.com',
	messagingSenderId: '644399415322',
	appId: '1:644399415322:web:11266d29a4bb1b6fa691a3',
	measurementId: 'G-NZXRF5R12C',
};

const firebase = require('firebase');
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default firebase;
export { firestore, auth, storage };
