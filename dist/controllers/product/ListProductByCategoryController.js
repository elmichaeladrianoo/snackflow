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
exports.ListProductByCategoryController = void 0;
const ListProductByCategoryService_1 = require("./../../services/product/ListProductByCategoryService");
class ListProductByCategoryController {
    getProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const category_id = req.body.category_id 
            const { category_id } = req.query;
            if (typeof category_id === 'string') {
                const listProductByCategoryService = new ListProductByCategoryService_1.ListProductByCategoryService();
                const products = yield listProductByCategoryService.execute({ category_id });
                return res.json(products);
            }
        });
    }
}
exports.ListProductByCategoryController = ListProductByCategoryController;
