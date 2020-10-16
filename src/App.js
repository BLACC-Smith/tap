import React from 'react';
import MainContextProvider from './context/MainContext';
import AppContainer from './components/organisms/AppContainer';

function App() {
	return (
		<MainContextProvider>
			<AppContainer />
		</MainContextProvider>
	);
}

export default App;
