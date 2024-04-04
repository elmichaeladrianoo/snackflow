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
exports.CreateCommandController = void 0;
const CreateCommandService_1 = require("./../../services/Command/CreateCommandService");
class CreateCommandController {
    commandCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nameAlias, company_id, virtual } = req.body;
            const createCommandService = new CreateCommandService_1.CreateCommandService();
            const command = yield createCommandService.createCommand({ nameAlias, company_id, virtual });
            return res.json(command);
        });
    }
}
exports.CreateCommandController = CreateCommandController;
