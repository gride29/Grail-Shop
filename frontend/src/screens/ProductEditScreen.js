import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // array of files, we only need the first one
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: { "Content-Type": "application/form-data" },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <>
      <Meta title="GRAILSHOP | Edytuj produkt" />
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Wróć
      </Link>
      <FormContainer>
        <h1 className="pb-2" style={{ fontSize: "2rem" }}>
          Zaktualizuj produkt
        </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicName" className="py-2">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz nazwę"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPrice" className="py-2">
              <Form.Label>Cena</Form.Label>
              <Form.Control
                type="number"
                placeholder="Wpisz cenę"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicImage" className="py-2">
              <Form.Label>Zdjęcie</Form.Label>
              <Form.File
                id="image-file"
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="formBasicBrand" className="py-2">
              <Form.Label>Marka</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz markę"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicCategory" className="py-2">
              <Form.Label>Kategoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz kategorię"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicCountInStock" className="py-2">
              <Form.Label>Ilość dostępnych sztuk</Form.Label>
              <Form.Control
                type="number"
                placeholder="Wpisz ilość"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="py-2">
              <Form.Label>Opis</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3 text-right">
              Zaktualizuj
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
