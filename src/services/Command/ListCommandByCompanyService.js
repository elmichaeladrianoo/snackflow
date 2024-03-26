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
exports.ListCommandByCompanyService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCommandByCompanyService {
    listCommand(_a) {
        return __awaiter(this, arguments, void 0, function* ({ company_id }) {
            try {
                console.log(company_id);
                const command = yield prisma_1.default.command.findMany({
                    where: {
                        company_id: parseInt(company_id),
                        available: true
                    }, select: {
                        id: true,
                        nameAlias: true
                    }
                });
                return command;
            }
            catch (err) {
                throw new Error("Erro ao buscar commandas!");
            }
            finally {
                prisma_1.default.$disconnect;
            }
        });
    }
}
exports.ListCommandByCompanyService = ListCommandByCompanyService;
