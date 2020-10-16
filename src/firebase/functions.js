import { auth } from './config';

const createUser = (email, password, cb) => {
	auth
		.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			console.log({ user });
		})
		.catch((err) => console.log({ err }));
};

export { createUser };
