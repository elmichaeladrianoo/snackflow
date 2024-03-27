import {Request, Response} from 'express'
import {UpdateStatusCommandService} from './../../services/Command/UpdateStatusCommandService'

class UpdateStatusCommandController{
    async updatestatus(req: Request, res: Response){
       const  {command_id, status} = req.body
        
        const updateStatusCommandService = new UpdateStatusCommandService();
        const command = await updateStatusCommandService.updateStatus({command_id, status})

        return res.json(command)
    }

}

export{UpdateStatusCommandController}