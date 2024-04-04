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
exports.DeleteProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeleteProductService {
    deleteProductById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            try {
                const product = yield prisma.product.delete({
                    where: {
                        id: id,
                    },
                });
                const ObjReturn = {
                    nome: product.name,
                    id: product.id,
                    status: "Removido",
                };
                return ObjReturn;
            }
            catch (err) {
                throw new Error(err);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.DeleteProductService = DeleteProductService;
