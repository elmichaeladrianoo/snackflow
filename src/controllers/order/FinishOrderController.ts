import {Request,Response} from 'express'
import {FinishOrderService} from './../../services/order/FinishOrderService'

class FinishOrderController{
    async finishOrder(req:Request, res:Response){
        const {order_id} = req.body

        const finishOrderService = new FinishOrderService();

        const order = await finishOrderService.finishOrder({order_id} )

        res.json(order)


    }

}

export{FinishOrderController}