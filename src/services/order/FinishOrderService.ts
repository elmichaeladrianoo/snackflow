import prismaClient from "../../prisma";
interface orderRequest{
    order_id: number;
}

class FinishOrderService{
    async finishOrder({order_id}:orderRequest){
        try{
            const order = prismaClient.order.update({

                data:{
                    status:true
                }, where:{
                    id: order_id
                }
    
            });
            return order



        }catch(err){
            throw new Error(err)

        }finally{

            prismaClient.$disconnect()
        }
        

    }
}

export {FinishOrderService}
