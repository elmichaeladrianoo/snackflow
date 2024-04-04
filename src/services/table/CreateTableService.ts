import prismaClient from "../../prisma";

interface tableRequest{
    company_id: number;
    command_id: number;
    alias:     string;
}

class CreateTableService{
    async createTable({company_id,command_id,alias}:tableRequest){

        try{
            const table = await prismaClient.table.create({
                data:{
                    alias       : alias,
                    company_id  : company_id,
                    command_id  : command_id
                  }

            });

            return table

        }catch(err){
            throw new Error("erro ao cadastrar mesa" + err);
        }finally{
            prismaClient.$disconnect();
        }

    }


}

export {CreateTableService}