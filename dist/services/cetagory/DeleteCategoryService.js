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
exports.DeleteCategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeleteCategoryService {
    deleteCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar se existem produtos associados a esta categoria
                const productsCount = yield prisma.product.count({
                    where: {
                        category_id: id,
                    },
                });
                if (productsCount > 0) {
                    throw new Error(`Não é possível excluir a categoria porque existem produtos associados a ela.`);
                }
                // Excluir a categoria se não houver produtos associados
                const deletedCategory = yield prisma.category.delete({
                    where: {
                        id: id,
                    },
                });
                const ObjReturn = {
                    nome: deletedCategory.name,
                    id: deletedCategory.id,
                    status: "Removido",
                };
                return ObjReturn;
            }
            catch (err) {
                throw new Error(err.message);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.DeleteCategoryService = DeleteCategoryService;
