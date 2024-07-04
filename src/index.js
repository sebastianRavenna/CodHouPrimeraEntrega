import express from 'express'
import ProductManager from './productManager.js'
import productsRouter from './routes/products.router.js';
import CartManager from './cartManager.js';
import cartsRouter from './routes/carts.router.js';
const PORT = 8080;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen (PORT, (req, res) =>{
    console.log(`servidor escuchando en el puerto ${PORT}`)
})