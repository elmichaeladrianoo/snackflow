// productController.ts
import { Request, Response } from 'express';
import { CreateProductService } from './../../services/product/CreateProductService';

class CreateProductController {
    async createProduct(req: Request, res: Response) {
        const productService = new CreateProductService();
        const { name, price, description, bannerBase64, categoryId } = req.body;

        try {
            const product = await productService.createProduct({ name, price, description, bannerBase64, categoryId });
            res.status(201).json({ message: 'Produto criado com sucesso.', product });
        } catch (error) {
            res.status(500).json({ error: 'Falha ao criar produto.' });
        }
    }
}

export { CreateProductController };
