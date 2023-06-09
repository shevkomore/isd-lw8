export interface Point{
    x: number,
    y: number
}
export function distance(a: Point, b: Point): number {
    let delta = {x:b.x-a.x, y:b.y-a.y}
    return Math.sqrt(delta.x*delta.x + delta.y*delta.y)
}