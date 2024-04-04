import prismaClient from "../../prisma"
interface CategoryRequest{
    name: string;
    company_id: number;

}

class CreateCategoryService{
    async execute({name, company_id}:CategoryRequest){
        try{
            if(name ===""){
                throw new Error ("Nome Inválido")
            }
    
            const category = await prismaClient.category.create({
    
                data:{
                    name:name,
                    company_id:company_id
                }, select:{
                    id: true,
                    name: true,
                    company_id:true  
                }
    
            })
    
    
            return {category}
        }catch(err){
            prismaClient.$disconnect();


        }



    }


}

export{CreateCategoryService}