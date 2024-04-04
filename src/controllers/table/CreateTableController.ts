import {Request, Response} from 'express'
import {CreateTableService} from './../../services/table/CreateTableService'

class CreateTableController{
    async createTable(req: Request, res: Response){
        const {company_id,command_id,alias} = req.body
        const createTableService = new CreateTableService();
        const table  = await createTableService.createTable({company_id,command_id,alias});
        return res.status(200).json(table);
    }

}

export {CreateTableController}