import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined rolls array', () => {
    expect(component.rolls).toBeDefined();
  });

  it('should score zero for a gutter game', () => {
    rollMany(0, 20); // 20 rolls with 0 pins
    expect(component.getScore()).toBe(0);
  });

  it('should score 20 for all ones', () => {
    rollMany(1, 20); // 20 rolls with 1 pin each
    expect(component.getScore()).toBe(20);
  });

  it('should score 16 for a spare followed by a 3', () => {
    rollSpare();
    component.roll(3);
    rollMany(0, 17); // 17 rolls with 0 pins
    expect(component.getScore()).toBe(16);
  });

  it('should score 24 for a strike followed by a 3 and a 4', () => {
    rollStrike();
    component.roll(3);
    component.roll(4);
    rollMany(0, 16); // 16 rolls with 0 pins
    expect(component.getScore()).toBe(24);
  });

  it('should score 300 for a perfect game', () => {
    rollMany(10, 12); // 12 rolls with 10 pins each (perfect game)
    expect(component.getScore()).toBe(300);
  });

  // Helper functions to simulate rolls
  function rollMany(pins: number, rolls: number) {
    for (let i = 0; i < rolls; i++) {
      component.roll(pins);
    }
  }

  function rollSpare() {
    component.roll(5);
    component.roll(5);
  }

  function rollStrike() {
    component.roll(10);
  }
});
