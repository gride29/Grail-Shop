import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		if (password !== confirmPassword) {
			setMessage('Hasła nie są jednakowe, spróbuj ponownie');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2 className="pb-2">Profil Użytkownika</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profil Zaktualizowany</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="formBasicName" className="py-2">
						<Form.Label>Imię i nazwisko</Form.Label>
						<Form.Control
							type="name"
							placeholder="Wpisz imię i nazwisko..."
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicEmail" className="py-2">
						<Form.Label>Adres email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Wpisz email..."
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicPassword" className="py-2">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							type="password"
							placeholder="Wpisz hasło..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicConfirmPassword" className="py-2">
						<Form.Label>Potwierdź hasło</Form.Label>
						<Form.Control
							type="password"
							placeholder="Wpisz hasło ponownie..."
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary" className="mt-3 text-right">
						Zaktualizuj
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>Moje zamówienia</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
