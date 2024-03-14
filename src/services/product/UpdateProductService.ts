import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class UpdateProductService {

    async updateProductById(id: number, newData: Prisma.ProductUpdateInput) {
        try {
            // Atualizando o produto incluindo a data atual
            const now = new Date();
            const updatedProduct = await prisma.product.update({
                where: { id: id },
                data: {
                    ...newData,
                    updated_at: now
                }
            });

            const objReturn = {
                status: "Atualizado",
                conteudo: { updatedProduct }
            };
            return objReturn;

        } catch (err) {
            throw new Error(`Erro ao atualizar produto: ${err.message}`);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { UpdateProductService };
