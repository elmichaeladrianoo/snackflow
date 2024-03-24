import {Request, Response} from 'express'
import {ListCompanyFromUserService} from './../.././services/companyUser/ListCompanyFromUserService'

class ListCompanyFromUserController{
    async listCompanyUser(req:Request, res:Response){
        const { user_id } = req.body;

        const listCompanyUserService = new ListCompanyFromUserService();

        const companyUser = await listCompanyUserService.listCompanyUser({ user_id });

        return res.json(companyUser);


    }



}

export{ListCompanyFromUserController}