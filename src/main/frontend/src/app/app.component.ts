import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerlinNoise } from './utils/perlinNoise';
import { TileComponent } from './component/tile/tile.component';
import { applyPixelArtBackground } from './utils/pixelartHelper';
import { ProgressBarComponent } from "./component/progress-bar/progress-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {

  @ViewChild("footer") box;
  @ViewChild("stats") stats;
 
  
  margin = 1;
  height = 64;
  size = 64;

  tiles:any = [
    // {x: 0, y:0},
    // {x: 1, y:0},
    // {x: 2, y:0},
    // {x: 1, y:1},
    // {x: 0, y:1},
    // {x: 0, y:2},
  ]

  get width(): number {
    return Math.sqrt(3) / 2 * this.height;
  }

  ngOnInit(): void {
    let perlin = new PerlinNoise(new Date().getTime());
    

    for(let x = 0; x <= this.size; x++)
      for(let y = 0; y <= this.size; y++){
        let noise = perlin.noise(x * 0.1, y * 0.1)
        this.tiles.push({
          x:x, 
          y:y, 
          // color: this.getRandomHexColor(),
          display: noise.toFixed(2),
          class: this.getType(noise)
        })
      }
  }

  ngAfterViewInit(): void {
    applyPixelArtBackground(this.box.nativeElement, "#535353");
    applyPixelArtBackground(this.stats.nativeElement, "#535353");
  }

  getRandomHexColor(init?: number): string {
    const hex = Math.floor( (init ? init : Math.random()) * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    return `#${hex}`;
  }

  getType(noise: number): string {
    console.log(noise);

    if (noise > -0.05 && noise < 0.05) {
      return 'road';
    }
    
    switch(true){
      case noise > -1 && noise <= -0.4: return 'water'
      case noise > -0.4 && noise <= -0.3: return 'sand'
      case noise > -0.3 && noise <= 0.4: return 'grass'
      // case noise > 0.3: return 'sand'
      case noise > 0.4: return 'rock'
      default: return 'snow'
    }


  }

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  isDragging = false;
  startX = 0;
  startY = 0;
  scrollLeft = 0;
  scrollTop = 0;

  onMouseDown(event: MouseEvent): void {
    // tylko lewy przycisk myszy (0)
    event.preventDefault();
    event.stopPropagation();
  
    if (event.button !== 0) return;

    this.isDragging = true;
    const container = this.scrollContainer.nativeElement;
    this.startX = event.pageX;
    this.startY = event.pageY;
    this.scrollLeft = container.scrollLeft;
    this.scrollTop = container.scrollTop;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    event.preventDefault(); // zapobiega np. zaznaczaniu tekstu
    const container = this.scrollContainer.nativeElement;
    const dx = event.pageX - this.startX;
    const dy = event.pageY - this.startY;
    container.scrollLeft = this.scrollLeft - dx;
    container.scrollTop = this.scrollTop - dy;
  }

  onMouseUp(): void {
    this.isDragging = false;
  }
}
