import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Base HTTP service for making API calls
 * Provides common functionality for all API services
 */
@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected apiUrl: string = environment.apiUrl;
  protected apiTimeout: number = environment.apiTimeout;

  constructor(protected http: HttpClient) {}

  /**
   * HTTP GET request
   */
  protected get<T>(endpoint: string, params?: HttpParams, customHeaders?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = this.buildHeaders(customHeaders);
    
    return this.http.get<T>(url, { headers, params }).pipe(
      timeout(this.apiTimeout),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP POST request
   */
  protected post<T>(endpoint: string, body: any, customHeaders?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = this.buildHeaders(customHeaders);
    
    return this.http.post<T>(url, body, { headers }).pipe(
      timeout(this.apiTimeout),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP PUT request
   */
  protected put<T>(endpoint: string, body: any, customHeaders?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = this.buildHeaders(customHeaders);
    
    return this.http.put<T>(url, body, { headers }).pipe(
      timeout(this.apiTimeout),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP DELETE request
   */
  protected delete<T>(endpoint: string, customHeaders?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = this.buildHeaders(customHeaders);
    
    return this.http.delete<T>(url, { headers }).pipe(
      timeout(this.apiTimeout),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP PATCH request
   */
  protected patch<T>(endpoint: string, body: any, customHeaders?: HttpHeaders): Observable<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = this.buildHeaders(customHeaders);
    
    return this.http.patch<T>(url, body, { headers }).pipe(
      timeout(this.apiTimeout),
      catchError(this.handleError)
    );
  }

  /**
   * Build HTTP headers
   */
  private buildHeaders(customHeaders?: HttpHeaders): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Add authentication token if available
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Merge custom headers if provided
    if (customHeaders) {
      customHeaders.keys().forEach(key => {
        const value = customHeaders.get(key);
        if (value) {
          headers = headers.set(key, value);
        }
      });
    }

    return headers;
  }

  /**
   * Get authentication token from storage
   */
  private getAuthToken(): string | null {
    // This should be implemented based on your auth strategy
    // For now, returning null
    return localStorage.getItem('auth_token');
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse | TimeoutError): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof TimeoutError) {
      errorMessage = 'Request timeout. Please try again.';
    } else if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        
        // Handle specific error responses from server
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
      }
    }

    if (environment.enableLogging) {
      console.error('HTTP Error:', errorMessage, error);
    }

    return throwError(() => new Error(errorMessage));
  }
}
