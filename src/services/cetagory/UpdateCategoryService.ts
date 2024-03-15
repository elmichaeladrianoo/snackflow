import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class UpdateCategoryService {

async updateCategoryById(id:number, newdata:Prisma.ProductUpdateInput){

    try {
        const now = new Date();
        const categoryUpdated = await prisma.category.update({
            where: { id: id },
            data: {
                ...newdata,
                updated_at: now
            }  
        });
        const objReturn = {
            status: "Atualizado",
            conteudo: { categoryUpdated }
        };
        return objReturn;
    }catch(err){
        throw new Error(`Erro ao atualizar categoria: ${err.message}`);

    }finally{

        await prisma.$disconnect();
     

    }


}
}

export {UpdateCategoryService}

