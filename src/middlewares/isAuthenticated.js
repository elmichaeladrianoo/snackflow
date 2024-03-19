"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function isAuthenticated(validateCompany) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // recebe token
            const authToken = req.headers.authorization;
            if (!authToken) {
                return res.status(401).end();
            }
            const [, token] = authToken.split(" ");
            try {
                // validar token
                const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
                // recuperar o id do token e colocar dentro de uma variável user_id no req.
                req.user_id = sub;
                if (validateCompany) {
                    // buscar se o usuário tem vínculo com a empresa
                    const userHasCompany = yield prisma.companyUser.findFirst({
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
            }
            catch (err) {
                console.error(err);
                return res.status(401).end();
            }
        });
    };
}
exports.isAuthenticated = isAuthenticated;
