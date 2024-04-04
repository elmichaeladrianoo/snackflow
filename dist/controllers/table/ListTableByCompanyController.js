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
exports.ListTableByCompanyController = void 0;
const ListTableByCompanyService_1 = require("./../../services/table/ListTableByCompanyService");
class ListTableByCompanyController {
    listTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id, status } = req.params;
            const listTableByCompanyService = new ListTableByCompanyService_1.ListTableByCompanyService();
            const table = yield listTableByCompanyService.listTableByCompany({ company_id, status });
            return res.status(200).json(table);
        });
    }
}
exports.ListTableByCompanyController = ListTableByCompanyController;
