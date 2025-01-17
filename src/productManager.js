import {promises as fs} from 'fs'
import {v4 as uuidv4} from 'uuid'

class ProductManager {

    constructor(){
        this.path ='products.json'
        this.products = []
    }

    async addProduct (
        {title, description, price, code, stock, status = true, thumbnail, category}
    ){
        const id = uuidv4()

        let newProduct = {id, title, description, price, code, stock, status, thumbnail, category}
        
        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    async getProducts (){
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)

        return responseJSON;
    }
    
    async getProductsById (id){
        const response = await this.getProducts()
        const product = response.find(product=> product.id == id)

        if(product){
            return product
        }
    }

    async updateProduct (id, {...data}){
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id == id)

        if(index != -1){
            products[index] = {id, ...data}
            
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))

            return products[index]
        }
    }

    async deleteProduct (id){
        const products = await this.getProducts()
        const index = products.findIndex(product => product.id == id)

        if(index != -1){
            products.splice(index, 1)
            
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        }   
    }
}

export default ProductManager
