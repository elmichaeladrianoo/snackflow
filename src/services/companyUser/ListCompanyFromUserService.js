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
exports.ListCompanyFromUserService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class ListCompanyFromUserService {
    listCompanyUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            try {
                const companies = yield prismaClient.companyUser.findMany({
                    where: {
                        user_id: user_id
                    },
                    include: {
                        company: true
                    }
                });
                const companyIds = companies.map(company => company.company_id);
                const vinculos = yield prismaClient.company.findMany({
                    where: {
                        id: {
                            in: companyIds
                        }
                    }
                });
                return {
                    user: user_id,
                    companies: vinculos
                };
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
exports.ListCompanyFromUserService = ListCompanyFromUserService;
