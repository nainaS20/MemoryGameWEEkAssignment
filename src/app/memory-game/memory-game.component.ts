// memory-game.component.ts
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})

export class MemoryGameComponent implements OnInit {
  cards: Card[] = [
    { imagePath: './assets/images/img1.jpg', isFlipped: false },
    { imagePath: './assets/images/img2.jpg', isFlipped: false },
    { imagePath: './assets/images/img3.jpg', isFlipped: false },
    { imagePath: './assets/images/img4.jpg', isFlipped: false },
    { imagePath: './assets/images/img5.jpg', isFlipped: false },
    { imagePath: './assets/images/img6.jpg', isFlipped: false },
    { imagePath: './assets/images/img1.jpg', isFlipped: false },
    { imagePath: './assets/images/img2.jpg', isFlipped: false },
    { imagePath: './assets/images/img3.jpg', isFlipped: false },
    { imagePath: './assets/images/img4.jpg', isFlipped: false },
    { imagePath: './assets/images/img5.jpg', isFlipped: false },
    { imagePath: './assets/images/img6.jpg', isFlipped: false },
  ];

  moves: number = 0;
  misses: number = 0;
  flippedCards: number[] = [];
  matchedPairs: Card[] = [];

  ngOnInit() {
    this.shuffleCards();
  }

  shuffleCards() {
    this.cards = this.shuffle([...this.cards]);
  }

  flipCard(index: number) {
    if (!this.cards[index].isFlipped && this.flippedCards.length < 2) {
      this.cards[index].isFlipped = true;
      this.flippedCards.push(index);

      if (this.flippedCards.length === 2) {
        this.moves++;
        setTimeout(() => this.checkForMatch(), 1000);
      }
    }
  }

  checkForMatch() {
    const [index1, index2] = this.flippedCards;

    if (this.cards[index1].imagePath === this.cards[index2].imagePath) {
      this.matchedPairs.push(this.cards[index1]);
    } else {
      this.cards[index1].isFlipped = false;
      this.cards[index2].isFlipped = false;
      this.misses++;
    }

    this.flippedCards = [];

    if (this.matchedPairs.length === this.cards.length / 2) {
      alert('Congratulations! You matched all pairs.');
    }
  }

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

resetGame() {
  this.moves = 0;
  this.misses = 0;
  this.shuffleCards();
  this.resetCards();
}

private resetCards() {
  this.cards.forEach(card => (card.isFlipped = false));
  this.flippedCards = [];
  this.matchedPairs = [];
}
}