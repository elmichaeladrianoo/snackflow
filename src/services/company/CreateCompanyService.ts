import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface CompanyRequest {
    corporateReason: string;
    fantasyName: string;
    CNPJ: string;
    address: string;
    cep: string;
    number: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    website: string;
}

class CreateCompanyService {
    async createCompany({
        corporateReason,
        fantasyName,
        CNPJ,
        address,
        cep,
        number,
        city,
        state,
        country,
        phone,
        email,
        website
    }: CompanyRequest) {
        try {
            // Verifica se já existe uma empresa com o mesmo CNPJ ou e-mail
            const existingCompany = await prismaClient.company.findFirst({
                where: {
                    OR: [
                        { CNPJ: CNPJ },
                        { email: email },
                    ],
                },
            });

            if (existingCompany) {
                throw new Error('Já existe uma empresa cadastrada com o mesmo CNPJ ou e-mail.');
            }

            // Se não houver empresa com o mesmo CNPJ ou e-mail, cria a nova empresa
            const newCompany = await prismaClient.company.create({
                data: {
                    corporateReason,
                    fantasyName,
                    CNPJ,
                    address,
                    cep,
                    number,
                    city,
                    state,
                    country,
                    phone,
                    email,
                    website
                }
            });

            return newCompany;
        } catch (err) {
        
            throw new Error(err); 
        }
    }
}


 export{CreateCompanyService}