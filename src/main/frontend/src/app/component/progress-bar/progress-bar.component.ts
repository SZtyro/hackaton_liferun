import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, ViewChild } from '@angular/core';
import { applyPixelArtBackground } from 'src/app/utils/pixelartHelper';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @ViewChild('content') content;
  progress: InputSignal<number> = input();
  partCount: InputSignal<number> = input(24);
  color: InputSignal<string> = input("#505ccc");

  bars = [];
  segmentWidth:number = 1;

  ngOnInit(): void {
    let count: number = this.partCount();
    for(let i = 0; i < count ; i++) this.bars.push(i);
  }

  ngAfterViewInit(): void {
    applyPixelArtBackground(this.content.nativeElement, this.color(), 32, 0.20)
    let barWidth = (this.content.nativeElement as HTMLElement).clientWidth;
    this.segmentWidth = barWidth / this.partCount();
  }

  getBarOffset(barIndex:number){
    return (barIndex ) * this.segmentWidth;
  }


  getProgressOffset(){
    return (this.partCount() - this.progress()) * -1 * this.segmentWidth;
  }
}
