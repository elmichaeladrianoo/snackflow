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
exports.DeleteOrderItemController = void 0;
const DeleteOrderItemService_1 = require("./../../services/orderItem/DeleteOrderItemService");
class DeleteOrderItemController {
    DeleteOrderItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_id, item_id } = req.body;
                const deleteOrderItemService = new DeleteOrderItemService_1.DeleteOrderItemService();
                const deletedOrderItem = yield deleteOrderItemService.deleteItem({ order_id, item_id });
                return res.json(deletedOrderItem);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.DeleteOrderItemController = DeleteOrderItemController;
