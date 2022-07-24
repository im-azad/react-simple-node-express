import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
	const [users, setUsers] = useState([]);
	const nameRef = useRef();
	const emailRef = useRef();

	useEffect(() => {
		fetch('http://localhost:5000/users')
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		const userName = nameRef.current.value;
		const userEmail = emailRef.current.value;
		const newUser = { name: userName, email: userEmail };
		// send data to the server
		fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser), // data sent to server
		})
			// data receive from server and show new data on ui

			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const addedUser = data;
				const newUsers = [...users, addedUser];
				setUsers(newUsers);
			});
		nameRef.current.value = '';
		emailRef.current.value = '';
	};
	return (
		<div className='App'>
			<h1>Total User = {users.length}</h1>
			<form onSubmit={handleSubmit}>
				<input type='text' ref={nameRef} placeholder='name' />
				<input type='email' ref={emailRef} placeholder='email' />
				<input type='submit' value='Submit' />
			</form>
			{users.map((user) => (
				<h4 key={user.id}>
					id: {user.id}, Name: {user.name} , Email: {user.email}
				</h4>
			))}
		</div>
	);
}
export default App;
