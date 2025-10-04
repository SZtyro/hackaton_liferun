import { CommonModule } from '@angular/common';
import { Component, input, ViewChild } from '@angular/core';
import { applyPixelArtBackground } from 'src/app/utils/pixelartHelper';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {

  @ViewChild("tile") tileRef;

  height = input()
  color = input()
  class = input()
  display = input()

  imgVisibleHouse(){
    return Math.random() < 0.1
    // return true
  }

  imgVisibleCorp(){
    return Math.random() < 0.01
    // return true
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // applyPixelArtBackground(this.tileRef.nativeElement, '#e7d3a3')
  }

  getRandomClass() {
    const index = Math.floor(Math.random() * 5) + 1;
    return 'bg-' + index;
  }
}
