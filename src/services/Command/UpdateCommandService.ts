import prismaClient from "../../prisma";

interface commandRequest{
    command_id : number,
    nameAlias  : string,
    virtual    : boolean
}

class UpdateCommandService{
    async updateCommand({command_id, nameAlias, virtual}){
    
        const command = await prismaClient.command.update({

            data:{
                nameAlias: nameAlias,
                virtual  : virtual

            },where:{
                id: command_id,
          
            }
           
        });
        return command
    }

}
export {UpdateCommandService}