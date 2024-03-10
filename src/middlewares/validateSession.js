"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function validateSession(req, res, next) {
    //recebe token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        // validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
exports.validateSession = validateSession;
