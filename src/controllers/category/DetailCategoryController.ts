import {Request, Response} from 'express';
import {DetailCategoryService} from './../../services/cetagory/DetailCategoryService'

class  DetailCategoryController{
    async handle(req:Request,res:Response){
        
        const category_Name           = req.body.name;
        const detailCategoryService = new DetailCategoryService();

        const category        = await detailCategoryService.execute(category_Name);

        return res.json(category)
        
            
    }


}

export{DetailCategoryController}