import { PrismaClient } from '@prisma/client';


const prismaClient = new PrismaClient();

interface CompanyRequest{
id: number;
CNPJ: String;
email: String;
corporateReason: String;
fantasyName: String;
cep: String;
city: String;
state: String;
country: String;





}
class ListCompanyService{
    async listCompany({id, CNPJ,email,corporateReason,fantasyName,cep,city,state,country}){
        try{
            const listcompany = await prismaClient.company.findMany(
                {
                    where: {
                        OR: [
                            {id:id},
                            { CNPJ: CNPJ },
                            { email: email },
                            { corporateReason: corporateReason},
                            { fantasyName: fantasyName },
                            { cep: cep},
                            { city: city},
                            { state: state },
                            { country:  country}
                        ],
                    },select:{
                        id              : true,
                        corporateReason : true,
                        fantasyName     : true,
                        CNPJ            : true,
                        address         : true,
                        cep             : true,
                        number          : true,
                        city            : true,
                        state           : true,
                        country         : true,
                        phone           : true,
                        email           : true,
                        website         : true,
                        status          : true,
                        created_at      : true,
                        updated_at      : true,
                    }
    
                }

    
            )
                return listcompany
    

        }catch(err){
            throw new Error(err);
            
        }finally{

            prismaClient.$disconnect();
        }
    
    }
}

export{ListCompanyService}