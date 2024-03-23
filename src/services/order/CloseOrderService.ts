import prismaClient from "../../prisma";

interface orderRequest{
    order_id             : number;
    applyDiscount  : boolean;
    percentDiscount?: number;
}

class CloseOrderService{
    async closeOrder({order_id,applyDiscount, percentDiscount}){
        let newPrice: number;
       
        const oldOrder = await prismaClient.order.findFirst({

            where:{
                id: order_id
            }

        });

        if (!oldOrder){
            throw new Error('Pedido não encontrado!');
        }
        
        if (applyDiscount){
            if (percentDiscount <= 0){
                throw new Error('percentual de desconto precisa ser maior que 0 ');

            }

            if (percentDiscount > 100 ){
                throw new Error('percentual de desconto precisa ser entre 1 e 100 '); 
            }

           newPrice =  oldOrder.previousTotAmount - (oldOrder.previousTotAmount * (percentDiscount/100))


        }else{
            newPrice  = oldOrder.previousTotAmount
        }



        const order = await prismaClient.order.update({

            data:{
                draft: false,
                applyDiscount:applyDiscount,  
                percentDiscount: percentDiscount,
                finallyTotAmount: newPrice
            },
            where:{
                id: order_id
            }
        })
        return order


    }

}
export { CloseOrderService }