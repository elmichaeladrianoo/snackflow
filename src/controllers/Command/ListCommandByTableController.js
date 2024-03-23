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
exports.ListCommandByTableController = void 0;
const ListCommandByTableService_1 = require("./../../services/Command/ListCommandByTableService");
class ListCommandByTableController {
    listCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table } = req.body;
            const listCommandByTableService = new ListCommandByTableService_1.ListCommandByTableService();
            const commands = yield listCommandByTableService.listCommand({ table });
            res.json(commands);
        });
    }
}
exports.ListCommandByTableController = ListCommandByTableController;
