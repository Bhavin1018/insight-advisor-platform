
export interface Portfolio {
  id: string;
  fileName: string;
  name: string;
  totalValue: string;
  totalReturn: string;
  holdings: number;
  sharpeRatio: string;
  ytdReturn: string;
  monthReturn: string;
  riskLevel: string;
  lastAnalyzed: string;
  topPerformer: string;
  underperformer: string;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  allocation: string;
  color: string;
}

export interface PortfolioAllocation {
  category: string;
  percentage: string;
  color: string;
}
