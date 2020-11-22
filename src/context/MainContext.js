import React, { createContext, useReducer, useCallback } from 'react';
import AppReducer from './AppReducer';

const initialState = {
	user: null,
};

export const MainContext = createContext(initialState);

const MainContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const updateUser = useCallback((payload) => {
		console.log('updating user');
		dispatch({ type: 'UPDATE_USER', payload });
	}, []);
	return (
		<MainContext.Provider value={{ user: state.user, updateUser }}>
			{children}
		</MainContext.Provider>
	);
};
export default MainContextProvider;
