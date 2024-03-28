import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface OrderItemRequest {
    order_id: number;
    product_id: number;
    amount: number;
}

class CreateOrderItemService {
    async addItem({ order_id, product_id, amount }: OrderItemRequest) {
        try{
            if (amount < 1) {
                throw new Error('A quantidade precisa ser maior que 0 (zero)!');
            }
    
            // Verifica se existe um pedido com o ID fornecido
            const orderExists = await prismaClient.order.findUnique({
                where: {
                    id: order_id,
                },
            });
    
            // Verifica se existe um produto com o ID fornecido e pega o preço
            const product = await prismaClient.product.findUnique({
                where: {
                    id: product_id
                },
                select: {
                    price: true
                }
            });
    
            // Se não existir um pedido ou um produto, lança um erro
            if (!orderExists) {
                throw new Error('Pedido não encontrado!');
            }
    
            if (!product) {
                throw new Error('Produto não encontrado!');
            }
    
            // Calcula o preço total do item
            const totalPrice = product.price * amount;
    
            // Atualiza o valor total do pedido usando uma consulta SQL
            await prismaClient.$executeRaw`UPDATE "orders" SET "previousTotAmount" = COALESCE("previousTotAmount", 0) + ${totalPrice} WHERE "id" = ${order_id};`;
    
            // Cria o item de pedido
            const orderItem = await prismaClient.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                }
            });
    
            const orderUpdated = await prismaClient.order.findFirst({
                where:{
                    id: order_id}
    
            })
            return {
                order: orderUpdated,
                orderItem: orderItem
            };


        }catch(err){
            throw new Error(err)

        }finally{

            prismaClient.$disconnect();
        }
        

        
    }
}

export { CreateOrderItemService };
