const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware configuration
app.use(cors()); // Isse frontend aur backend bina error ke connect ho jayenge
app.use(express.json());

// Keywords dictionary for AI Evaluation Algorithm
const techKeywords = [
    "mern", "redux", "context", "usememo", "indexing", "nosql", "sql",
    "microservices", "scaling", "cache", "redis", "token", "encryption", "jwt"
];

// POST Endpoint jahan frontend data bhejega
app.post('/api/analyze', (req, res) => {
    const { answer } = req.body;

    if (!answer) {
        return res.status(400).json({ success: false, error: "Answer payload is required" });
    }

    // Real keyword mapping algorithm
    let matchedKeywords = [];
    const lowercaseAnswer = answer.toLowerCase();

    techKeywords.forEach(kw => {
        if (lowercaseAnswer.includes(kw)) matchedKeywords.push(kw);
    });

    let scoreDelta = 0;
    let statusText = "Good";
    let perception = "";

    if (matchedKeywords.length >= 3) {
        scoreDelta = 8;
        statusText = "Excellent";
        perception = `Backend Verified: High technical competency. Parsed keywords: [${matchedKeywords.join(', ')}].`;
    } else if (matchedKeywords.length >= 1) {
        scoreDelta = 3;
        statusText = "Good";
        perception = `Backend Verified: Solid answer. Identified parameters: [${matchedKeywords.join(', ')}].`;
    } else {
        scoreDelta = -4;
        statusText = "Needs Work";
        perception = "Backend Verified: Low payload density. Mind your technical architecture terms.";
    }

    // Response object return karna JSON format mein
    res.json({
        success: true,
        scoreDelta: scoreDelta,
        statusText: statusText,
        interviewerPerception: perception,
        timestamp: new Date().toISOString()
    });
});

// Server boot up
app.listen(PORT, () => {
    console.log(`🚀 EchoHire Analytics Backend running on http://localhost:${PORT}`);
});