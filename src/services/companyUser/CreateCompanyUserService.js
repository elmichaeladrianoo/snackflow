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
exports.CreateCompanyUserService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CreateCompanyUserService {
    createCompanyUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, company_id }) {
            try {
                // Verificar se o usuário existe
                const userExist = yield prisma.user.findFirst({
                    where: {
                        id: user_id
                    }
                });
                if (!userExist) {
                    throw new Error('Usuário especificado não existe!');
                }
                // Verificar se a empresa existe
                const companyExist = yield prisma.company.findFirst({
                    where: {
                        id: company_id
                    }
                });
                if (!companyExist) {
                    throw new Error('Empresa especificada não existe!');
                }
                // Verificar se o usuário já está vinculado à empresa
                const userCompanyExist = yield prisma.companyUser.findFirst({
                    where: {
                        AND: [
                            { user_id: user_id },
                            { company_id: company_id }
                        ]
                    }
                });
                if (userCompanyExist) {
                    throw new Error('Usuário já está vinculado a esta empresa!');
                }
                // Se todas as verificações passarem, criar o vínculo entre usuário e empresa
                const newCompanyUser = yield prisma.companyUser.create({
                    data: {
                        user_id: user_id,
                        company_id: company_id
                    }
                });
                return newCompanyUser;
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.CreateCompanyUserService = CreateCompanyUserService;
