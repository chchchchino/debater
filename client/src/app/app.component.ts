import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Message {
  sender: string;
  text: string;
}

interface DebateState {
  debater1: string;
  debater2: string;
  subject: string;
  messages: Message[];
  current_turn: 'debater1' | 'debater2';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
  title = 'Real-Time AI Debate Arena';

  // Form Inputs
  debater1: string = 'Socrates';
  debater2: string = 'Aristotle';
  subject: string = 'Is technology separating us more than connecting us?';

  // Active debate parameters
  messages: Message[] = [];
  currentTurn: 'debater1' | 'debater2' = 'debater1';

  // Flow control states
  debateStarted: boolean = false;
  isGenerating: boolean = false;
  errorMessage: string = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  resetDebate(): void {
    this.messages = [];
    this.currentTurn = 'debater1';
    this.debateStarted = false;
    this.errorMessage = '';
  }

  executeNextTurn(): void {
    if (this.isGenerating) return;

    this.isGenerating = true;
    this.errorMessage = '';
    
    // Set debateStarted to true when the first turn starts
    this.debateStarted = true;

    const payload: DebateState = {
      debater1: this.debater1,
      debater2: this.debater2,
      subject: this.subject,
      messages: this.messages,
      current_turn: this.currentTurn
    };

    // Call our Python FastAPI server endpoint
    this.http.post<DebateState>('http://localhost:8000/api/debate', payload)
      .subscribe({
        next: (response) => {
          this.messages = response.messages;
          this.currentTurn = response.current_turn;
          this.isGenerating = false;

          // Scroll immediately to capture new speech bubble
          setTimeout(() => this.scrollToBottom(), 50);
        },
        error: (error) => {
          this.isGenerating = false;
          this.errorMessage = 'Could not communicate with the debate server. Please make sure the backend is running at http://localhost:8000 and the OpenAI API key is set.';
          console.error('Debate API Error:', error);
        }
      });
  }

  // Helper to check if a message belongs to Debater 1
  isDebater1(senderName: string): boolean {
    return senderName.toLowerCase() === this.debater1.toLowerCase();
  }
}

