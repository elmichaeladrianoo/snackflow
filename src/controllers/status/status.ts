import {Request, Response} from 'express';

class GetStatus{
    async status(req:Request, res: Response){
        return res.json({
            "name":"snackflow",    
            "status": "UP"})

    }


}

export {GetStatus}