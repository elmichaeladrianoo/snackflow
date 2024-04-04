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
exports.UpdateCompanyController = void 0;
const UpdateCompanyService_1 = require("../../services/company/UpdateCompanyService");
class UpdateCompanyController {
    UpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtém o ID do usuário a ser atualizado dos parâmetros da requisição
            const id = req.body.id; // Assume-se que o ID está presente no corpo da requisição
            // Obtém os novos dados do corpo da requisição
            const newData = req.body;
            // Cria uma instância da classe UpdateUserService
            const updateCompanyService = new UpdateCompanyService_1.UpdateCompanyService();
            // Chama o método updateUserById para atualizar o usuário pelo ID fornecido
            const updatedUser = yield updateCompanyService.updateCompany(id, newData);
            // Retorna a resposta com o usuário atualizado
            return res.json(updatedUser);
        });
    }
}
exports.UpdateCompanyController = UpdateCompanyController;
