import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { applyPixelArtBackground } from 'src/app/utils/pixelartHelper';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {

  @ViewChild("tile") tileRef;

  height = input()
  color = input()
 // class = input()
  display = input()

  @Input() x: number;
  @Input() y: number;
  @Input() class!: string;

  @Input() selected = false;
@Input() endSelected = false;
@Input() inPath: boolean = false;




  @Output() tileClicked = new EventEmitter<{ x: number, y: number }>();

  onClick(): void {
    this.tileClicked.emit({ x: this.x, y: this.y});
    console.log("clicked",this.x,this.y)
  }

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
