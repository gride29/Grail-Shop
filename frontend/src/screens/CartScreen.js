import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Card,
	Button,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	// ?qty=1
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	useEffect(() => {
		dispatch(addToCart(productId, qty));
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Koszyk</h1>
				{cartItems.length === 0 ? (
					<Message>
						Twój koszyk jest pusty <Link to="/">Wróć</Link>
					</Message>
				) : (
					<ListGroup variant="flush" className="py-2">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>{item.price} PLN</Col>
									<Col md={2}>
										<select
											className="form-select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</select>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item style={{ textAlign: 'center' }}>
							<h2>
								W koszyku ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								przedmiotów
							</h2>
							Wartość zamówienia:{' '}
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}{' '}
							PLN
						</ListGroup.Item>
						<ListGroup.Item style={{ textAlign: 'center' }}>
							<Button
								type="button"
								className="btn btn-block"
								style={{ textAlign: 'center' }}
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Przejdź do płatności
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
