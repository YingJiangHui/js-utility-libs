import {
  ChildAreaData,
  getPixelGrayscaleDiff,
  rectPartitionReduce,
} from "../lib/detect-image-grayscale-percentage";

describe('rectPartition Function test', () => {
  it('can partition area', () => {
    const rectChildAreas = rectPartitionReduce({width: 1000, height: 500, numX: 10, numY: 10}, (sum, area) => {
      return sum.concat(area);
    }, [] as ChildAreaData[]);
    expect(rectChildAreas.length).toEqual(100);
    expect(rectChildAreas[0]).toEqual({
      width: 100,
      height: 50,
      x: 0,
      y: 0
    });
    expect(rectChildAreas[5]).toEqual({
      width: 100,
      height: 50,
      x: 500,
      y: 0
    });
    expect(rectChildAreas[10]).toEqual({
      width: 100,
      height: 50,
      x: 0,
      y: 50
    });
    expect(rectChildAreas[11]).toEqual({
      width: 100,
      height: 50,
      x: 100,
      y: 50
    });
    expect(rectChildAreas[rectChildAreas.length - 1]).toEqual({
      width: 100,
      height: 50,
      x: 900,
      y: 450
    });
  });
});


describe('getPixelGrayscaleDiff Function test', () => {
  it('provide one pixel get grayscale', () => {
    expect(getPixelGrayscaleDiff([1,2,3])).toEqual(2)
    expect(getPixelGrayscaleDiff([4,2,10])).toEqual(8)
    expect(getPixelGrayscaleDiff([255,2,3])).toEqual(253)
  });
});
