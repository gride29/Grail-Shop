import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './SearchBox.css';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} className="custom-width">
			<Form.Control
				type="text"
				id="custom-width"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Wyszukaj produkty..."
			></Form.Control>
		</Form>
	);
};

export default SearchBox;
