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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateProductService {
    createProduct(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, description, bannerBase64, categoryId }) {
            try {
                if (price <= 0) {
                    throw new Error('Preço do produto precisa ser maior que zero!');
                }
                // Salvar o produto no banco de dados usando Prisma
                const product = yield prisma_1.default.product.create({
                    data: {
                        name: name,
                        price: price,
                        description: description,
                        banner: bannerBase64, // Salvar o conteúdo base64 diretamente
                        category_id: categoryId
                    },
                    include: {
                        category: true
                    }
                });
                // Formatando a resposta para incluir o campo banner como base64
                const productWithBase64Banner = Object.assign(Object.assign({}, product), { banner: bannerBase64 });
                return productWithBase64Banner;
            }
            catch (err) {
                throw new Error(err);
            }
            finally {
                prisma_1.default.$disconnect();
            }
        });
    }
}
exports.CreateProductService = CreateProductService;
