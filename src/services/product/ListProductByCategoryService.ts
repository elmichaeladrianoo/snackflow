import prismaClient from "../../prisma";

interface ProductRequest{
    category_id:number;

}
class ListProductByCategoryService{
    async execute({category_id}:ProductRequest){
        try{
            const findByCategory = await prismaClient.product.findMany({

                where:{
    
                    category_id: category_id
                }
    
    
            });
    
            return findByCategory    

        }catch(err){

            throw new Error(err);
            
        }finally{

            prismaClient.$disconnect();
        }
        

    }


}


export {ListProductByCategoryService}