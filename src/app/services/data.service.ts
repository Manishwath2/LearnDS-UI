import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  getServices(): Observable<Service[]> {
    const mockServices: Service[] = [
      {
        id: 1,
        title: 'Data Structures',
        description: 'Learn fundamental data structures like arrays, linked lists, trees, and graphs.',
        icon: '📊'
      },
      {
        id: 2,
        title: 'Algorithms',
        description: 'Master sorting, searching, and dynamic programming algorithms.',
        icon: '⚡'
      },
      {
        id: 3,
        title: 'System Design',
        description: 'Design scalable systems and understand architecture patterns.',
        icon: '🏗️'
      },
      {
        id: 4,
        title: 'Interview Prep',
        description: 'Get ready for technical interviews with curated problems.',
        icon: '💼'
      }
    ];

    // Simulate API delay
    return of(mockServices).pipe(delay(500));
  }
}
