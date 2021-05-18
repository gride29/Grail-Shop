import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<strong>{product.name}</strong>
				</Link>
				<Card.Text as="div" style={{ marginTop: '1.25rem' }}>
					<Rating
						value={product.rating}
						text={`${product.numReviews} recenzji`}
					/>
				</Card.Text>
				<Card.Text as="h3" style={{ textAlign: 'right', marginTop: '1.5rem' }}>
					{product.price} PLN
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
