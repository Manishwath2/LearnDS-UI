import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { ApiResponse, PaginatedApiResponse } from '../models/api-response.model';
import { LearningModule, User } from '../models/user.model';
import { API_ENDPOINTS } from '../constants/api.constants';

/**
 * Data Service for handling database/backend operations
 * This service provides methods for CRUD operations on various entities
 */
@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseHttpService {

  /**
   * Get user profile
   */
  getUserProfile(): Observable<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(API_ENDPOINTS.USER.PROFILE);
  }

  /**
   * Update user profile
   */
  updateUserProfile(userData: Partial<User>): Observable<ApiResponse<User>> {
    return this.put<ApiResponse<User>>(API_ENDPOINTS.USER.UPDATE, userData);
  }

  /**
   * Get list of learning modules with pagination
   */
  getLearningModules(page: number = 1, pageSize: number = 10, filters?: any): Observable<PaginatedApiResponse<LearningModule>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params = params.set(key, filters[key].toString());
        }
      });
    }

    return this.get<PaginatedApiResponse<LearningModule>>(API_ENDPOINTS.MODULES.LIST, params);
  }

  /**
   * Get a specific learning module by ID
   */
  getLearningModule(id: string): Observable<ApiResponse<LearningModule>> {
    return this.get<ApiResponse<LearningModule>>(API_ENDPOINTS.MODULES.DETAIL(id));
  }

  /**
   * Create a new learning module
   */
  createLearningModule(module: Partial<LearningModule>): Observable<ApiResponse<LearningModule>> {
    return this.post<ApiResponse<LearningModule>>(API_ENDPOINTS.MODULES.CREATE, module);
  }

  /**
   * Update an existing learning module
   */
  updateLearningModule(id: string, module: Partial<LearningModule>): Observable<ApiResponse<LearningModule>> {
    return this.put<ApiResponse<LearningModule>>(API_ENDPOINTS.MODULES.UPDATE(id), module);
  }

  /**
   * Delete a learning module
   */
  deleteLearningModule(id: string): Observable<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(API_ENDPOINTS.MODULES.DELETE(id));
  }

  /**
   * Generic method to fetch any resource
   * Useful for custom endpoints not covered by specific methods
   */
  fetchResource<T>(endpoint: string, params?: HttpParams): Observable<ApiResponse<T>> {
    return this.get<ApiResponse<T>>(endpoint, params);
  }

  /**
   * Generic method to create any resource
   */
  createResource<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.post<ApiResponse<T>>(endpoint, data);
  }

  /**
   * Generic method to update any resource
   */
  updateResource<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.put<ApiResponse<T>>(endpoint, data);
  }

  /**
   * Generic method to delete any resource
   */
  deleteResource<T>(endpoint: string): Observable<ApiResponse<T>> {
    return this.delete<ApiResponse<T>>(endpoint);
  }
}
