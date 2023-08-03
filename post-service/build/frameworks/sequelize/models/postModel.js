"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postModel = (sequelize) => {
    const Post = sequelize.define('Posts', {
        user_id: {
            type: sequelize_1.DataTypes.STRING
        },
        posts: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON)
        }
    });
    sequelize.sync();
    return Post;
};
exports.default = postModel;
