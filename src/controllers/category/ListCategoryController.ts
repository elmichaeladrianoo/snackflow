import {Request, Response} from 'express'

import{ListCategoryService} from '../../services/cetagory/ListCategoryService'

class ListCategoryController {
    async getCategory(req:Request,res:Response){
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute();
        return res.json(category);

    }


}

export { ListCategoryController }

