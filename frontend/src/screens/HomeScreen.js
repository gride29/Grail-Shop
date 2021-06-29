import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import {listProducts} from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";


const HomeScreen = ({match}) => {
    const dispatch = useDispatch();

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const productList = useSelector((state) => state.productList);
    const {loading, error, products, page, pages} = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta title="GRAILSHOP | Strona domowa"/>
            {!keyword ? <ProductCarousel/> : <Link to='/' className='btn btn-dark'>Wróć</Link>}
            <h1 className="mt-3">Najnowsze produkty</h1>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ""}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
