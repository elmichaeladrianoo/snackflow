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
exports.ListOrderItensService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrderItensService {
    listOrderItens(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id }) {
            const order = yield prisma_1.default.order.findFirst({
                where: {
                    id: order_id
                }, select: {
                    id: true,
                    table: true,
                    status: false,
                    draft: false,
                    name: true,
                    created_at: true,
                    updated_at: false,
                    applyDiscount: false,
                    percentDiscount: false,
                    previousTotAmount: true,
                    finallyTotAmount: false,
                    company_id: true
                }
            });
            if (!order) {
                throw new Error("Pedido não existe!");
            }
            const item = yield prisma_1.default.item.findMany({
                where: {
                    order_id: order_id,
                }, select: {
                    id: true,
                    amount: true,
                    created_at: true,
                    updated_at: false,
                    order_id: true,
                    product_id: true
                }
            });
            return {
                "order": order,
                "item": item
            };
        });
    }
}
exports.ListOrderItensService = ListOrderItensService;
