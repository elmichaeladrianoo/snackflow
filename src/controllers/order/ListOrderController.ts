import {Request, Response} from 'express'
import {ListOrderService} from './../../services/order/ListOrderService'

class ListOrderController{
    async listOrder(req:Request, res: Response){

        const { order_id, company_id, draft, status, table, name } = req.body

        const listOrderService = new ListOrderService();

        const order = listOrderService.listOrder({ order_id, company_id, draft, status, table, name })

        res.json(order);

    }

}

export {ListOrderController}