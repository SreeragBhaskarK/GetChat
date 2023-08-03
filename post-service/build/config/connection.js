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
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const { AWS_RDS_USER, AWS_RDS_PASSWORD, AWS_RDS_DB, AWS_RDS_URL, AWS_RDS_PORT } = process.env;
exports.sequelize = new sequelize_1.Sequelize({
    database: AWS_RDS_DB,
    username: AWS_RDS_USER,
    password: AWS_RDS_PASSWORD,
    host: AWS_RDS_URL,
    dialect: 'postgres'
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.authenticate();
            console.log('GetChat Post Serive DB Ready');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.default = connect;
