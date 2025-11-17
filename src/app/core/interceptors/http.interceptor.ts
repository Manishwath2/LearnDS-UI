import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { STORAGE_KEYS } from '../constants/api.constants';

/**
 * HTTP Interceptor for adding authentication token to requests
 * This is a functional interceptor compatible with Angular 18 standalone approach
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from storage
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  // Clone request and add authorization header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

/**
 * HTTP Interceptor for handling errors globally
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized. Please login again.';
            // Optionally redirect to login or refresh token
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `Error: ${error.statusText}`;
        }
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};

/**
 * HTTP Interceptor for logging requests and responses (development only)
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  console.log(`[HTTP] ${req.method} ${req.url}`);

  return next(req).pipe(
    catchError((error) => {
      const elapsed = Date.now() - started;
      console.error(`[HTTP] ${req.method} ${req.url} failed after ${elapsed}ms`, error);
      return throwError(() => error);
    })
  );
};
