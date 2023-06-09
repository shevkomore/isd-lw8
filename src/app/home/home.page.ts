import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MultiPointShape } from '../geometry/multi-point-shape';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements AfterViewInit{
  canvasContext: CanvasRenderingContext2D | null = null

  private rectangle = new MultiPointShape([
    {x:0, y:0},
    {x:0, y:10},
    {x:15, y:10},
    {x:15, y:0}
  ],
  {x:80, y:80}, 0.5, 3)
  private trapezoid1 = new MultiPointShape([
    {x:0, y:0},
    {x:5, y:10},
    {x:15, y:10},
    {x:20, y:0}
  ],
  {x:80, y:140}, -0.3, 4)
  private trapezoid2 = new MultiPointShape([
    {x:0, y:0},
    {x:5, y:10},
    {x:15, y:10},
    {x:15, y:0}
  ],
  {x:40, y:60}, Math.PI, 2)
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  constructor() {}
  ngAfterViewInit(): void {
      this.canvasContext = this.canvas.nativeElement.getContext("2d")
      if(this.canvasContext != null){
        this.rectangle.draw(this.canvasContext);
        this.trapezoid1.draw(this.canvasContext,"red");
        this.trapezoid2.draw(this.canvasContext);
      }
  }
}
