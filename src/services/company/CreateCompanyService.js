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
exports.CreateCompanyService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class CreateCompanyService {
    createCompany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ corporateReason, fantasyName, CNPJ, address, cep, number, city, state, country, phone, email, website }) {
            try {
                // Verifica se já existe uma empresa com o mesmo CNPJ ou e-mail
                const existingCompany = yield prismaClient.company.findFirst({
                    where: {
                        OR: [
                            { CNPJ: CNPJ },
                            { email: email },
                        ],
                    },
                });
                if (existingCompany) {
                    throw new Error('Já existe uma empresa cadastrada com o mesmo CNPJ ou e-mail.');
                }
                // Se não houver empresa com o mesmo CNPJ ou e-mail, cria a nova empresa
                const newCompany = yield prismaClient.company.create({
                    data: {
                        corporateReason,
                        fantasyName,
                        CNPJ,
                        address,
                        cep,
                        number,
                        city,
                        state,
                        country,
                        phone,
                        email,
                        website
                    }
                });
                return newCompany;
            }
            catch (err) {
                throw new Error(err);
            }
            finally {
                prismaClient.$disconnect();
            }
        });
    }
}
exports.CreateCompanyService = CreateCompanyService;
