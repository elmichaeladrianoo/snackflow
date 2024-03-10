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
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../../services/user/DeleteUserService");
class DeleteUserController {
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { inId } = req.body;
            const createUserService = new DeleteUserService_1.DeleteUserService();
            const ObjReturn = yield createUserService.deleteUserById({ inId });
            return res.status(200).json(ObjReturn);
        });
    }
}
exports.DeleteUserController = DeleteUserController;
