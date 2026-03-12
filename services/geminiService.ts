
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIcebreaker = async (userName: string, interests: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 creative, fun icebreaker questions for a dating app. The person's name is ${userName} and they are interested in ${interests.join(', ')}. Keep it lighthearted and engaging.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "Hey! How's your day going?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hi! I noticed we have some shared interests. What's your favorite thing about them?";
  }
};

export const checkCompatibility = async (user1: any, user2: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Based on these two profiles, rate their compatibility on a scale of 0-100 and give a one-sentence reason. 
      Person 1: ${JSON.stringify(user1)}
      Person 2: ${JSON.stringify(user2)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reason: { type: Type.STRING }
          },
          required: ["score", "reason"]
        }
      }
    });
    const jsonStr = response.text?.trim() || '{"score": 75, "reason": "You both seem adventurous!"}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return { score: 80, reason: "You both share some great vibes!" };
  }
};

/**
 * Transcribes audio data using gemini-3-flash-preview
 */
export const transcribeAudio = async (base64Data: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: "Transcribe this audio accurately. Return only the transcription text, no additional comments or formatting." }
          ]
        }
      ],
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Transcription Error:", error);
    return "";
  }
};
