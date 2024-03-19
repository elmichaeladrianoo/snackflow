import { Request, Response } from 'express';
import { CreateCompanyService } from '../../services/company/CreateCompanyService';

class CreateCompanyController {
    async createCompany(req: Request, res: Response) {
       
            const {
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
            } = req.body;



            const createCompanyService = new CreateCompanyService();
            const company = await createCompanyService.createCompany({
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
            });

            return res.json(company);
       
}
}

export { CreateCompanyController };
