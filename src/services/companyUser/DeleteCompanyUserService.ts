import prismaClient from "../../prisma";

interface CompanyUserRequest {
    user_id: number;
    company_id: number;
}

class DeleteCompanyUserService {
    async deleteCompanyUser({ user_id, company_id }: CompanyUserRequest) {

        try{
            const deletedCompanyUser = await prismaClient.companyUser.deleteMany({
                where: {
                    user_id: user_id,
                    company_id: company_id
                    }
            });
    
            return deletedCompanyUser;

        }catch(err){
            throw new Error(err)
        }finally{

            prismaClient.$disconnect();
        }
        
    }
}

export { DeleteCompanyUserService };
