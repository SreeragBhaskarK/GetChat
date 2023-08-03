"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../../../interfaces/controllers/postController"));
const multer_1 = require("../../../interfaces/middelwares/multer");
const router = (0, express_1.Router)();
router.get('/posts', postController_1.default.getPosts);
router.post('/posts', multer_1.upload.single('img'), postController_1.default.postPosts);
exports.default = router;
