import {Request,Response} from 'express'
import {ListTableByCompanyService} from './../../services/table/ListTableByCompanyService'

class ListTableByCompanyController{
    async listTable(req:Request, res:Response){
        const {company_id,status} = req.params
        const listTableByCompanyService = new ListTableByCompanyService();
        const table = await listTableByCompanyService.listTableByCompany({company_id,status})
        return res.status(200).json(table)
    }
            
}
export{ListTableByCompanyController}