"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.get('/', (_req, res) => {
    res.send('hello world');
});
app.listen(4000, () => {
    console.log('running on port 4000');
});
//# sourceMappingURL=index.js.map