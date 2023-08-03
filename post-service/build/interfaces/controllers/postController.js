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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const postRepository_1 = __importDefault(require("../repositories/postRepository"));
const getPosts_1 = __importDefault(require("../../usecases/getPosts"));
const connection_1 = require("../../config/connection");
const postRepository = new postRepository_1.default(connection_1.sequelize);
class PostController {
}
_a = PostController;
PostController.getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPosts = new getPosts_1.default(postRepository);
        const result = yield getPosts.execute();
        if (result) {
            res.status(200).json({ success: true, message: "successfully fetching posts", data: result });
        }
        else {
            res.status(400).json({ success: false, message: "failed fetching posts" });
        }
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
PostController.postPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    console.log(req.file, '////////');
    try {
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
exports.default = PostController;
