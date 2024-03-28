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
exports.ListCategoryService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class ListCategoryService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_id }) {
            if (!company_id) {
                throw new Error("Informe a empresa!");
            }
            try {
                const company = yield prismaClient.company.findFirst({
                    where: {
                        id: parseInt(company_id)
                    }
                });
                if (!company) {
                    throw new Error("Empresa não encontrada.");
                }
                const categories = yield prismaClient.category.findMany({
                    where: {
                        company_id: parseInt(company_id)
                    }
                });
                return {
                    companyCategory: Object.assign(Object.assign({}, company), { categories: categories })
                };
            }
            catch (err) {
                throw new Error("Erro ao buscar categorias: " + err.message);
            }
            finally {
                yield prismaClient.$disconnect(); // Sempre fechamos a conexão com o banco de dados.
            }
        });
    }
}
exports.ListCategoryService = ListCategoryService;
