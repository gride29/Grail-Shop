import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);

	const { loading, error, product } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [match, dispatch]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	return (
		<>
			<Link className="btn btn-dark my-3" to="/">
				Wróć
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} recenzji`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Cena: {product.price} PLN</ListGroup.Item>
							<ListGroup.Item>Opis: {product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Cena:</Col>
										<Col>
											<strong>{product.price} PLN</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Dostępność:</Col>
										<Col>
											<strong>
												{product.countInStock > 0 ? 'Dostępny' : 'Niedostępny'}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Ilość</Col>
											<Col>
												<select
													className="form-select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<Button
									onClick={addToCartHandler}
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Dodaj do koszyka
								</Button>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
