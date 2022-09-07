"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// import { StringRegexOptions } from "joi";
const mongoose_1 = __importDefault(require("mongoose"));
const UserInstance = new mongoose_1.default.Schema({
    fullname: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true, },
    password: { type: String, required: true },
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model('User', UserInstance);
