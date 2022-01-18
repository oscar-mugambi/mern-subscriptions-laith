"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkAuth_1 = require("../middleware/checkAuth");
const User = require('../models/User');
dotenv_1.default.config();
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
        return res.json({ errors, data: null });
    }
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });
    if (user) {
        return res.json({
            errors: { msg: 'Email already in use', data: null },
        });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await User.create({
        email,
        password: hashedPassword,
    });
    const token = jsonwebtoken_1.default.sign({
        email: newUser.email,
    }, process.env.JWT_SECRET, {
        expiresIn: 360000,
    });
    res.json({
        errors: [],
        data: {
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
            },
        },
    });
    return;
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({
            errors: [{ msg: 'Invalid credentials' }],
            data: null,
        });
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.json({
            errors: [{ msg: 'Invalid credentials' }],
            data: null,
        });
    }
    const token = await jsonwebtoken_1.default.sign({
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: 360000,
    });
    return res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        },
    });
});
router.get('/me', checkAuth_1.checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user });
    return res.send({
        error: [],
        data: {
            user: {
                id: user._id,
                email: user.email,
            },
        },
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map