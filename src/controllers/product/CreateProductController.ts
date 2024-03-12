import{Request, Response} from 'express'
import {CreateProductservice} from './../../services/product/CreateProductService'


class CreateProductController{
    async handle(req:Request, res:Response){
        
        const { name, price, description,category_id } = req.body

        

        const createProductService = new CreateProductservice();
      

        if (!req.file){
            throw new Error ("Imagem não anexada")

        }else{

            const { originalname, filename:banner } = req.file

        

            const product  = await createProductService.execute({name, price,description,banner,category_id})

            return res.json(product)
         }
    }


}

export { CreateProductController }