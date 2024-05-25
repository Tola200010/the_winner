import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RandomService } from './services/random.service';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'the-winner';
  randomService = inject(RandomService)
  randomNumber1: number = 0;
  randomNumber2: number = 0;
  randomNumber3: number = 0;
  intervalId: any;
  isGenerating: boolean = false;
  startRandomNumberGeneration() {
    this.isGenerating = !this.isGenerating;
    if(this.isGenerating){
      this.intervalId = setInterval(() => {
        this.randomNumber1 = this.randomService.getRandomNumber(1, 9);
        this.randomNumber2 = this.randomService.getRandomNumber(1, 9);
        this.randomNumber3 = this.randomService.getRandomNumber(1, 9);
      }, 100); // Generates a new random number every 100ms
    }else{
      this.isGenerating = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.celebrate();
      }
    }
  }
  stopRandomNumberGeneration() {
    this.isGenerating = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  celebrate() {
    const duration = 3000; // in milliseconds
  
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });
  
    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}
