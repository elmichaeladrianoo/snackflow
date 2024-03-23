import {Request, Response} from 'express';
import {CreateOrderItemService} from './../../services/orderItem/CreateOrderItemService'


class CreateOrderItemController{
    async addItem(req:Request, res:Response){
        const {order_id,product_id,amount} = req.body;


        const createOrderItemService = new CreateOrderItemService();

        const orderItem = await createOrderItemService.addItem({order_id,product_id,amount})
        return res.json(orderItem);
    }
}

export {CreateOrderItemController}