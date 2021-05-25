import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			<h1 className="pb-2">Zaloguj się</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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

				<Button type="submit" variant="primary" className="mt-3 text-right">
					Zaloguj się
				</Button>
			</Form>

			<Row className="py-3">
				<Col className="text-center">
					Nowy użytkownik?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Zarejestruj
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
