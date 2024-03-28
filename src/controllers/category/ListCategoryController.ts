import { Request, Response } from 'express';
import { ListCategoryService } from '../../services/cetagory/ListCategoryService';

class ListCategoryController {
    async getCategory(req: Request, res: Response) {
        const { company_id } = req.query;

        if (typeof company_id === 'string') {
            const listCategoryService = new ListCategoryService();
            const category = await listCategoryService.execute({ company_id });
            return res.json(category);
        } else {
            return res.status(400).json({ error: 'Invalid company_id' });
        }
    }
}

export { ListCategoryController };
