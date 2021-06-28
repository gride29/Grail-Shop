import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
	return (
		pages > 1 && (
			<Pagination className="mt-3">
				{[...Array(pages).keys()].map((item) => (
					<LinkContainer
						key={item + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${item + 1}`
									: `/page/${item + 1}`
								: `/admin/productlist/${item + 1}`
						}
					>
						<Pagination.Item active={item + 1 === page}>
							{item + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
