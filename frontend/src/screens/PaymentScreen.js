import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [isChecked, setIsChecked] = useState(false);

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Metoda płatności</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="formBasicPayment" className="py-2">
					<Form.Label as="legend">Wybierz metodę płatności</Form.Label>
					<Col className="py-2">
						<Form.Check
							className="py-2"
							type="radio"
							label="PayPal lub Karta Kredytowa"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							onChange={
								((e) => setPaymentMethod(e.target.value),
								() => setIsChecked(true))
							}
						></Form.Check>
						<Form.Check
							className="py-2"
							type="radio"
							label="Przelewy24"
							id="Przelewy24"
							name="paymentMethod"
							value="Przelewy24"
							onChange={
								((e) => setPaymentMethod(e.target.value),
								() => setIsChecked(true))
							}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary" disabled={!isChecked}>
					Kontynuuj
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
