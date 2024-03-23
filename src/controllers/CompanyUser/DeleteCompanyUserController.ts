import {Request, Response} from 'express'
import {DeleteCompanyUserService} from './../../services/companyUser/DeleteCompanyUserService'


class DeleteCompanyUserControlle{
    async deleteUserCompany(req:Request, res:Response){
        const  { user_id, company_id } = req.body;

        const deleteCompanyUserService = new DeleteCompanyUserService();

        const deletedUsersCompany = await deleteCompanyUserService.deleteCompanyUser({ user_id, company_id })
        return res.json(deletedUsersCompany)
    }

}

export {DeleteCompanyUserControlle}