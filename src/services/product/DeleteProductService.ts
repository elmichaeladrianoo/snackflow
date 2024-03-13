import { PrismaClient } from "@prisma/client";

interface ProductRequest {
    id: number;
}

const prisma = new PrismaClient();

class DeleteProductService {
    async deleteProductById({ id }: ProductRequest) {
        try {
            const product = await prisma.product.delete({
                where: {
                    id: id,
                },
            });

            const ObjReturn = {
                nome: product.name,
                id: product.id,
                status: "Removido",
            };

            return ObjReturn;

        } catch (err) {
            throw new Error(err);
        } finally {
            await prisma.$disconnect();
        }
    }
}

export { DeleteProductService };
