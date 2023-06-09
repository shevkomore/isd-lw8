import { Point } from "./point";
import { Shape } from "./shape";

export class MultiPointShape extends Shape {
    points: Point[] = []

    constructor(points: Point[], center: Point, rotation:number, size: number){
        super(center, rotation, size)
        this.points = points
    }

    transformPoint(before: Point){
        return {
            x: (before.x*Math.cos(this.rotation)-before.y*Math.sin(this.rotation)) * this.size + this.position.x,
            y: (before.x*Math.sin(this.rotation)+before.y*Math.cos(this.rotation)) * this.size + this.position.y
        }
    }

    override draw(canvas: CanvasRenderingContext2D, color: string = "orange"): void {
        if(this.points.length < 2){
            canvas.fillStyle = "dark-gray"
            this.points.forEach(o => MultiPointShape.drawPoint(this.transformPoint(o), canvas))
            return
        }
        canvas.strokeStyle = color
        canvas.fillStyle = color
        let a = this.transformPoint(this.points[0]), b;
        MultiPointShape.drawPoint(a, canvas)
        for(let i = 1; i < this.points.length; ++i){
            b = this.transformPoint(this.points[i])
            MultiPointShape.drawPoint(b, canvas)
            canvas.lineTo(a.x, a.y)
            a = b
        }
        canvas.moveTo(a.x, a.y)
        canvas.lineTo(this.transformPoint(this.points[0]).x, this.transformPoint(this.points[0]).y)
        canvas.closePath()
        canvas.stroke()
        canvas.save()
    }
    static drawPoint(point: Point, canvas: CanvasRenderingContext2D){
        canvas.moveTo(point.x, point.y)
        canvas.arc(point.x, point.y, 2,0,Math.PI*2);
        canvas.fill()
    }
}
