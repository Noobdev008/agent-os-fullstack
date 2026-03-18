import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Backend setup with specific API version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ROLE_CONFIGS = {
    "Senior Developer": { 
        temp: 0.1, 
        systemPrompt: "You are an expert Senior Developer. Give clean, optimized code and avoid fluff." 
    },
    "Creative Writer": { 
        temp: 0.9, 
        systemPrompt: "You are a creative storyteller. Use metaphors and engaging language." 
    },
    "Career Coach": { 
        temp: 0.5, 
        systemPrompt: "You are a supportive career coach. Give actionable advice for career growth." 
    }
};


export const getAIResponse = async (req, res) => {
  try {
    const { prompt, role } = req.body;

    // 1. Role fetch karein (Agar role galat ho toh default Senior Developer)
    const config = ROLE_CONFIGS[role] || ROLE_CONFIGS["Senior Developer"];

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash" // Current stable model
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          // Yahan config.systemPrompt use karein jo humne upar object mein banaya hai
          parts: [{ text: `System Instruction: ${config.systemPrompt}` }],
        },
        {
          role: "model",
          parts: [{ text: `Acknowledged. I am now acting as a ${role}.` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: config.temp, // Yahan role-based temperature pass karein
      },
    });

    const result = await chat.sendMessage(prompt);
    
    return res.status(200).json({
      success: true,
      data: result.response.text(),
    });

  } catch (error) {
    console.error("Gemini Error Detail:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// export const getAIResponse = async (req, res) => {
//   try {
//     const { prompt, role } = req.body;

//     // 1. Model select (Gemini 2.5 use kar rahe hain)
//     const model = genAI.getGenerativeModel({ 
//         model: "gemini-2.5-flash" // Direct 2.5 use karein
//     });

//     // 2. Chat History (Stateful conversation)
//     const chat = model.startChat({
//       history: [
//         {
//           role: "user",
//           parts: [{ text: `System Instruction: You are a professional ${role}. Provide expert advice.` }],
//         },
//         {
//           role: "model",
//           parts: [{ text: "Acknowledged. I will provide structured and expert responses in this role." }],
//         },
//       ],
//       // Professional tip: Generation config add karna senior practice hai
//       generationConfig: {
//         maxOutputTokens: 1000,
//         temperature: 0.7, // Creativity level (0-1)
//       },
//     });

//     // 3. User message
//     const result = await chat.sendMessage(prompt);
    
//     // 4. Return Data
//     return res.status(200).json({
//       success: true,
//       data: result.response.text(), // data key use karein frontend consistency ke liye
//     });

//   } catch (error) {
//     // Exact error debugging ke liye terminal mein print karein
//     console.error("Gemini 2.5 Error Detail:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };