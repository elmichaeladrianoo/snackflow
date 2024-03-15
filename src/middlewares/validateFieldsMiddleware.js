"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFieldsMiddleware = void 0;
// Função para validar CPF
const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
        digit = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digit) {
        return false;
    }
    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
        digit = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digit) {
        return false;
    }
    return true;
};
// Função para validar email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validateFieldsMiddleware = (req, res, next) => {
    const { cpf, email } = req.body;
    console.log('vai validar');
    if (!cpf || !validateCPF(cpf)) {
        return res.status(400).json({ error: 'CPF inválido' });
    }
    if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }
    next();
};
exports.validateFieldsMiddleware = validateFieldsMiddleware;
