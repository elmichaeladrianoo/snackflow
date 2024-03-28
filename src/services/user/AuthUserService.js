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
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            try {
                // Validar se o email existe  
                const user = yield prisma_1.default.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (!user) {
                    throw new Error("Usuário ou senha incorreto(s)");
                }
                // Validar a senha
                const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!passwordMatch) {
                    throw new Error("Usuário ou senha incorreto(s)");
                }
                // Gerar token JWT e devolver os dados do usuário
                const token = (0, jsonwebtoken_1.sign)({
                    name: user.name,
                    email: user.email
                }, process.env.JWT_SECRET || '', // Corrigido: adicionei uma string vazia como fallback
                {
                    subject: user.id.toString(), // Corrigido: converti para string
                    expiresIn: '30d'
                });
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token
                };
            }
            catch (error) {
                throw new Error("Erro ao autenticar usuário: " + error.message);
            }
            finally {
                prisma_1.default.$disconnect();
            }
        });
    }
}
exports.AuthUserService = AuthUserService;
