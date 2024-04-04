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
exports.CreateCompanyController = void 0;
const CreateCompanyService_1 = require("../../services/company/CreateCompanyService");
class CreateCompanyController {
    createCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { corporateReason, fantasyName, CNPJ, address, cep, number, city, state, country, phone, email, website } = req.body;
            const createCompanyService = new CreateCompanyService_1.CreateCompanyService();
            const company = yield createCompanyService.createCompany({
                corporateReason,
                fantasyName,
                CNPJ,
                address,
                cep,
                number,
                city,
                state,
                country,
                phone,
                email,
                website
            });
            return res.json(company);
        });
    }
}
exports.CreateCompanyController = CreateCompanyController;
