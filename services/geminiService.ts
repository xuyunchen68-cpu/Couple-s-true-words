import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIQuestion = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        你是一个情侣酒局真心话游戏的主持人。
        请生成一个“真心话”题目。
        要求：
        1. 针对情侣关系，风格要暧昧、甜蜜、稍微有点劲爆（Spicy）但不低俗。
        2. 有趣，能引发两人深入的互动或脸红的回忆。
        3. 只返回题目内容本身，不要加任何前缀、引号或解释。
        4. 语言：简体中文。
        5. 长度简短有力，不超过30个字。
      `,
    });

    const text = response.text;
    return text ? text.trim() : "抱歉，AI 喝醉了，请再试一次～";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "网络有点小差错，不如这就亲对方一下当作惩罚？";
  }
};
