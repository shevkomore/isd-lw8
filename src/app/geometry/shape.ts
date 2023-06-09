import { Color } from "@ionic/core";
import { Point } from "./point";

export abstract class Shape{
    position: Point
    rotation: number
    size: number
    color: Color = "#CCC"
    constructor(position:Point, rotation:number, size:number){
        this.position = position
        this.rotation = rotation
        this.size = size
    }
    abstract draw(canvas: CanvasRenderingContext2D): void;
}