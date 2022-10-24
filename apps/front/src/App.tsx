import './App.css';

import { useEffect, useState } from 'react';

import reactLogo from './assets/react.svg';

function App() {
	const [users, setUsers] = useState<Record<string, number | string>[] | null>(
		[],
	);

	console.log('VITE_API_URL', import.meta.env.VITE_API_URL);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			setUsers(data);
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Mon app front</h1>
			<ul>
				{users?.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}

export default App;
