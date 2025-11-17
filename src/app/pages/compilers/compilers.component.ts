import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compilers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compilers.component.html',
  styleUrls: ['./compilers.component.scss']
})
export class CompilersComponent {
  compilers = [
    { name: 'JavaScript', icon: '🟨', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Python', icon: '🐍', color: 'from-blue-500 to-blue-600' },
    { name: 'Java', icon: '☕', color: 'from-red-500 to-red-600' },
    { name: 'C++', icon: '⚡', color: 'from-blue-400 to-blue-500' },
    { name: 'Go', icon: '🔷', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Rust', icon: '🦀', color: 'from-orange-500 to-orange-600' }
  ];
}
