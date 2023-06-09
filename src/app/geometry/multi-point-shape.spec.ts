import { MultiPointShape } from './multi-point-shape';
import { distance } from './point';

describe('MultiPointShape', () => {
  let obj: MultiPointShape;
  beforeEach(() => {
    obj = new MultiPointShape([{x:1,y:2}],{x:1,y:-2},0,1)
  })
  it('should create an instance', () => {
    expect(obj).toBeTruthy();
  })
  it('should not change inner point position when transforming', () => {
    expect(obj.transformPoint(obj.points[0])).toEqual(obj.transformPoint(obj.points[0]))
    expect(obj.transformPoint(obj.points[0])).toEqual(obj.transformPoint(obj.points[0]))
  })
  it('should change point distance from center by a factor of size', () => {
    obj.position = {x:0, y:0}
    obj.size = 1
    let prev = obj.transformPoint(obj.points[0])
    obj.size = 0.5
    expect(obj.transformPoint(obj.points[0]).y).toEqual(prev.y / 2)
    obj.size = 3
    expect(obj.transformPoint(obj.points[0]).x).toEqual(prev.x * 3)
  })
  it('should not change dimentions after translation', ()=>{
    let prev = distance(obj.position, obj.transformPoint(obj.points[0]))
    obj.position = {x:0, y: 9999}
    expect(distance(obj.position, obj.transformPoint(obj.points[0]))).toEqual(prev)
  })
  it('should not change distance after rotation', ()=> {
    let prev = distance(obj.position, obj.transformPoint(obj.points[0]))
    obj.rotation = 28.5
    expect(distance(obj.position, obj.transformPoint(obj.points[0]))).toEqual(prev)
  })
  it('should not change point position after rotating by a multiple of 2*pi', () => {
    let prev = obj.transformPoint(obj.points[0])
    obj.rotation += Math.PI *2 * 30
    expect(obj.transformPoint(obj.points[0]).x).toBeCloseTo(prev.x, 0.001)
    expect(obj.transformPoint(obj.points[0]).y).toBeCloseTo(prev.y, 0.001)
  })
  it('should be in an opposite direction after 1*pi rotation', ()=> {
    obj.position = {x:0, y:0}
    let prev = obj.transformPoint(obj.points[0])
    obj.rotation += Math.PI
    expect(obj.transformPoint(obj.points[0]).x).toBeCloseTo(-prev.x, 0.001)
    expect(obj.transformPoint(obj.points[0]).y).toBeCloseTo(-prev.y, 0.001)
  })
});
