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
exports.DeleteOrderItemService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class DeleteOrderItemService {
    deleteItem(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id, item_id }) {
            const deletedOrderItem = yield prisma.item.findUnique({
                where: {
                    id: item_id
                }
            });
            if (!deletedOrderItem) {
                throw new Error('Item de pedido não encontrado');
            }
            const product = yield prisma.product.findUnique({
                where: {
                    id: deletedOrderItem.product_id
                },
                select: {
                    price: true
                }
            });
            if (!product) {
                throw new Error('Produto não encontrado');
            }
            const priceRemove = deletedOrderItem.amount * product.price;
            const OrderUpdated = yield prisma.order.update({
                data: {
                    previousTotAmount: {
                        decrement: priceRemove
                    }
                },
                where: {
                    id: order_id
                }
            });
            const deletedItem = yield prisma.item.delete({
                where: {
                    id: item_id
                }
            });
            return {
                order: OrderUpdated,
                "itemDeleted": deletedItem,
            };
        });
    }
}
exports.DeleteOrderItemService = DeleteOrderItemService;
