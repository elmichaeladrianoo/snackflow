import prismaClient from "../../prisma";

interface orderItensRequest{
    order_id:number;
}
class ListOrderItensService{
    async listOrderItens({order_id}:orderItensRequest){
        try{
            const order = await prismaClient.order.findFirst({

                where:{
                    id: order_id
                },select:{
                    id: true,
                    table:true,
                    status: false,
                    draft: false,
                    name: true,
                    created_at: true,
                    updated_at: false,
                    applyDiscount: false,
                    percentDiscount: false,
                    previousTotAmount:true,
                    finallyTotAmount: false,
                    company_id: true
    
                }
    
            });
            if (!order){
                throw new Error ("Pedido não existe!")
            }
            const item = await prismaClient.item.findMany({
                where:{
                    order_id:order_id,
    
                }, select:{
    
                    id: true,
                    amount: true,
                    created_at: true,
                    updated_at: false,
                    order_id:true,
                    product_id: true
    
                }
    
            })
            return {
                "order": order,
                 "item":item   
    
            };

        }catch(err){
            throw new Error(err)

        }finally{

            prismaClient.$disconnect();
        }
  

    }  

}

export {ListOrderItensService}