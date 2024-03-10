import prismaClient from "../../prisma";

class ListUsersService{
    async execute (){

        try{
            const users = await prismaClient.user.findMany({
                   //colocar clausulas where aqui futuramente ( status ativo, etc) 
            })
            return users;
    
        }catch (err){

            throw new Error(err)

        }finally{
            await prismaClient.$disconnect(); // sempre fechamos a conexão com DB.

        }

    }

}







export{ ListUsersService }