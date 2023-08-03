"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connection_1 = __importDefault(require("./config/connection"));
(0, connection_1.default)();
const { PORT } = process.env;
const postRoute_1 = __importDefault(require("./frameworks/express/routes/postRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/api/v1', postRoute_1.default);
app.listen(PORT, () => console.log('GetChat Post Service Ready...'));
