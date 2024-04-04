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
exports.CreateTableController = void 0;
const CreateTableService_1 = require("./../../services/table/CreateTableService");
class CreateTableController {
    createTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { company_id, command_id, alias } = req.body;
            const createTableService = new CreateTableService_1.CreateTableService();
            const table = yield createTableService.createTable({ company_id, command_id, alias });
            return res.status(200).json(table);
        });
    }
}
exports.CreateTableController = CreateTableController;
