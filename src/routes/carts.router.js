import { Router } from "express";
import { cartManager } from "../index.js";
const cartsRouter = Router()

cartsRouter.post('/', async (req, res)=>{
    const response = await cartManager.newCart()
    res.json(response)
})

cartsRouter.get('/:cid', async (req, res)=>{
    const {cid} = req.params;
    const response = await cartManager.getCartProducts(cid)
    res.json(response)
    
})

cartsRouter.post('/:cid/products/:pid', async (req, res)=>{
    const {cid, pid} = req.params;
    await cartManager.addProductToCart(cid, pid)
    res.send('Producto agregado exitosamente')
})

export default cartsRouter