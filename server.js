require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/nexus', async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: `Generate a business strategy for: ${req.body.details}` }],
            model: "llama-3.3-70b-versatile",
        });
        res.json({ success: true, data: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(3000, () => console.log('🚀 NexusAI Backend is LIVE on port 3000'));