import { Request, Response } from 'express';
import { ListCommandByTableService } from './../../services/Command/ListCommandByTableService';

class ListCommandByTableController {
    async listCommand(req: Request, res: Response) {
        const { table_id, company_id, status } = req.query;
        if (typeof table_id === 'string' && typeof company_id === 'string' && typeof status === 'boolean') {
            const listCommandByTableService = new ListCommandByTableService();

            const commands = await listCommandByTableService.listCommand({ table_id, company_id, status });
            res.json(commands);
        } else {
            res.status(400).json({ error: 'Parâmetros inválidos' });
        }
    }
}

export { ListCommandByTableController };
