"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const items = await user_1.default.find().sort({ createdAt: -1 }).lean();
        res.json({ resource: 'users', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load users', error: String(error) });
    }
});
exports.default = usersRouter;
