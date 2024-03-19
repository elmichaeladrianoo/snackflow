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
        return __awaiter(this, arguments, void 0, function* ({ user_id, company_id }) {
            const companyUser = yield prismaClient.companyUser.findMany({
                where: {
                    OR: [
                        { user_id: user_id },
                        { company_id: company_id }
                    ]
                }, select: {
                    user_id: true,
                    company_id: true
                }
            });
            return companyUser;
        });
    }
}
exports.ListCompanyFromUserService = ListCompanyFromUserService;
