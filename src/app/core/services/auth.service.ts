import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants/api.constants';

/**
 * Authentication response interface
 */
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn?: number;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface RegistrationData {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Authentication Service
 * Handles user authentication, token management, and user state
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    super(undefined as any); // Will be properly injected
    
    // Initialize subjects with stored user data
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
    
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!storedUser);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Get current user value
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Login user
   */
  login(credentials: LoginCredentials): Observable<ApiResponse<AuthResponse>> {
    return this.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.storeAuthData(response.data);
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  /**
   * Register new user
   */
  register(data: RegistrationData): Observable<ApiResponse<AuthResponse>> {
    return this.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.storeAuthData(response.data);
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): Observable<ApiResponse<void>> {
    return this.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT, {}).pipe(
      tap(() => {
        this.clearAuthData();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
      })
    );
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    return this.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.storeAuthData(response.data);
        }
      })
    );
  }

  /**
   * Store authentication data
   */
  private storeAuthData(authData: AuthResponse): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authData.token);
    if (authData.refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
    }
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(authData.user));
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Get stored user from localStorage
   */
  private getStoredUser(): User | null {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}
