import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();

class DeleteCategoryService {
    async deleteCategoryById(id:number ) {
        try {
            // Verificar se existem produtos associados a esta categoria
            const productsCount = await prisma.product.count({
                where: {
                    category_id: id,
                },
            });

            if (productsCount > 0) {
                throw new Error(`Não é possível excluir a categoria porque existem produtos associados a ela.`);
            }

            // Excluir a categoria se não houver produtos associados
            const deletedCategory = await prisma.category.delete({
                where: {
                    id: id,
                },
            });

            const ObjReturn = {
                nome: deletedCategory.name,
                id: deletedCategory.id,
                status: "Removido",
            };

            return ObjReturn;
        } catch (err) {
            throw new Error(err.message);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { DeleteCategoryService };
