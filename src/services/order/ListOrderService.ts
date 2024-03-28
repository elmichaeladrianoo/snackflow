import { Prisma } from '@prisma/client';
import prismaClient from '../../prisma';

interface OrderRequest {
    order_id?: number;
    company_id?: number;
    draft?: boolean;
    status?: boolean;
    table?: number;
    name?: string;
}

class ListOrderService {
    async listOrder({ order_id, company_id, draft, status, table, name }: OrderRequest) {
        try{
            let where: Prisma.OrderWhereInput = {};

            // Adicionar condições à consulta com base nos parâmetros fornecidos
            if (order_id) {
                where.id = order_id;
            }
            if (company_id) {
                where.company_id = company_id;
            }
            if (draft !== undefined) {
                where.draft = draft;
            }
            if (status !== undefined) {
                where.status = status;
            }
            if (table !== undefined) {
                where.table = table;
            }
            if (name) {
                where.name = name;
            }
    
            const orders = await prismaClient.order.findMany({
                where: where,
            });
    
            return orders

        }catch(err){
            throw new Error(err)

        }finally{

            prismaClient.$disconnect();
        }
       
    }
}

export {ListOrderService};
