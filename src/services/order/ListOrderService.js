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
exports.ListOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrderService {
    listOrder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id, company_id, draft, status, table, name }) {
            let where = {};
            // Adicionar condições à consulta com base nos parâmetros fornecidos
            if (order_id) {
                where.id = order_id;
            }
            if (company_id) {
                where.company_id = company_id;
            }
            if (draft !== undefined) {
                where.draft = draft;
            }
            if (status !== undefined) {
                where.status = status;
            }
            if (table !== undefined) {
                where.table = table;
            }
            if (name) {
                where.name = name;
            }
            const orders = yield prisma_1.default.order.findMany({
                where: where,
            });
            return orders;
        });
    }
}
exports.ListOrderService = ListOrderService;
