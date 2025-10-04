import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input, InputSignal, ViewChild } from '@angular/core';
import { applyPixelArtBackground } from 'src/app/utils/pixelartHelper';

export type Scenario = {
  description:string;
  title:string;
  objectives?: string[];
  iconPath?: string
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements AfterViewInit {

  @ViewChild("wrapper") wrapper;

  scenario: InputSignal<Scenario> = input()

  ngAfterViewInit(): void {
    applyPixelArtBackground(this.wrapper.nativeElement, "goldenrod");
  }


}
