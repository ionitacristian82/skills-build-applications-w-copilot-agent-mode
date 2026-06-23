"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    try {
        const items = await team_1.default.find()
            .populate('members', 'name email fitnessLevel')
            .sort({ totalPoints: -1 })
            .lean();
        res.json({ resource: 'teams', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error: String(error) });
    }
});
exports.default = teamsRouter;
