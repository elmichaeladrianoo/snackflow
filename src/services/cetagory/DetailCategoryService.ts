import prismaClient from "../../prisma";

class DetailCategoryService{
    async execute (name:string){
        try{
            const category = await prismaClient.category.findFirst({

                where:{
                    name : name

                },select:{

                    id: true,
                    name: true
                }
                

            })
            return category

        }catch(err){
            throw new Error(err)

        }finally{
            await prismaClient.$disconnect();
        }
    }
}

export {DetailCategoryService}





