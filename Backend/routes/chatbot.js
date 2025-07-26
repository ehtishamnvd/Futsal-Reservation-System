import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Ground from "../models/ground.js";
import Academy from "../models/academy.js";
import Team from "../models/team.js";
const router = express.Router();

const getGroundAvailabilityDetails = (grounds) => {
    if (!grounds || grounds.length === 0) {
        return "No ground information is available at the moment.";
    }

    const today = new Date();
    const day = today.getDate(); 
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
   
    const todayDateString = `${year}-${month}-${day}`;
    
    return grounds.map(ground => {
   
        const todaySlotData = ground.slot?.find(s => s.date === todayDateString);

        const totalSlots = 10;
        const allSlots = Array.from({ length: totalSlots }, (_, i) => i + 1);

        const slotDetails = allSlots.map(slotNumber => {
            let status = "Available";

            if (todaySlotData && todaySlotData.time) {
                const slotInfo = todaySlotData.time[slotNumber - 1];
                if (slotInfo && slotInfo.bookedby && slotInfo.bookedby !== "") {
                    status = `Booked by ${slotInfo.bookedby}`;
                }
            }
            return {
                slot: slotNumber,
                status: status
            };
        });

        return {
            name: ground.name,
            location: ground.address, 
            price: ground.price || "N/A",
            availability_today: {
                date: todayDateString,
                slots: slotDetails
            }
        };
    });
};


router.post("/", async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).send({ error: "Prompt is required." });
        }
        
        const grounds = await Ground.find({});
        const academies = await Academy.find({});
        const teams = await Team.find({});

        const detailedGroundsInfo = getGroundAvailabilityDetails(grounds);

        const context = `
You are a professional and friendly chatbot for a Futsal Field Reservation System.
Your main goal is to provide information about our services based on the data provided below.
When a user asks about ground availability for today, you MUST use the 'availability_today' data to list the status of ALL slots (both Available and Booked).
You MUST follow these formatting rules for your responses:
1.  When you list items (grounds, academies, teams, etc.), you MUST use a numbered list.
2.  The name of any ground, academy, or team in your response MUST be bold.
Use Markdown for this (e.g., "**Ground Name**").
3.  When a user asks for details about a specific item, present the information inside a Markdown blockquote (starting with '>').
Here is the data you have access to:
**Grounds Information (Including Today's Slot Availability):**
${JSON.stringify(detailedGroundsInfo, null, 2)}
**Academies Information:**
${JSON.stringify(academies, null, 2)}
**Teams Information:**
${JSON.stringify(teams, null, 2)}
Based on this information and the formatting rules, please answer the following user query:
`;
        const result = await model.generateContent([context, prompt]);
        const response = await result.response;
        const text = await response.text();
        res.send({ response: text });
    } catch (error) {
        console.error("--- FULL ERROR in /api/chatbot route ---");
        console.error(error);
        console.error("--- END OF ERROR ---");
        res.status(500).send({ error: "An unexpected error occurred. Please try again later." });
    }
});

export default router;