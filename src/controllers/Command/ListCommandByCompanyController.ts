import { Request, Response } from 'express';
import { ListCommandByCompanyService } from './../../services/Command/ListCommandByCompanyService';

interface CommandRequest {
    company_id: string;
}

class ListCommandByCompanyController {
    async listCommand(req: Request, res: Response) {
        try {
            
            const company_id: CommandRequest = {
                company_id: req.query.company_id as string // Convertendo para string
            };

            const listCommandByCompanyService = new ListCommandByCompanyService();

            const commands = await listCommandByCompanyService.listCommand(company_id);

            return res.json(commands);

        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { ListCommandByCompanyController };
