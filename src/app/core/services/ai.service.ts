import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { AiRequest, AiResponse } from '../models/ai.model';
import { ApiResponse } from '../models/api-response.model';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../../environments/environment';

/**
 * AI Service for handling AI API interactions
 * This service can be extended to integrate with various AI providers like:
 * - OpenAI GPT
 * - Google Gemini
 * - Anthropic Claude
 * - Custom AI models
 */
@Injectable({
  providedIn: 'root'
})
export class AiService extends BaseHttpService {
  
  /**
   * Override API URL to use AI-specific endpoint
   */
  protected override apiUrl: string = environment.aiApiUrl;

  /**
   * Send a chat message to AI
   * @param request - AI request with prompt and context
   * @returns Observable of AI response
   */
  chat(request: AiRequest): Observable<ApiResponse<AiResponse>> {
    return this.post<ApiResponse<AiResponse>>(API_ENDPOINTS.AI.CHAT, request);
  }

  /**
   * Generate content using AI
   * @param prompt - The generation prompt
   * @param parameters - Optional AI parameters
   * @returns Observable of AI response
   */
  generate(prompt: string, parameters?: any): Observable<ApiResponse<AiResponse>> {
    const request: AiRequest = {
      prompt,
      parameters
    };
    return this.post<ApiResponse<AiResponse>>(API_ENDPOINTS.AI.GENERATE, request);
  }

  /**
   * Analyze content using AI
   * @param content - Content to analyze
   * @param analysisType - Type of analysis to perform
   * @returns Observable of AI response
   */
  analyze(content: string, analysisType?: string): Observable<ApiResponse<AiResponse>> {
    const request = {
      content,
      analysisType
    };
    return this.post<ApiResponse<AiResponse>>(API_ENDPOINTS.AI.ANALYZE, request);
  }

  /**
   * Get AI explanation for a concept
   * @param concept - Concept to explain
   * @param context - Additional context
   * @returns Observable of AI response
   */
  explain(concept: string, context?: string): Observable<ApiResponse<AiResponse>> {
    const request: AiRequest = {
      prompt: concept,
      context
    };
    return this.post<ApiResponse<AiResponse>>(API_ENDPOINTS.AI.EXPLAIN, request);
  }

  /**
   * Stream AI response (for real-time chat)
   * Note: Requires server-side support for streaming
   * This is a placeholder for future implementation
   */
  streamChat(request: AiRequest): Observable<string> {
    // This would require EventSource or WebSocket implementation
    // Placeholder for future streaming functionality
    throw new Error('Streaming not yet implemented');
  }
}
