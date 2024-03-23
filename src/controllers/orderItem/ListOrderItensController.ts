import {Request, Response} from 'express'
import {ListOrderItensService} from '../../services/orderItem/ListOrderItensService'

class ListOrderItensController{
    async listOrderItens(req:Request, res: Response){
        const {order_id} = req.body;
        const listOrderItensService = new ListOrderItensService()

        const orderItens = await listOrderItensService.listOrderItens({order_id})
        res.json(orderItens)

    }
}
export {ListOrderItensController}


