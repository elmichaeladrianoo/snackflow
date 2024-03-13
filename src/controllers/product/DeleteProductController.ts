import {Request, Response} from 'express';
import {DeleteProductService} from './../../services/product/DeleteProductService'

class DeleteProductController{

    async deleteProductById(req: Request, res:Response){
            const {id} =  req.body;
            
            const deleteProductService = new DeleteProductService();

            const ObjReturn = await deleteProductService.deleteProductById({id});
        
            return res.status(200).json(ObjReturn);
         
            }

    }


export {DeleteProductController}