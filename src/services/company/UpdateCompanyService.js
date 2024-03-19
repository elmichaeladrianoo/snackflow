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
exports.UpdateCompanyService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UpdateCompanyService {
    updateCompany(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o campo a ser atualizado é o e-mail ou CNPJ
                if ('email' in newData || 'CNPJ' in newData) {
                    // Verifica se o novo e-mail ou CNPJ já está sendo usado por outra empresa
                    const existingCompany = yield prisma.company.findFirst({
                        where: {
                            OR: [
                                { email: newData.email }, // Força a tipagem para string
                                { CNPJ: newData.CNPJ }
                            ],
                            NOT: {
                                id: id // Exclui o próprio usuário da consulta
                            }
                        }
                    });
                    if (existingCompany) {
                        // Se o e-mail ou CNPJ já está em uso, lança um erro
                        throw new Error('E-mail ou CNPJ em uso!');
                    }
                }
                // Remove o email e CNPJ do objeto newData para evitar sua atualização
                delete newData.email;
                delete newData.CNPJ;
                // Obtendo a data e hora atuais
                const now = new Date();
                // Atualizando a empresa incluindo a data atual
                const updatedCompany = yield prisma.company.update({
                    where: { id: id },
                    data: Object.assign(Object.assign({}, newData), { updated_at: now })
                });
                const ObjReturn = {
                    status: "Atualizado",
                    conteudo: { updatedCompany }
                };
                return ObjReturn;
            }
            catch (error) {
                // Se ocorrer algum erro, retorna uma resposta de erro
                throw new Error(error.message); // Alterado para retornar apenas a mensagem de erro
            }
            finally {
                yield prisma.$disconnect();
            }
        });
    }
}
exports.UpdateCompanyService = UpdateCompanyService;
