const fileToUrl = (file: File) => {
    const blob = new Blob([file]);// 文件转化成二进制文件
    return URL.createObjectURL(blob); //转化成url
  };
  
  const fileUrlToImage = (fileUrl: string) => {
    return new Promise<HTMLImageElement>((resolve,reject) => {
      const img = new Image();
      img.src = fileUrl;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject();
      };
    });
  };
  
  const createCanvas = () => document.createElement('canvas');
  
  const getCanvasCtxByDrawImage = (canvas: HTMLCanvasElement,image: HTMLImageElement,paddingRate: number=0) => {
    const paddingX = image.width*paddingRate
    const paddingY = image.height*paddingRate
    canvas.width = image.width-(paddingX*2);
    canvas.height = image.height-(paddingY*2);
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image,paddingX,paddingY,image.width,image.height);
    return ctx;
  };
  
  const getRandomInt = (min: number,max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  export class GrayscaleStandardConfig {
    detectingPointNum = 1000;
    diff = 50;
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
  const getPixelGrayscaleDiff = ([r,g,b]: RgbaType) => {
    return Math.max(Math.abs(r - g),Math.abs(r - b),Math.abs(g - b));
  };
  
  // 判断是否为灰度点
  const detectIsGrayscalePoint = (expectedDiffValue: number,actualDiffValue: number) => {
    return actualDiffValue < expectedDiffValue ? 1 : 0;
  };
  
  
  const getCanvasCtxPixelData = (ctx: CanvasRenderingContext2D,[x,y]: PosType) => {
    return ctx?.getImageData(x,y,1,1).data || [0,0,0,0];
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
  
  export const getImageFileGrayscalePercentage = async(file: File,_config: Partial<GrayscaleStandardConfig>): Promise<GrayscalePercentage> => {
    const config = new GrayscaleStandardConfig(_config)
    const fileUrl = fileToUrl(file);
    const img = await fileUrlToImage(fileUrl);
    const canvas = createCanvas();
    const ctx = getCanvasCtxByDrawImage(canvas,img,config.paddingRate);
    if (!ctx) return 0;
    let grayPointNum = 0;
  
    const areaWidth = canvas.width / config.separatedAreasNumX;
    const areaHeight = canvas.height / config.separatedAreasNumY;
    const areaDetectingPointNum = config.detectingPointNum / (config.separatedAreasNumX * config.separatedAreasNumY);
    for (let y = 0; y < config.separatedAreasNumY; y++) {
      for (let x = 0; x < config.separatedAreasNumX; x++) {
        const startPos: PosType = [x * areaWidth,y * areaHeight];
        grayPointNum += detectAreaGrayscale(ctx,startPos,[areaWidth,areaHeight],areaDetectingPointNum,config.diff);
      }
    }
    URL.revokeObjectURL(fileUrl);
    return grayPointNum / config.detectingPointNum;
  };
  
  export const getImageFileGrayscalePercentageFn = (config: GrayscaleStandardConfig) => {
    return (file: Parameters<typeof getImageFileGrayscalePercentage>[0]) => {
      return getImageFileGrayscalePercentage(file,config);
    };
  };
  