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
exports.UpdateCommandController = void 0;
const UpdateCommandService_1 = require("./../../services/Command/UpdateCommandService");
class UpdateCommandController {
    updateCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { command_id, nameAlias, virtual } = req.body;
            const updateCommandService = new UpdateCommandService_1.UpdateCommandService();
            const command = yield updateCommandService.updateCommand({ command_id, nameAlias, virtual });
            res.json(command);
        });
    }
}
exports.UpdateCommandController = UpdateCommandController;
