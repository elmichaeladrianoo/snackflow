import prismaClient from "../../prisma";

class DetailUserService{
    async execute (user_id:string){
        
        try{
            const user = await prismaClient.user.findFirst({

                where:{
                    id: user_id
                }

            })
            

            return user;
        }catch(err){
            throw new Error(err)

        }finally{
            await prismaClient.$disconnect(); // sempre fechamos a conexão com DB.
        
        }
    }

}

export{ DetailUserService }




