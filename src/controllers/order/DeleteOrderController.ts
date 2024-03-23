import { Response, Request } from 'express';
import { DeleteOrderService } from './../../services/order/DeleteOrderService';

class DeleteOrderController {
    async DeleteOrder(req: Request, res: Response) {
        const { order_id } = req.body; 

        const deleteOrderService = new DeleteOrderService();

        const deletedOrder = await deleteOrderService.deleteOrder({ order_id });

        return res.json(deletedOrder);
    }
}

export { DeleteOrderController };
