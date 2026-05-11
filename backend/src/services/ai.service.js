require("dotenv").config();
const Groq = require("groq-sdk");
const getPrompt = require("../utils/getPrompt");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const AIReview = async (draft, problem) => {
    try {
        const prompt = getPrompt(draft, problem);
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.3,
        });
        if (!completion) {
            return res.status(500).json({
                success: false,
                message: "AI evaluation failed",
            });
        }
        const responseText = completion.choices[0].message.content;
        const cleanJsonString = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const AiReviewResult = JSON.parse(cleanJsonString);
        return AiReviewResult;
    } catch (error) {
        console.log("\n\n😱 AI evaluation failed!:", error);
    }
};

module.exports = AIReview;
