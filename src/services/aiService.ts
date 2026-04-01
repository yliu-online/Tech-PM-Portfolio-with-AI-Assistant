/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "../data";

export class AIService {
  private ai: GoogleGenAI;
  private model: string = "gemini-3-flash-preview";
  private cache: Map<string, string> = new Map();

  constructor() {
    const apiKey = 
      process.env.GEMINI_API_KEY || 
      process.env.GOOGLE_API_KEY || 
      process.env.API_KEY || 
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      (import.meta as any).env?.VITE_GOOGLE_API_KEY ||
      "";
    this.ai = new GoogleGenAI({ apiKey });
  }

  private getSystemInstruction() {
    return `
      You are an AI assistant for Yang Liu, a Senior Product Leader. 
      Your goal is to answer questions from recruiters and hiring managers based on the following data:
      
      Name: ${portfolioData.name}
      Title: ${portfolioData.title}
      Bio: ${portfolioData.about.bio}
      Philosophy: ${portfolioData.about.philosophy}
      Industries: ${portfolioData.about.industries.join(", ")}
      
      Experience:
      ${portfolioData.experience.map(exp => `
        - ${exp.role} at ${exp.company} (${exp.period})
          Achievements: ${exp.achievements.join("; ")}
          Metrics: ${exp.metrics}
      `).join("\n")}
      
      Projects:
      ${portfolioData.projects.map(p => `
        - ${p.title}: ${p.problem} -> ${p.solution}. Impact: ${p.impact}. Tags: ${p.tags.join(", ")}
      `).join("\n")}
      
      Skills:
      - Generative AI: ${portfolioData.skills.generativeAI.join(", ")}
      - Cloud & Infra: ${portfolioData.skills.cloudInfra.join(", ")}
      - Technical: ${portfolioData.skills.technical.join(", ")}
      - Leadership: ${portfolioData.skills.leadership.join(", ")}
      
      Guidelines:
      - Be professional, confident, and concise.
      - Focus on impact and metrics.
      - Refer to Yang using "they/their" pronouns.
      - If asked something not in the data, politely say you don't have that information but highlight a related strength.
      - Use markdown for formatting.
    `;
  }

  async askAboutMe(question: string) {
    const normalizedQuestion = question.trim().toLowerCase();
    if (this.cache.has(normalizedQuestion)) {
      return this.cache.get(normalizedQuestion)!;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: question,
        config: {
          systemInstruction: this.getSystemInstruction(),
        },
      });
      const text = response.text || "I'm sorry, I couldn't generate a response at this time.";
      this.cache.set(normalizedQuestion, text);
      return text;
    } catch (error) {
      console.error("AI Service Error:", error);
      return "I'm experiencing some technical difficulties. Please try again later or contact Yang directly.";
    }
  }

  async *askAboutMeStream(question: string) {
    const normalizedQuestion = question.trim().toLowerCase();
    if (this.cache.has(normalizedQuestion)) {
      yield this.cache.get(normalizedQuestion)!;
      return;
    }

    try {
      const response = await this.ai.models.generateContentStream({
        model: this.model,
        contents: question,
        config: {
          systemInstruction: this.getSystemInstruction(),
        },
      });

      let fullText = "";
      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          yield text;
        }
      }
      this.cache.set(normalizedQuestion, fullText);
    } catch (error) {
      console.error("AI Service Error:", error);
      yield "I'm experiencing some technical difficulties. Please try again later or contact Yang directly.";
    }
  }
}

export const aiService = new AIService();
