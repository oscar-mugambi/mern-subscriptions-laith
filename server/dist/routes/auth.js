"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/signup', (0, express_validator_1.body)('email').isEmail().withMessage('The email is invalid'), (0, express_validator_1.body)('password')
    .isLength({
    min: 5,
})
    .withMessage('The password is too short'), async (req, res) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => {
            return {
                message: err.msg,
            };
        });
        return res.json({ errors });
    }
    const { email, password } = req.body;
    res.json({
        email,
        password,
    });
    return;
});
exports.default = router;
//# sourceMappingURL=auth.js.map