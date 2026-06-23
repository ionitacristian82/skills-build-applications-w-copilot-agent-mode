"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const items = await leaderboard_1.default.find()
            .populate('entries.user', 'name email')
            .sort({ updatedAt: -1 })
            .lean();
        res.json({ resource: 'leaderboard', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error: String(error) });
    }
});
exports.default = leaderboardRouter;
