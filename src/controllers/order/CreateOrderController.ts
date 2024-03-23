import {Request, Response} from 'express';
import {CreateOrderService} from './../../services/order/CreateOrderService'


class CreateOrderController{
    async createOrder(req:Request, res:Response){
        const { table, name , company_id, command_id} = req.body
        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({ table, name , company_id, command_id} )
        return res.json(order)
    }


}
export {CreateOrderController}