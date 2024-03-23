import {Request, Response} from 'express'
import {CreateCommandService} from './../../services/Command/CreateCommandService'

class CreateCommandController{
    async commandCreate(req:Request, res:Response){

        const {nameAlias, company_id, virtual} = req.body;
        const createCommandService = new CreateCommandService();

        const command = await createCommandService.createCommand({nameAlias,company_id,virtual})

        return res.json(command)
    }


}
export {CreateCommandController}