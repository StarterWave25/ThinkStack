require("dotenv").config();
const mongoose = require("mongoose");
const Draft = require("../models/draft.model");
const Submission = require("../models/submission.model");

const flushDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await Draft.deleteMany();
    await Submission.deleteMany();
    const drafts = await Draft.find();
    const submissions = await Submission.find();
    console.log("drafts", drafts);
    console.log("submissions", submissions);
    mongoose.connection.close();
    process.exit(1);
};
flushDB();
