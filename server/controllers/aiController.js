import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Backend setup with specific API version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (req, res) => {
  try {
    const { prompt, role } = req.body;

    // 1. Model select (Gemini 2.5 use kar rahe hain)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash" // Direct 2.5 use karein
    });

    // 2. Chat History (Stateful conversation)
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `System Instruction: You are a professional ${role}. Provide expert advice.` }],
        },
        {
          role: "model",
          parts: [{ text: "Acknowledged. I will provide structured and expert responses in this role." }],
        },
      ],
      // Professional tip: Generation config add karna senior practice hai
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7, // Creativity level (0-1)
      },
    });

    // 3. User message
    const result = await chat.sendMessage(prompt);
    
    // 4. Return Data
    return res.status(200).json({
      success: true,
      data: result.response.text(), // data key use karein frontend consistency ke liye
    });

  } catch (error) {
    // Exact error debugging ke liye terminal mein print karein
    console.error("Gemini 2.5 Error Detail:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};