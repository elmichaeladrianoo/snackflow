import prismaClient from "../../prisma";

interface commandRequest{
    company_id: string;

}

class ListCommandByCompanyService{
        async listCommand({company_id}:commandRequest){
            try{
              console.log(company_id)
                const command = await prismaClient.command.findMany({
                    
                    where:{

                            company_id: parseInt(company_id),
                            available : true
                    }, select:{
                            id : true,
                            nameAlias : true
                    }

                });
                return command
        }catch(err){
            throw new Error ("Erro ao buscar commandas!")
        }finally{

            prismaClient.$disconnect

        }

        }

}
export {ListCommandByCompanyService}