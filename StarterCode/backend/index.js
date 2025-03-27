const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
// app.use(cors()) //Enable cors on all routes

//implement the CORS config
// I used https://expressjs.com/en/resources/middleware/cors.html
const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'DELETE'], // Allow only GET, POST, DELETE methods
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions)); // Use the CORS options for all routes

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

/**
 * @route GET /api/products
 * @description Get all products with random image urls
 * @return A json object containing all products with image urls
 */
app.get('/api/products', (req, res) => {
    const productsWithImages = products.map(product => {
        return { ...product, imageUrl: product.imageUrl ? product.imageUrl : fetchImageUrl() };//If the product has an imageUrl, use it, otherwise generate a new one
    });
    products =  productsWithImages; //Update the products array with the new image urls
    
    res.json(products);
});

/**
 * @route DELETE /api/products/:id
 * @description Delete a product by id
 * @param {number} id - The id of the product to delete 
 */
app.delete('/api/products/:id', (req, res) => {
    if (products.length === 0) {
        return res.status(404).json({ message: `No products left` }); //If no products are left, return 404
    }
    const productId = parseInt(req.params.id, 10);
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' }); //If the id is not a number, return 400
    }
    const productIndex = products.findIndex(product => product.id === productId); //Find the index of the product with the given id
    if (productIndex === -1) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` }); //If the product is not found, return 404
    }

    products = products.filter(product => product.id !== productId); //Redefine products array to remove the product with the given id
    res.status(204).send(); //No need to return content, 204 success.
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
