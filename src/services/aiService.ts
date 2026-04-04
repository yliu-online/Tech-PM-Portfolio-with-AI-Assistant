/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "../data";

export class AIService {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.5-flash";

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

  private requestCache = new Map<string, string>();
  private tokenCache = new Map<string, string[]>();

  async *askAboutMeStream(question: string, signal?: AbortSignal) {
    const systemInstruction = `
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

    // Request-level caching: detect identical inputs and reuse tokens
    if (this.tokenCache.has(question)) {
      const tokens = this.tokenCache.get(question)!;
      for (const token of tokens) {
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        yield token;
      }
      return;
    }

    let attempt = 0;
    const maxRetries = 3;
    let responseStream;

    while (attempt < maxRetries) {
      try {
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        responseStream = await this.ai.models.generateContentStream({
          model: this.model,
          contents: question,
          config: {
            systemInstruction,
          },
        });
        break;
      } catch (error: any) {
        if (error.name === 'AbortError' || signal?.aborted) throw error;
        const isRateLimit = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota');
        const isUnavailable = error?.status === 503 || error?.message?.includes('503');
        
        if ((isRateLimit || isUnavailable) && attempt < maxRetries - 1) {
          attempt++;
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(res => setTimeout(res, delay));
        } else {
          throw error;
        }
      }
    }

    if (!responseStream) return;

    try {
      const tokens: string[] = [];
      for await (const chunk of responseStream) {
        if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
        const text = chunk.text;
        if (text) {
          tokens.push(text);
          yield text;
        }
      }
      
      // Token-level and request-level caching
      this.tokenCache.set(question, tokens);
      this.requestCache.set(question, tokens.join(""));
    } catch (error: any) {
      if (error.name === 'AbortError' || signal?.aborted) throw error;
      console.error("AI Service Error:", error);
      yield "I'm experiencing some technical difficulties. Please try again later or contact Yang directly.";
    }
  }

  async askAboutMe(question: string) {
    if (this.requestCache.has(question)) {
      return this.requestCache.get(question)!;
    }
    
    let fullResponse = "";
    for await (const chunk of this.askAboutMeStream(question)) {
      fullResponse += chunk;
    }
    return fullResponse;
  }
}

export const aiService = new AIService();
