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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, cpf, phone, address }) {
            try {
                if (name.length < 5) {
                    throw new Error("Nome inválido!");
                }
                if (!email.includes('@')) { // Verificar se o e-mail é válido
                    throw new Error("E-mail incorreto!");
                }
                const userAlreadyExists = yield prisma_1.default.user.findFirst({
                    where: {
                        OR: [
                            { email: email },
                            { cpf: cpf }
                        ]
                    }
                });
                if (userAlreadyExists) {
                    throw new Error("CPF/E-mail já cadastrado!");
                }
                const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
                const user = yield prisma_1.default.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: passwordHash,
                        cpf: cpf,
                        phone: phone,
                        address: address,
                    },
                    select: {
                        id: true,
                        created_at: true,
                    }
                });
                return user;
            }
            catch (err) {
                throw err; // Permitir que o erro original seja propagado
            }
        });
    }
}
exports.CreateUserService = CreateUserService;
