/**
 * AI API request structure
 */
export interface AiRequest {
  prompt: string;
  context?: string;
  parameters?: AiParameters;
}

/**
 * AI API parameters
 */
export interface AiParameters {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  [key: string]: any;
}

/**
 * AI API response structure
 */
export interface AiResponse {
  id: string;
  response: string;
  model: string;
  usage?: AiUsage;
  metadata?: any;
}

/**
 * AI usage metrics
 */
export interface AiUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}
