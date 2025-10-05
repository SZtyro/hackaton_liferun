import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';

export enum EducationType {
  NONE = 0,
  PRIMARY = 1,
}
export enum JobType {
  RETIRED = 0,
}

export type Character = {
  age: number;
  health: number;
  education: EducationType;
  career_exp: number;
  job: {
    gross_salary: number;
    type: JobType;
  };
  money: number;
  stress_factor: number;
  happiness_factor: number;
  expenses: any[];
  hours: number;

};

export type Coordinates = {x: number, y: number};

export const transportDurationPerTile = 0.4;

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {

  data: InputSignal<Character> = input<Character>();
  coordinates: InputSignal<Coordinates> = input<Coordinates>();

  @Output()
  update = new EventEmitter<Character>();


  calculateIncome(salary: number){
    let d: Character = this.data();
    d.money += this.calculateNettIncome(salary);
  }

  move(tileCount: number) {
    let d = this.data();
    d.hours -= tileCount * transportDurationPerTile;
    this.update.emit(this.data());
  }

  private calculateNettIncome(gross: number){
    //TODO
    return gross;
  }
}
