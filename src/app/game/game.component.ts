import { Component } from '@angular/core';
import { Frame } from './game';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  rolls: any[] = [];
  pinsRemaining: number = 10;
  turns: number = 0;
  playerName: string = '';
  startGame: boolean = true;
  showTotal: boolean = false;
  frames: Frame[] = [];
  frame: number = 0;
  firstRollTotal: number = 0;
  secondRollTotal: number = 0;
  frameTotal: number[] = [];

  roll(pins: number) {
    let frameTotal;
    this.turns++;
    this.pinsRemaining -= pins;
    this.rolls.push(pins);

    if (this.turns < 2) {
      this.firstRollTotal = pins;
    } else if (this.turns == 2) {
      this.secondRollTotal = pins;
    }

    if (this.frame >= 10 && this.pinsRemaining < 1) {
      this.showTotal = true;
      alert('Game over!!!');
    }

    if (this.pinsRemaining < 1 && this.turns < 2) {
      // IF STRIKE
      this.frameTotal.push(this.firstRollTotal + this.secondRollTotal);
      frameTotal = this.frameTotal.reduce((prev, next) => prev + next, 0);
      this.frames.push({
        frame: this.frame,
        mark: 'X',
        firstRollTotal: this.firstRollTotal,
        secondRollTotal: this.secondRollTotal,
        total: frameTotal,
        spare: false,
        strike: true,
      });
      this.nextFrame();
    }
    if (this.pinsRemaining < 1 && this.turns === 2) {
      // IF SPARE
      this.frameTotal.push(this.firstRollTotal + this.secondRollTotal);
      frameTotal = this.frameTotal.reduce((prev, next) => prev + next, 0);
      this.frames.push({
        frame: this.frame,
        mark: '/',
        firstRollTotal: this.firstRollTotal,
        secondRollTotal: this.secondRollTotal,
        total: frameTotal,
        spare: true,
        strike: false,
      });
      this.nextFrame();
    } else if (this.turns === 2 && this.pinsRemaining > 0) {
      this.frameTotal.push(this.firstRollTotal + this.secondRollTotal);
      frameTotal = this.frameTotal.reduce((prev, next) => prev + next, 0);
      this.frames.push({
        frame: this.frame,
        mark: '',
        firstRollTotal: this.firstRollTotal,
        secondRollTotal: this.secondRollTotal,
        total: frameTotal,
        spare: false,
        strike: false,
      });
      this.nextFrame();
    } else if (this.turns === 1 && this.pinsRemaining > 0) {
      this.frame++;
    }
  }

  nextFrame(): void {
    this.turns = 0;
    this.pinsRemaining = 10;
    console.log('NEXT FRAME CALLED');
  }

  spin(): number {
    let pins = Math.floor(Math.random() * this.pinsRemaining);
    return pins;
  }

  start(): void {
    this.startGame != this.startGame;
  }
  submit(value: string) {
    console.log(value);
  }

  getScore(): number {
    let score = 0;
    let rollIndex = 0;
    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        score += 10 + this.strikeBonus(rollIndex);
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        score += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        score += this.sumOfBallsInFrame(rollIndex);
        rollIndex += 2;
      }
    }
    return score;
  }

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  private strikeBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private spareBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 2];
  }

  private sumOfBallsInFrame(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}
