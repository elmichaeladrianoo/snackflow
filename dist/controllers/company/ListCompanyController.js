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
exports.ListCompanyController = void 0;
const ListCompanyService_1 = require("./../../services/company/ListCompanyService");
class ListCompanyController {
    listCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, CNPJ, email, corporateReason, fantasyName, cep, city, state, country } = req.body;
            const listCompanyService = new ListCompanyService_1.ListCompanyService();
            const listcompany = yield listCompanyService.listCompany({ id, CNPJ, email, corporateReason, fantasyName, cep, city, state, country });
            return res.json(listcompany);
        });
    }
}
exports.ListCompanyController = ListCompanyController;
