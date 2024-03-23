import {Request, Response} from 'express'

import{ListCategoryService} from '../../services/cetagory/ListCategoryService'

class ListCategoryController {
    async getCategory(req:Request,res:Response){
        const {company_id} = req.body;
        const listCategoryService = new ListCategoryService();

        const category = await listCategoryService.execute({company_id});
        return res.json(category);

    }


}

export { ListCategoryController }

