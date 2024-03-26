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
exports.ListCommandByCompanyController = void 0;
const ListCommandByCompanyService_1 = require("./../../services/Command/ListCommandByCompanyService");
class ListCommandByCompanyController {
    listCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company_id = {
                    company_id: req.query.company_id // Convertendo para string
                };
                const listCommandByCompanyService = new ListCommandByCompanyService_1.ListCommandByCompanyService();
                const commands = yield listCommandByCompanyService.listCommand(company_id);
                return res.json(commands);
            }
            catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.ListCommandByCompanyController = ListCommandByCompanyController;
