dotenv.config();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Problem = require("./src/models/problem.model");
const easy = require("./src/data/easy.json");
const medium = require("./src/data/medium.json");
const hard = require("./src/data/hard.json");

const allProblems = [...easy, ...medium, ...hard];

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully.");

        console.log("Clearing old problems from the database...");
        await Problem.deleteMany();
        console.log("Old problems deleted.");

        console.log(
            `Pushing ${allProblems.length} new problems to the database...`,
        );
        await Problem.insertMany(allProblems);
        console.log("All puzzles successfully seeded into the database!");

        console.log("Disconnecting from database...");
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding the database:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedDatabase();
