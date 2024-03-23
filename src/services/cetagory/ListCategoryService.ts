import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface CategoryRequest {
    company_id: number;
}

class ListCategoryService {
    async execute({ company_id }: CategoryRequest) {
        if (!company_id) {
            throw new Error("Informe a Empresa!");
        }

        try {
            const company = await prismaClient.company.findFirst({
                where: {
                    id: company_id
                }
            });

            if (!company) {
                throw new Error("Empresa não encontrada.");
            }

            const categories = await prismaClient.category.findMany({
                where: {
                    company_id: company_id
                }
            });

            return {
                companyCategory: {
                    ...company,
                    categories: categories
                }
            };
        } catch (err) {
            throw new Error(err);
        } finally {
            await prismaClient.$disconnect(); // sempre fechamos a conexão com DB.
        }
    }
}

export { ListCategoryService };
