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
exports.UpdateProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UpdateProductService {
    updateProductById(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Atualizando o produto incluindo a data atual
                const now = new Date();
                const updatedProduct = yield prisma.product.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, newData), { updated_at: now })
                });
                const objReturn = {
                    status: "Atualizado",
                    conteudo: { updatedProduct }
                };
                return objReturn;
            }
            catch (err) {
                throw new Error(`Erro ao atualizar produto: ${err.message}`);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.UpdateProductService = UpdateProductService;
