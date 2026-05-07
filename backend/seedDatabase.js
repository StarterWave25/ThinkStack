// Import required modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import the Problem schema (ensure the path matches your folder structure)
const Problem = require("./src/models/problem.model");

// Import the JSON data files
const easyPuzzles = require("./src/data/easy.json");
const mediumPuzzles = require("./src/data/medium.json");
const hardPuzzles = require("./src/data/hard.json");

// Load environment variables (to get your MONGO_URI)
dotenv.config();

// Combine all 60 puzzles into one single array
const allPuzzles = [...easyPuzzles, ...mediumPuzzles, ...hardPuzzles];

const seedDatabase = async () => {
    try {
        // 1. Connect to MongoDB
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB successfully.");

        // 2. Clear existing data (Optional but recommended so you don't get duplicates if you run this twice)
        console.log("🧹 Clearing old problems from the database...");
        await Problem.deleteMany();
        console.log("✅ Old problems deleted.");

        // 3. Insert the new data
        console.log(
            `📦 Pushing ${allPuzzles.length} new problems to the database...`,
        );
        await Problem.insertMany(allPuzzles);
        console.log("✅ All puzzles successfully seeded into the database!");

        // 4. Disconnect and exit
        console.log("🔌 Disconnecting from database...");
        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding the database:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// Execute the function
seedDatabase();
