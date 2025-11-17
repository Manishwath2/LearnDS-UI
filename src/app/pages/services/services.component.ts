import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Service } from '../../services/data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  loading = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
        this.loading = false;
      }
    });
  }
}
