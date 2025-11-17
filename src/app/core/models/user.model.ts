/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Learning module/course structure
 */
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
  topics?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
