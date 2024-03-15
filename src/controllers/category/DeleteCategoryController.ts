import {Request, Response } from 'express'
import {DeleteCategoryService} from './../../services/cetagory/DeleteCategoryService'


class DeleteCategoryController{
    async deleteCategoryById(req:Request, res: Response){

        const id      = req.body.id
        const deleteCategoryService = new DeleteCategoryService();

        const deletedCategory = await deleteCategoryService.deleteCategoryById(id)
        
        return res.json(deletedCategory)
    }


}

export {DeleteCategoryController}