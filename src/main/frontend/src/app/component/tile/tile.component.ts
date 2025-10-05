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

visibleImage: string | null = null;

private imageChances = [
  { type: 'house', chance: 0.1 },
  { type: 'corp', chance: 0.05 },
  { type: 'hospital', chance: 0.02 },
  { type: 'study', chance: 0.02 },
  { type: 'station', chance: 0.05, width: 20, height:40 }
];


  @Output() tileClicked = new EventEmitter<{ x: number, y: number }>();

  onClick(): void {
    this.tileClicked.emit({ x: this.x, y: this.y});
    console.log("clicked",this.x,this.y)
  }

  // imgVisibleHouse(){
  //   return Math.random() < 0.1
  //   // return true
  // }

  // imgVisibleCorp(){
  //   return Math.random() < 0.05
  //   // return true
  // }

  // imgVisibleHospital(){
  //   return Math.random() < 0.02
  //   // return true
  // }

  // imgVisibleStudy(){
  //   return Math.random() < 0.02
  //   // return true
  // }

  // imgVisibleStation(){
  //   return Math.random() < 0.05
  //   // return true
  // }

  
  getImagePath(type: string): string {
    const paths = {
      house: 'assets/Tiles/Modern/modern_houseSmall.png',
      corp: 'assets/Tiles/Modern/modern_skyscraperGlass.png',
      hospital: 'assets/Tiles/Modern/modern_villa.png',
      study: 'assets/Tiles/Modern/modern_oldBuilding.png',
      station: 'assets/Objects/banner.png'
    };
    return paths[type] ?? '';
  }
  
  getTooltip(type: string): string {
    const tooltips = {
      house: 'Dom',
      corp: 'Firma',
      hospital: 'Szpital',
      study: 'Szkoła',
      station: 'Stacja'
    };
    return tooltips[type] ?? '';
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // applyPixelArtBackground(this.tileRef.nativeElement, '#e7d3a3')
    
  }

  
ngOnInit(): void {
  this.setVisibleImage();
}

private setVisibleImage(): void {
  for (const { type, chance } of this.imageChances) {
    if (Math.random() < chance) {
      this.visibleImage = type;
      break; // tylko jedna
    }
  }
}

  getRandomClass() {
    const index = Math.floor(Math.random() * 5) + 1;
    return 'bg-' + index;
  }
  
}

