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
        return __awaiter(this, arguments, void 0, function* ({ table_id, company_id }) {
            try {
                const table = yield prisma_1.default.table.findFirst({
                    where: {
                        id: parseInt(table_id),
                        company_id: parseInt(company_id),
                        status: true, // Apenas mesas com status true
                    },
                    select: {
                        command_id: true
                    }
                });
                if (table) {
                    // Extrair os IDs dos comandos
                    const commandIds = table.command_id;
                    // Encontrar todas as comandas associadas aos IDs dos comandos
                    const commands = yield prisma_1.default.command.findMany({
                        where: {
                            id: commandIds,
                            available: true // Apenas comandos com status available true
                        },
                        select: {
                            id: true,
                            nameAlias: true,
                            available: true,
                            virtual: true,
                            finallyTotAmount: true,
                            created_at: true,
                        }
                    });
                    // Retornar os comandos encontrados
                    return commands;
                }
                else {
                    // Se não houver comandas encontradas, retornar um array vazio
                    console.log("Não encontrou nenhuma mesa com o ID fornecido");
                    return [];
                }
            }
            catch (error) {
                console.error('Erro ao listar comandos:', error);
                throw new Error("Erro ao listar comandos");
            }
            finally {
                prisma_1.default.$disconnect();
            }
        });
    }
}
exports.ListCommandByTableService = ListCommandByTableService;
