"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAuth = async (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({
            errors: [
                {
                    msg: 'unauthorized',
                },
            ],
        });
    }
    token = token.split(' ')[1];
    try {
        const user = (await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
        if (!user) {
            return res.status(403).json({
                errors: [
                    {
                        msg: 'unauthorized',
                    },
                ],
            });
        }
        req.user = user.email;
        next();
        return;
    }
    catch (error) {
        return res.status(403).json({
            errors: [
                {
                    msg: 'unauthorized',
                },
            ],
        });
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map