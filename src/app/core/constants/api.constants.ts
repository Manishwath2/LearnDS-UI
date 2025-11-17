/**
 * API endpoint constants
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  
  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    LIST: '/user/list'
  },
  
  // Learning module endpoints
  MODULES: {
    LIST: '/modules',
    DETAIL: (id: string) => `/modules/${id}`,
    CREATE: '/modules',
    UPDATE: (id: string) => `/modules/${id}`,
    DELETE: (id: string) => `/modules/${id}`
  },
  
  // AI endpoints
  AI: {
    CHAT: '/ai/chat',
    GENERATE: '/ai/generate',
    ANALYZE: '/ai/analyze',
    EXPLAIN: '/ai/explain'
  }
};

/**
 * HTTP header constants
 */
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept'
};

/**
 * Storage keys for local/session storage
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE: 'language'
};
