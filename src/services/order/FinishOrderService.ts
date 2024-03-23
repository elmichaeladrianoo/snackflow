import prismaClient from "../../prisma";
interface orderRequest{
    order_id: number;
}

class FinishOrderService{
    async finishOrder({order_id}:orderRequest){
        const order = prismaClient.order.update({

            data:{
                status:true
            }, where:{
                id: order_id
            }

        });
        return order

    }
}

export {FinishOrderService}
