"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = __importDefault(require("../models/activity"));
const database_1 = require("../config/database");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const seed = async () => {
    try {
        console.log('Seed the octofit_db database with test data');
        await (0, database_1.connectDatabase)();
        await Promise.all([
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            user_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const [teamNorth, teamSouth] = await team_1.default.create([
            {
                name: 'North Pulse',
                city: 'Seattle',
                motto: 'Consistency wins',
                totalPoints: 0,
            },
            {
                name: 'South Striders',
                city: 'Austin',
                motto: 'Train together, rise together',
                totalPoints: 0,
            },
        ]);
        const users = await user_1.default.create([
            {
                name: 'Maya Chen',
                email: 'maya.chen@octofit.local',
                age: 29,
                fitnessLevel: 'advanced',
                team: teamNorth._id,
            },
            {
                name: 'Noah Patel',
                email: 'noah.patel@octofit.local',
                age: 34,
                fitnessLevel: 'intermediate',
                team: teamNorth._id,
            },
            {
                name: 'Ava Morales',
                email: 'ava.morales@octofit.local',
                age: 26,
                fitnessLevel: 'advanced',
                team: teamSouth._id,
            },
            {
                name: 'Liam Brooks',
                email: 'liam.brooks@octofit.local',
                age: 31,
                fitnessLevel: 'beginner',
                team: teamSouth._id,
            },
        ]);
        const seedUsers = users;
        const maya = seedUsers[0];
        const noah = seedUsers[1];
        const ava = seedUsers[2];
        const liam = seedUsers[3];
        const activities = await activity_1.default.create([
            {
                user: maya._id,
                type: 'run',
                durationMinutes: 42,
                caloriesBurned: 430,
                pointsEarned: 86,
                occurredAt: new Date('2026-06-19T06:45:00Z'),
            },
            {
                user: noah._id,
                type: 'cycle',
                durationMinutes: 55,
                caloriesBurned: 520,
                pointsEarned: 104,
                occurredAt: new Date('2026-06-19T07:30:00Z'),
            },
            {
                user: ava._id,
                type: 'strength',
                durationMinutes: 48,
                caloriesBurned: 390,
                pointsEarned: 78,
                occurredAt: new Date('2026-06-20T17:00:00Z'),
            },
            {
                user: liam._id,
                type: 'walk',
                durationMinutes: 35,
                caloriesBurned: 170,
                pointsEarned: 34,
                occurredAt: new Date('2026-06-20T18:10:00Z'),
            },
            {
                user: maya._id,
                type: 'yoga',
                durationMinutes: 30,
                caloriesBurned: 150,
                pointsEarned: 30,
                occurredAt: new Date('2026-06-21T06:20:00Z'),
            },
            {
                user: ava._id,
                type: 'swim',
                durationMinutes: 40,
                caloriesBurned: 360,
                pointsEarned: 72,
                occurredAt: new Date('2026-06-21T12:00:00Z'),
            },
        ]);
        const pointsByUser = {};
        for (const activity of activities) {
            const userId = String(activity.user);
            pointsByUser[userId] = (pointsByUser[userId] || 0) + activity.pointsEarned;
        }
        const teamNorthPoints = (pointsByUser[String(maya._id)] || 0) + (pointsByUser[String(noah._id)] || 0);
        const teamSouthPoints = (pointsByUser[String(ava._id)] || 0) + (pointsByUser[String(liam._id)] || 0);
        await Promise.all([
            team_1.default.findByIdAndUpdate(teamNorth._id, {
                members: [maya._id, noah._id],
                totalPoints: teamNorthPoints,
            }),
            team_1.default.findByIdAndUpdate(teamSouth._id, {
                members: [ava._id, liam._id],
                totalPoints: teamSouthPoints,
            }),
        ]);
        const rankedUsers = seedUsers
            .map((user) => ({
            user: user._id,
            points: pointsByUser[String(user._id)] || 0,
            rank: 0,
        }))
            .sort((a, b) => b.points - a.points)
            .map((entry, index) => ({ ...entry, rank: index + 1 }));
        await leaderboard_1.default.create({
            period: '2026-W25',
            entries: rankedUsers,
            updatedAt: new Date(),
        });
        await workout_1.default.create([
            {
                title: 'Morning Cardio Blast',
                difficulty: 'beginner',
                targetMuscleGroups: ['legs', 'core'],
                durationMinutes: 25,
                estimatedCalories: 220,
                recommendedFor: ['fat-loss', 'endurance'],
            },
            {
                title: 'Power Strength Circuit',
                difficulty: 'intermediate',
                targetMuscleGroups: ['chest', 'back', 'arms'],
                durationMinutes: 40,
                estimatedCalories: 340,
                recommendedFor: ['strength', 'muscle-gain'],
            },
            {
                title: 'Elite HIIT Ladder',
                difficulty: 'advanced',
                targetMuscleGroups: ['full-body'],
                durationMinutes: 32,
                estimatedCalories: 410,
                recommendedFor: ['performance', 'conditioning'],
            },
        ]);
        console.log('Seeding complete. Collections populated: users, teams, activities, leaderboard, workouts.');
    }
    catch (error) {
        console.error('Seeding failed:', error);
        process.exitCode = 1;
    }
    finally {
        await (0, database_1.disconnectDatabase)();
    }
};
void seed();
