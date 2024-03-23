import prismaClient from "../../prisma";


interface orderRequest{
    order_id : number;

}

class DeleteOrderService{
    async deleteOrder({order_id}:orderRequest){

        const deletedOrder = await prismaClient.order.delete({

            where:{
                id : order_id,

            }

        });

            return deletedOrder;

    }

}

export {DeleteOrderService}