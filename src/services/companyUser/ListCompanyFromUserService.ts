import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
interface companyUserRequest {
    user_id: number;
    company_id:number;
}

class ListCompanyFromUserService{
    async listCompanyUser({user_id, company_id}:companyUserRequest){

        const companyUser = await prismaClient.companyUser.findMany({
            where:{
                OR:[
                    { user_id: user_id },
                    { company_id: company_id }

                ]

            }, select:{
                 user_id: true ,
                 company_id: true 

            }

        });

        return companyUser


    }


}

export {ListCompanyFromUserService}