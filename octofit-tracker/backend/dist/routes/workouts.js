"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const items = await workout_1.default.find().sort({ createdAt: -1 }).lean();
        res.json({ resource: 'workouts', count: items.length, items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load workouts', error: String(error) });
    }
});
exports.default = workoutsRouter;
