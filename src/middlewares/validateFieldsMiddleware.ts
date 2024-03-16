import { NextFunction, Request, Response } from 'express';
import { validateCPF } from '../util/dataValidator'; // Corrigido o import

export function isMaskValid(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { cpf } = req.body;

        if (!cpf) {
            throw new Error("Erro ao tentar criar usuário: CPF não fornecido!");
        }

        if (!validateCPF(cpf)) { // Utilizado o CPF formatado para validação
            return res.status(400).json({ Message :'Erro ao tentar criar usuário: CPF Inválido!' });
        } 

        return next();

    } catch (err) {
        console.error("Erro ao tentar criar usuário:", err);
        return res.status(400).json({ error: err.message });
    }
}
