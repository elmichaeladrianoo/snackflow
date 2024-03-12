import { Request, Response } from 'express';
import { CreateProductservice } from './../../services/product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, category_id } = req.body;
        let { price } = req.body;

        // Converte o preço para um número
        price = parseFloat(price);
        let categoryId = parseInt(category_id)

        const createProductService = new CreateProductservice();

        if (!req.file) {
            throw new Error("Imagem não anexada");
        } else {
            const { originalname, filename: banner } = req.file;
            const product = await createProductService.execute({ name, price, description, banner, categoryId });
            return res.json(product);
        }
    }
}

export { CreateProductController };
