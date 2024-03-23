import {Request, Response} from 'express'
import {UpdateCommandService} from './../../services/Command/UpdateCommandService'
class UpdateCommandController{


    async updateCommand(req:Request, res:Response){
        const {command_id, nameAlias,virtual} = req.body
        const updateCommandService = new UpdateCommandService()

        const command = await updateCommandService.updateCommand({command_id, nameAlias,virtual})

        res.json(command)
    }

}
export{UpdateCommandController}