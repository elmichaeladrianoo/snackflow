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
exports.CloseOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CloseOrderService {
    closeOrder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id, applyDiscount, percentDiscount }) {
            let newPrice;
            const oldOrder = yield prisma_1.default.order.findFirst({
                where: {
                    id: order_id
                }
            });
            if (!oldOrder) {
                throw new Error('Pedido não encontrado!');
            }
            if (applyDiscount) {
                if (percentDiscount <= 0) {
                    throw new Error('percentual de desconto precisa ser maior que 0 ');
                }
                if (percentDiscount > 100) {
                    throw new Error('percentual de desconto precisa ser entre 1 e 100 ');
                }
                newPrice = oldOrder.previousTotAmount - (oldOrder.previousTotAmount * (percentDiscount / 100));
            }
            else {
                newPrice = oldOrder.previousTotAmount;
            }
            const order = yield prisma_1.default.order.update({
                data: {
                    draft: false,
                    applyDiscount: applyDiscount,
                    percentDiscount: percentDiscount,
                    finallyTotAmount: newPrice
                },
                where: {
                    id: order_id
                }
            });
            return order;
        });
    }
}
exports.CloseOrderService = CloseOrderService;
