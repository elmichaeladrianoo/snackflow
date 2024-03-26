import {Request, Response} from 'express'
import {ListCommandByTableService} from './../../services/Command/ListCommandByTableService'


class ListCommandByTableController {
    async listCommand(req: Request, res: Response){
        console.log("bateu aqui")
        const { table } = req.body;
        const listCommandByTableService =  new ListCommandByTableService();

        const commands = await listCommandByTableService.listCommand({ table });

        res.json(commands)
    }

}
export{ListCommandByTableController}