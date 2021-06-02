import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, ListGroup, Image, Card, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);

	const { order, loading, error } = orderDetails;

	try {
		order.itemsPrice = order.orderItems.reduce(
			(acc, item) => acc + item.price * item.qty,
			0
		);
	} catch (error) {}

	useEffect(() => {
		dispatch(getOrderDetails(orderId));
	}, [dispatch, orderId]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Zamówienie {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2 className="py-2">Wysyłka</h2>
							<p>
								<strong>Dane:</strong> {order.user.name}
							</p>
							<p>
								<strong>Email:</strong> {order.user.email}
							</p>
							<p>
								<strong>Adres: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Dostarczone {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Zamówienie nie zostało jeszcze dostarczone
								</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2 className="py-2">Płatność</h2>
							<p>
								<strong>Metoda płatności: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Opłacone {order.paidAt}</Message>
							) : (
								<Message variant="danger">Zamówienie nieopłacone</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2 className="py-2">Koszyk</h2>
							{order.orderItems.length === 0 ? (
								<Message>Zamówienie jest puste</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index} className="my-2">
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x {item.price} PLN ={' '}
													{item.qty * item.price} PLN
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Podsumowanie zamówienia</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Wartość zamówienia netto</Col>
									<Col>{order.itemsPrice} PLN</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Wysyłka</Col>
									<Col>{order.shippingPrice} PLN</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Podatek VAT</Col>
									<Col>{order.taxPrice} PLN</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Całkowita wartość zamówienia</Col>
									<Col>{order.totalPrice} PLN</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
