import prismaClient from "../../prisma";

interface OrderRequest {
  table: number;
  name: string;
  company_id: number;
  command_id:number;
}




class CreateOrderService {

  async execute({ table, name , company_id, command_id}: OrderRequest) {
    let defaultPrice = 0.0
    try {
      const order = await prismaClient.order.create({
        data: {
          table: table,
          name: name,
          company_id: company_id,
          command_id:command_id,
          previousTotAmount:defaultPrice
        },
      });

      return order;
    }catch(err){
      throw new Error(err)
    }finally{
     prismaClient.$disconnect()
   } 
  }
}
export { CreateOrderService };
