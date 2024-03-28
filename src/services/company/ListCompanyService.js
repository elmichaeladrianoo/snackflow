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
exports.ListCompanyService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class ListCompanyService {
    listCompany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, CNPJ, email, corporateReason, fantasyName, cep, city, state, country }) {
            try {
                const listcompany = yield prismaClient.company.findMany({
                    where: {
                        OR: [
                            { id: id },
                            { CNPJ: CNPJ },
                            { email: email },
                            { corporateReason: corporateReason },
                            { fantasyName: fantasyName },
                            { cep: cep },
                            { city: city },
                            { state: state },
                            { country: country }
                        ],
                    }, select: {
                        id: true,
                        corporateReason: true,
                        fantasyName: true,
                        CNPJ: true,
                        address: true,
                        cep: true,
                        number: true,
                        city: true,
                        state: true,
                        country: true,
                        phone: true,
                        email: true,
                        website: true,
                        status: true,
                        created_at: true,
                        updated_at: true,
                    }
                });
                return listcompany;
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
exports.ListCompanyService = ListCompanyService;
