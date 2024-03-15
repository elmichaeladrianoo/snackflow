import {Request, Response} from 'express';
import { CreateCategoryService } from '../../services/cetagory/CreateCategoryService';


class CreateCategoryController{
    async handle (req:Request, res:Response){
        const createCategoryService = new  CreateCategoryService()
        const {name} = req.body
        const category = await createCategoryService.execute({name});

        return req.res.json(category)

    }

}

export {CreateCategoryController}