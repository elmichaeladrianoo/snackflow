import prismaClient from "../../prisma";

interface tableRequest{
    company_id: string,
    status:boolean | string,

}
class ListTableByCompanyService{
    async listTableByCompany({company_id,status}:tableRequest){
        try{
            const table = prismaClient.table.findMany({

                where:{
                        company_id: parseInt(company_id),
                        status: Boolean(status)
                }

            })

            return table
        }catch(err){
            throw new Error("erro ao tentar listar as mesas");
            
        }finally{

            prismaClient.$disconnect();

        }

    }

}
export{ListTableByCompanyService}