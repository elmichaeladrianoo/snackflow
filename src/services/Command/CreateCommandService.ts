import prismaClient from "../../prisma";

interface commandRequest  {
    nameAlias       : string;
    company_id      : number;
    virtual         : boolean;

}

class CreateCommandService{
    async createCommand({nameAlias,company_id,virtual}:commandRequest){

        try{
            let defaultPrice = 0.0
            const command = await prismaClient.command.create({

                data:{
                    nameAlias:nameAlias,
                    company_id:company_id,
                    virtual:virtual,
                    finallyTotAmount:defaultPrice,
                    available:true

                }

            });
            return command
        } catch(err){
            throw new Error(err);
            
        }finally{
            prismaClient.$disconnect()

        }
    }

}

export {CreateCommandService}




