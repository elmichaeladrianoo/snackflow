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
exports.UpdateUserService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UpdateUserService {
    updateUserById(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o campo a ser atualizado é o e-mail
                if ('email' in newData) {
                    // Verifica se o novo e-mail já está sendo usado por outro usuário
                    const existingUser = yield prisma.user.findFirst({
                        where: {
                            email: newData.email, // Força a tipagem para string
                            NOT: {
                                id: id // Exclui o próprio usuário da consulta
                            }
                        }
                    });
                    if (existingUser) {
                        // Se o e-mail já está em uso, lança um erro
                        throw new Error('E-mail em uso!');
                    }
                }
                // Obtendo a data e hora atuais
                const now = new Date();
                // Atualizando o usuário incluindo a data atual
                const updatedUser = yield prisma.user.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, newData), { updated_at: now })
                });
                const ObjReturn = {
                    status: "Atualizado",
                    conteudo: { updatedUser }
                };
                return ObjReturn;
            }
            catch (error) {
                // Se ocorrer algum erro, retorna uma resposta de erro
                throw new Error(error);
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.UpdateUserService = UpdateUserService;
