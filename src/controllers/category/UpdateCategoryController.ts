import  {Request, Response} from 'express';
import {UpdateCategoryService} from './../../services/cetagory/UpdateCategoryService'

class UpdateCategoryController {

    async updateCategory(req:Request, res:Response){
        const {id}      = req.body.id;
        const newData = req.body;
        const updateCategoryService = new UpdateCategoryService();

        const categoryUpdated = await updateCategoryService.updateCategoryById(id ,newData )
        return res.json(categoryUpdated)
    }

}
export {UpdateCategoryController}
