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
exports.CreateCompanyUserController = void 0;
const CreateCompanyUserService_1 = require("./../../services/companyUser/CreateCompanyUserService");
class CreateCompanyUserController {
    createCompanyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, company_id } = req.body;
            const createCompanyUserService = new CreateCompanyUserService_1.CreateCompanyUserService();
            const companyUser = yield createCompanyUserService.createCompanyUser({ user_id, company_id });
            res.json(companyUser);
        });
    }
}
exports.CreateCompanyUserController = CreateCompanyUserController;
