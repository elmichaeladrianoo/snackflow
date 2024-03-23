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
exports.ListCommandByTableService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCommandByTableService {
    listCommand(_a) {
        return __awaiter(this, arguments, void 0, function* ({ table }) {
            try {
                // Buscar todos os pedidos associados à mesa fornecida
                const orders = yield prisma_1.default.order.findMany({
                    where: {
                        table: table
                    },
                    include: {
                        items: true
                    }
                });
                // Calcular o valor total de cada comanda
                const commandsPromises = orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                    const totalAmount = order.items.reduce((acc, item) => {
                        return acc + item.amount;
                    }, 0);
                    const updatedOrder = yield prisma_1.default.order.update({
                        where: {
                            id: order.id
                        },
                        data: {
                            finallyTotAmount: totalAmount
                        }
                    });
                    return updatedOrder.command_id;
                }));
                // Obter os IDs das comandas dos pedidos
                const commandIds = yield Promise.all(commandsPromises);
                // Buscar os dados das comandas com base nos IDs obtidos
                const commands = yield prisma_1.default.command.findMany({
                    where: {
                        id: {
                            in: commandIds
                        }
                    }
                });
                return commands;
            }
            catch (error) {
                console.error('Erro ao listar comandos:', error);
                throw error;
            }
        });
    }
}
exports.ListCommandByTableService = ListCommandByTableService;
