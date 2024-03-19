import {Request, NextFunction, Response} from 'express'
import {CreateCompanyUserService} from './../../services/companyUser/CreateCompanyUserService'

class CreateCompanyUserController{
    async createCompanyUser(req:Request, res:Response){
        const {user_id, company_id} =  req.body

        const createCompanyUserService = new CreateCompanyUserService();

        const companyUser= await createCompanyUserService.createCompanyUser({user_id, company_id} );

        res.json(companyUser)

    }

}
export {CreateCompanyUserController}