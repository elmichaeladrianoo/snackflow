import prismaClient from "../../prisma";

interface ProductRequest{
    category_id:string;

}
class ListProductByCategoryService{
    async execute({category_id}:ProductRequest){
        try{
            const findByCategory = await prismaClient.product.findMany({

                where:{
    
                    category_id: parseInt(category_id)
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