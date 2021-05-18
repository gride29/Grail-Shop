import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
	Container,
} from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/" style={{ fontSize: '1.4rem' }} className="py-0">
						<Navbar.Brand>GRAILSHOP</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/cart">
								<Nav.Link className="py-0">
									<i className="fa fa-shopping-cart"></i> Koszyk
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link className="py-0">
									<i className="fa fa-user"></i> Zaloguj się
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
