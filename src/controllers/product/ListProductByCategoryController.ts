import{Request,Response} from 'express'
import {ListProductByCategoryService} from './../../services/product/ListProductByCategoryService'



class ListProductByCategoryController{
    async getProductsByCategory(req:Request, res: Response){
        const category_id = req.body.category_id 

        const listProductByCategoryService  = new ListProductByCategoryService();

        const products = await listProductByCategoryService.execute({category_id})

        
        return res.json(products)

    }
    

}

export {ListProductByCategoryController}