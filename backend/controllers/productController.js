import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// ?keyword= - req.query.keyword

const getProducts = asyncHandler(async (req, res) => {
	// Search functionality
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const totalCountOfProducts = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({
		products,
		page,
		pages: Math.ceil(totalCountOfProducts / pageSize),
	});
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Nie znaleziono produktu');
	}

	res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Produkt został usunięty' });
	} else {
		res.status(404);
		throw new Error('Nie znaleziono produktu');
	}

	res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample Description',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		user,
		image,
		brand,
		category,
		countInStock,
		numReviews,
		description,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.user = user;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.numReviews = numReviews;
		product.description = description;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Nie znaleziono produktu');
	}
});

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(review) => review.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Produkt został już przez ciebie zrecenzowany');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Dodano recenzję' });
	} else {
		res.status(404);
		throw new Error('Nie znaleziono produktu');
	}
});

const getTopProducts = asyncHandler(async (req, res) => {
	// -1 - ascending order
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.json(products);
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
