import prismaClient from "../../prisma";

interface commandRequest{
    command_id: number;
    status: boolean;
}

class UpdateStatusCommandService{
    async updateStatus({command_id, status}:commandRequest){
        try{

            const command = await prismaClient.command.update({

                data:{
                    available: status,

                },where:{
                    id: command_id,
                }

            });
            return command

        }catch(err){
            throw new Error( "Não foi possível realizar o update" )

        }finally{
            prismaClient.$disconnect()

        }


    }
}
export {UpdateStatusCommandService}