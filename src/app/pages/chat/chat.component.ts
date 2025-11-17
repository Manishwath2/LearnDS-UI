import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: Message[] = [
    {
      text: 'Hello! I\'m your AI mentor. How can I help you today?',
      sender: 'mentor',
      timestamp: new Date()
    }
  ];
  
  currentMessage = '';

  sendMessage() {
    if (this.currentMessage.trim()) {
      // Add user message
      this.messages.push({
        text: this.currentMessage,
        sender: 'user',
        timestamp: new Date()
      });

      // Simulate mentor response
      setTimeout(() => {
        this.messages.push({
          text: 'I received your message: "' + this.currentMessage + '". This is a mock response. Real-time chat will be connected to a backend service.',
          sender: 'mentor',
          timestamp: new Date()
        });
        
        // Auto-scroll to bottom
        setTimeout(() => this.scrollToBottom(), 100);
      }, 1000);

      this.currentMessage = '';
      
      // Auto-scroll to bottom
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  scrollToBottom() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
