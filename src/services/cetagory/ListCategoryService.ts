import prismaClient from "../../prisma"


class ListCategoryService{
    async execute (){

        try{
            const category = await prismaClient.category.findMany({
                   //colocar clausulas where aqui futuramente ( status ativo, etc) 
            })
            return category;
    
        }catch (err){

            throw new Error(err)

        }finally{
            await prismaClient.$disconnect(); // sempre fechamos a conexão com DB.

        }

    }

}







export{ ListCategoryService }