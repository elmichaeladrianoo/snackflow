import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DeleteOrderItemRequest {
    order_id: number;
    item_id: number;
}

class DeleteOrderItemService {
    async deleteItem({ order_id, item_id}: DeleteOrderItemRequest) {

        try{
            const deletedOrderItem = await prisma.item.findUnique({
                where: {
                    id: item_id
                }
            });
    
            if (!deletedOrderItem) {
                throw new Error('Item de pedido não encontrado');
            }
    
            const product = await prisma.product.findUnique({
                where: {
                    id: deletedOrderItem.product_id
                },
                select: {
                    price: true
                }
            });
    
            if (!product) {
                throw new Error('Produto não encontrado');
            }
    
            const priceRemove = deletedOrderItem.amount * product.price;
    
          
            const OrderUpdated = await prisma.order.update({
                data: {
                    previousTotAmount: {
                        decrement: priceRemove
                    }
                },
                where: {
                    id: order_id
                }
            });
    
      
            const deletedItem = await prisma.item.delete({
                where: {
                    id: item_id
                }
            });
    
            return {
                order: OrderUpdated,
              "itemDeleted":  deletedItem,
    
            }
            


        }catch(err){
            throw new Error(err)

        }finally{

            prisma.$disconnect();
        }

        
    
    }
}

export { DeleteOrderItemService };
