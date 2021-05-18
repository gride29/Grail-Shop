import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<Container>
			<Row>
				<Col className="text-center py-3">
					<footer>
						<strong>Copyright &copy; GRAILSHOP</strong>
					</footer>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
