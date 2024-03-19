import {Request, NextFunction, Response} from 'express'
import {ListCompanyService} from './../../services/company/ListCompanyService'

class ListCompanyController{

    async listCompany(req:Request, res:Response){
        const {id,CNPJ,email,corporateReason,fantasyName,cep,city,state,country} = req.body
        
        const listCompanyService = new ListCompanyService()
        const  listcompany = await listCompanyService.listCompany({id,CNPJ,email,corporateReason,fantasyName,cep,city,state,country})
        return res.json(listcompany)
    }


}

export{ListCompanyController}