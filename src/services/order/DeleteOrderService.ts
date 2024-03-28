import prismaClient from "../../prisma";


interface orderRequest{
    order_id : number;

}

class DeleteOrderService{
    async deleteOrder({order_id}:orderRequest){
        try{
            const deletedOrder = await prismaClient.order.delete({

                where:{
                    id : order_id,
    
                }
    
            });
    
                return deletedOrder;
        }catch(err){

            throw new Error(err)
        }finally{

            prismaClient.$disconnect();
        }
        

    }

}

export {DeleteOrderService}