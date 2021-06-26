import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/userlist');
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
			}
		}
	}, [user, dispatch, userId, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: userId, name, email, isAdmin }));
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-dark my-3">
				Wróć
			</Link>
			<FormContainer>
				<h1 className="pb-2" style={{ fontSize: '2rem' }}>
					Zaktualizuj użytkownika
				</h1>
				{error && <Message variant="danger">{errorUpdate}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="formBasicName" className="py-2">
						<Form.Label>Imię i nazwisko</Form.Label>
						<Form.Control
							type="name"
							placeholder="Wpisz imię i nazwisko"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="formBasicEmail" className="py-2">
						<Form.Label>Adres email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Wpisz email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary" className="mt-3 text-right">
						Zaktualizuj
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
