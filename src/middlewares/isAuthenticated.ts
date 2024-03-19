import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Payload {
    sub: string;
}

export function isAuthenticated(validateCompany: boolean) {
    return async function (req: Request, res: Response, next: NextFunction) {
        // recebe token
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).end();
        }

        const [, token] = authToken.split(" ");

        try {
            // validar token
            const { sub } = verify(
                token,
                process.env.JWT_SECRET
            ) as Payload;

            // recuperar o id do token e colocar dentro de uma variável user_id no req.
            req.user_id = sub;

            if (validateCompany) {
                // buscar se o usuário tem vínculo com a empresa
                const userHasCompany = await prisma.companyUser.findFirst({
                    where: {
                        user_id: parseInt(sub), // convertendo para número inteiro
                        company_id: parseInt(req.body.company_id) // supondo que o id da empresa esteja nos parâmetros da requisição
                    }
                });

                if (!userHasCompany) {
                    return res.status(401).json({ error: "Usuário não tem permissão para acessar esta empresa" });
                }
            }

            return next();

        } catch (err) {
            console.error(err);
            return res.status(401).end();
        }
    };
}
