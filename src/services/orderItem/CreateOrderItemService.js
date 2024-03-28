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
exports.CreateOrderItemService = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
class CreateOrderItemService {
    addItem(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id, product_id, amount }) {
            try {
                if (amount < 1) {
                    throw new Error('A quantidade precisa ser maior que 0 (zero)!');
                }
                // Verifica se existe um pedido com o ID fornecido
                const orderExists = yield prismaClient.order.findUnique({
                    where: {
                        id: order_id,
                    },
                });
                // Verifica se existe um produto com o ID fornecido e pega o preço
                const product = yield prismaClient.product.findUnique({
                    where: {
                        id: product_id
                    },
                    select: {
                        price: true
                    }
                });
                // Se não existir um pedido ou um produto, lança um erro
                if (!orderExists) {
                    throw new Error('Pedido não encontrado!');
                }
                if (!product) {
                    throw new Error('Produto não encontrado!');
                }
                // Calcula o preço total do item
                const totalPrice = product.price * amount;
                // Atualiza o valor total do pedido usando uma consulta SQL
                yield prismaClient.$executeRaw `UPDATE "orders" SET "previousTotAmount" = COALESCE("previousTotAmount", 0) + ${totalPrice} WHERE "id" = ${order_id};`;
                // Cria o item de pedido
                const orderItem = yield prismaClient.item.create({
                    data: {
                        order_id: order_id,
                        product_id: product_id,
                        amount: amount,
                    }
                });
                const orderUpdated = yield prismaClient.order.findFirst({
                    where: {
                        id: order_id
                    }
                });
                return {
                    order: orderUpdated,
                    orderItem: orderItem
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
exports.CreateOrderItemService = CreateOrderItemService;
