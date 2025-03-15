export interface EUAData {
  productName?: string;
  date?: string;
  openPrice?: number;
  lastPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volume?: number;
  change?: number;
}

export interface MarketData {
  [x: string]: string | number;
  projectName: string;
  date: string;
  bidQty: number;
  bidPrice: number;
  lastTraded: number;
  offer: number;
  offerQty: number;
  trend: "up" | "down" | "stable";
}

export interface SAFData {
  code?: string;
  productName?: string;
  date?: string;
  openPrice?: number;
  lastPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volume?: number;
  change?: number;
  feedstock?: string; // 原料类型
  carbonIntensity?: number; // 碳强度 (gCO2e/MJ)
  certification?: string; // 认证标准
}
