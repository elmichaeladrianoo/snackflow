"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMaskValid = void 0;
const dataValidator_1 = require("../util/dataValidator"); // Corrigido o import
function isMaskValid(req, res, next) {
    try {
        const { cpf } = req.body;
        if (!cpf) {
            throw new Error("Erro ao tentar criar usuário: CPF não fornecido!");
        }
        if (!(0, dataValidator_1.validateCPF)(cpf)) { // Utilizado o CPF formatado para validação
            return res.status(400).json({ Message: 'Erro ao tentar criar usuário: CPF Inválido!' });
        }
        return next();
    }
    catch (err) {
        console.error("Erro ao tentar criar usuário:", err);
        return res.status(400).json({ error: err.message });
    }
}
exports.isMaskValid = isMaskValid;
