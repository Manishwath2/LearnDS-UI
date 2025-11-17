import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiService } from '../../core/services/ai.service';
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Demo component showing how to use the API services
 * This component demonstrates integration with AI API and Database services
 */
@Component({
  selector: 'app-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrl: './api-demo.component.css'
})
export class ApiDemoComponent implements OnInit {
  
  aiResponse: string = '';
  modules: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private aiService: AiService,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Example: Check authentication status
    this.authService.isAuthenticated$.subscribe(isAuth => {
      console.log('User authenticated:', isAuth);
    });
  }

  /**
   * Example: Call AI service
   */
  callAiService(): void {
    this.isLoading = true;
    this.error = '';
    
    const request = {
      prompt: 'Explain what a binary search tree is in simple terms',
      context: 'Teaching data structures to beginners'
    };

    this.aiService.chat(request).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.aiResponse = response.data.response;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }

  /**
   * Example: Fetch learning modules from database
   */
  fetchModules(): void {
    this.isLoading = true;
    this.error = '';

    this.dataService.getLearningModules(1, 10).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.modules = response.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }

  /**
   * Example: Generate content using AI
   */
  generateContent(topic: string): void {
    this.isLoading = true;
    
    this.aiService.generate(`Create a lesson plan for ${topic}`, {
      maxTokens: 500,
      temperature: 0.7
    }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          console.log('Generated content:', response.data.response);
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
      }
    });
  }
}
