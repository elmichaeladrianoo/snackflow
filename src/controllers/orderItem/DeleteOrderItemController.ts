// DeleteOrderItemController.ts
import { Request, Response } from 'express';
import { DeleteOrderItemService } from './../../services/orderItem/DeleteOrderItemService';

class DeleteOrderItemController {
    async DeleteOrderItem(req: Request, res: Response) {
        try {
            const { order_id, item_id} = req.body;

            const deleteOrderItemService = new DeleteOrderItemService();

            const deletedOrderItem = await deleteOrderItemService.deleteItem({ order_id, item_id});

            return res.json(deletedOrderItem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { DeleteOrderItemController };
