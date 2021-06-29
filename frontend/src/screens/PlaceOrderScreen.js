import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Button, Row, ListGroup, Image, Card, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import {createOrder} from "../actions/orderActions";
import Meta from "../components/Meta";

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;

    cart.taxPrice = Number((0.23 * cart.itemsPrice).toFixed(2));

    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);

    const {order, success, error} = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    console.log(cart.shippingAddress);

    return (
        <>
            <Meta title="GRAILSHOP | Podsumowanie zamówienia"/>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2 className="py-2">Wysyłka</h2>
                            <p>
                                <strong>Adres: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2 className="py-2">Płatność</h2>
                            <p>
                                <strong>Metoda płatności: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2 className="py-2">Koszyk</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Twój koszyk jest pusty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                                    {item.qty} x {item.price} PLN ={" "}
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
                                    <Col>{cart.itemsPrice} PLN</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Wysyłka</Col>
                                    <Col>{cart.shippingPrice} PLN</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Podatek VAT</Col>
                                    <Col>{cart.taxPrice} PLN</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Całkowita wartość zamówienia</Col>
                                    <Col>{cart.totalPrice} PLN</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item style={{textAlign: "center"}}>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    style={{width: "100%"}}
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Złóż zamówienie
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
