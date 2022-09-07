"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LoginInstance = new mongoose_1.default.Schema({
    course: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: false }
}, {
    timestamps: true
});
exports.Login = mongoose_1.default.model('Login', LoginInstance);
