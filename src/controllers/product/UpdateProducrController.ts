import { Request, Response } from 'express';
import { UpdateProductService } from './../../services/product/UpdateProductService';

class UpdateProductController {
    async updateProductById(req: Request, res: Response) {
        try {
            const id = req.body.id;
            const newData = req.body;
            const updateProductService = new UpdateProductService();
    
            const updatedProduct = await updateProductService.updateProductById(id, newData);
    
            return res.json(updatedProduct);
        } catch (error) {
            // Lidar com erros
            console.error('Erro ao atualizar produto:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export { UpdateProductController };
