import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Hasła nie są jednakowe, spróbuj ponownie');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1 className="pb-2">Zarejestruj się</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
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
					Zarejestruj się
				</Button>
			</Form>

			<Row className="py-3">
				<Col className="text-center">
					Posiadasz już konto?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Zaloguj się
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
