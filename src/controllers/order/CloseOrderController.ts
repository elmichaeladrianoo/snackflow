import {Response,Request} from 'express'
import {CloseOrderService} from './../../services/order/CloseOrderService'

class CloseOrderController{
    async closeOrder(req: Request, res: Response){

        const {order_id,applyDiscount, percentDiscount} = req.body;
        
        const closeOrderService = new  CloseOrderService();

        const order = await closeOrderService.closeOrder({order_id,applyDiscount, percentDiscount})

        res.json(order)

    }

}
export {CloseOrderController}