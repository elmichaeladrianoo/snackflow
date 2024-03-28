import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface companyUserRequest {
    user_id: number;
}

class ListCompanyFromUserService {
    async listCompanyUser({ user_id }: companyUserRequest) {

        try{
            const companies = await prismaClient.companyUser.findMany({
                where: {
                    user_id: user_id
                },
                include: {
                    company: true
                }
            });
    
            const companyIds = companies.map(company => company.company_id);
    
            const vinculos = await prismaClient.company.findMany({
                where: {
                    id: {
                        in: companyIds
                    }
                }
            });
    
            return {
                user: user_id,
                companies: vinculos
            };



        }catch(err){
            throw new Error(err);
            

        }finally{

            prismaClient.$disconnect();
        }
        
    }
}

export { ListCompanyFromUserService };
