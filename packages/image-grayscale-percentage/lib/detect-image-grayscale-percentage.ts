const createCanvas = () => document.createElement('canvas');

const getCanvasCtxByDrawImage = (canvas: HTMLCanvasElement,image: HTMLImageElement,paddingRate: number=0) => {
  const paddingX = image.width*paddingRate
  const paddingY = image.height*paddingRate
  canvas.width = image.width-(paddingX*2);
  canvas.height = image.height-(paddingY*2);
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image,paddingX,paddingY,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
  return ctx;
};

const getRandomInt = (min: number,max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export class GrayscaleStandardConfig {
  detectingPointsNum = 1000;
  diff = 5;
  separatedAreasNumX = 10;
  separatedAreasNumY = 10;
  paddingRate?: number
  constructor(props?: Partial<GrayscaleStandardConfig>) {
    Object.assign(this,props)
  }
}

type GrayscalePercentage = number
type RgbaType = number[]|Uint8ClampedArray


type XType = number
type YType = number
type PosType = [XType,YType]

type WidthType = number
type HeightType = number
type SizeType = [WidthType,HeightType]
// 获取像素点的灰度差值
export const getPixelGrayscaleDiff = ([r,g,b]: RgbaType) => {
  return Math.max(Math.abs(r - g),Math.abs(r - b),Math.abs(g - b));
};

// 判断是否为灰度点
const detectIsGrayscalePoint = (expectedDiffValue: number,actualDiffValue: number) => {
  return actualDiffValue < expectedDiffValue ? 1 : 0;
};


const getCanvasCtxPixelData = (ctx: CanvasRenderingContext2D,[x,y]: PosType) => {
  return ctx.getImageData(x,y,1,1).data;
};

const detectAreaAtOnePixelGrayscaleByRandom = (ctx: CanvasRenderingContext2D,[startX,startY]: PosType,[width,height]: SizeType,expectedDiffValue: number) => {
  const randomX = getRandomInt(startX,startX + width);
  const randomY = getRandomInt(startY,startY + height);
  const rgbaList = getCanvasCtxPixelData(ctx,[randomX,randomY]);
  const diff = getPixelGrayscaleDiff(rgbaList);
  return detectIsGrayscalePoint(expectedDiffValue,diff);
};

const detectAreaGrayscale = (ctx: CanvasRenderingContext2D,pos: PosType,size: SizeType,detectingPointNum: number,expectedDiffValue: number) => {
  return new Array(detectingPointNum).fill(0).reduce((diff) => diff + detectAreaAtOnePixelGrayscaleByRandom(ctx,pos,size,expectedDiffValue),0);
};

export type RectPartitionParams = {width:WidthType,height:HeightType,numX:number,numY:number}
export type ChildAreaData = {x:XType,y:YType,width:WidthType,height:HeightType}
export const rectPartitionReduce = <T=any>({width,height,numX,numY}:RectPartitionParams, callback:(previousValue:T, childAreaData:ChildAreaData)=>T, initialValue: T)=>{
  const childAreaWidth = width / numX
  const childAreaHeight = height / numY
  let reduce:T = initialValue
  for (let y = 0; y < numX; y++) {
    for (let x = 0; x < numY; x++) {
        // 进入一个区域回调一次
       reduce = callback?.(reduce,{x: x * childAreaWidth,y:y * childAreaHeight,width:childAreaWidth,height:childAreaHeight})
    }
  }
  
  return reduce
}

export const detectImageGrayscalePercentage = async(img: HTMLImageElement, config?: Partial<GrayscaleStandardConfig>): Promise<GrayscalePercentage> => {
  const innerConfig = new GrayscaleStandardConfig(config)
  const canvas = createCanvas();
  const ctx = getCanvasCtxByDrawImage(canvas,img,innerConfig.paddingRate);
  if (!ctx) return 0;
  const areaDetectingPointNum = innerConfig.detectingPointsNum / (innerConfig.separatedAreasNumX * innerConfig.separatedAreasNumY);
  
  const grayPointTotalNum =rectPartitionReduce({width:canvas.width,height:canvas.height,numX:innerConfig.detectingPointsNum,numY:innerConfig.detectingPointsNum},
    (grayPointNum,{x,y,width,height})=>{
      return grayPointNum + detectAreaGrayscale(ctx,[x,y],[width,height],areaDetectingPointNum,innerConfig.diff)
    },0)
  
  return grayPointTotalNum / innerConfig.detectingPointsNum;
};