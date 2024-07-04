import {Router} from 'express';
import { productManager } from '../index.js';
const productsRouter = Router()


productsRouter.get('/', async (req, res)=>{ 
    const { limit } = req.query;
    const products = await productManager.getProducts()

    if(limit){
        const limitedProducts = products.slice(0, limit)
        return res.json(limitedProducts)
    }
        
    return res.json(products)
})

productsRouter.get ('/:pid', async (req, res) =>{
    const {pid} = req.params;
    const products = await productManager.getProductsById(pid)
    
    res.json(products)
})

productsRouter.post('/', async (req, res) => {
    const { title, description, price, code, stock, status = true, thumbnail, category } = req.body;
    const response = await productManager.addProduct ({ title, description, price, code, stock, status, thumbnail, category})
    
    res.json(response)
})

productsRouter.put('/:pid', async (req, res)=> {
    const {pid} = req.params;
    const { title, description, price, code, stock, status = true, thumbnail, category } = req.body;
    const response = await productManager.updateProduct (pid, { title, description, price, code, stock, status, thumbnail, category})
    
    res.json(response)
})

productsRouter.delete('/:pid', async(req, res) =>{
    const {pid} = req.params;
    await productManager.deleteProduct(pid)
    
    res.send('Producto eliminado exitosamente')
})

export default productsRouter