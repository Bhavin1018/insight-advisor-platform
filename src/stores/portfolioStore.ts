
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface PortfolioState {
  portfolios: Portfolio[];
  selectedPortfolio: string | null;
  setSelectedPortfolio: (portfolioId: string) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  getPortfolioById: (id: string) => Portfolio | undefined;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolios: [
        {
          id: "portfolio_2024_Q4",
          fileName: "portfolio_2024_Q4.csv",
          name: "Q4 2024 Portfolio",
          totalValue: "$127,450",
          totalReturn: "+8.3%",
          holdings: 12,
          sharpeRatio: "1.2",
          ytdReturn: "+8.3%",
          monthReturn: "+2.1%",
          riskLevel: "Moderate",
          lastAnalyzed: "2 hours ago",
          topPerformer: "AAPL (+12.4%)",
          underperformer: "TSLA (-3.2%)"
        },
        {
          id: "portfolio_2024_Q3",
          fileName: "portfolio_2024_Q3.csv",
          name: "Q3 2024 Portfolio",
          totalValue: "$118,200",
          totalReturn: "+6.1%",
          holdings: 11,
          sharpeRatio: "1.1",
          ytdReturn: "+6.1%",
          monthReturn: "+1.8%",
          riskLevel: "Moderate",
          lastAnalyzed: "1 day ago",
          topPerformer: "MSFT (+9.7%)",
          underperformer: "META (-2.1%)"
        },
        {
          id: "retirement_portfolio",
          fileName: "retirement_portfolio.csv",
          name: "Retirement Portfolio",
          totalValue: "$245,800",
          totalReturn: "+5.7%",
          holdings: 15,
          sharpeRatio: "0.7",
          ytdReturn: "+5.7%",
          monthReturn: "+1.4%",
          riskLevel: "Conservative",
          lastAnalyzed: "4 hours ago",
          topPerformer: "VTI (+6.2%)",
          underperformer: "BND (+0.8%)"
        }
      ],
      selectedPortfolio: "portfolio_2024_Q4",
      setSelectedPortfolio: (portfolioId: string) => 
        set({ selectedPortfolio: portfolioId }),
      addPortfolio: (portfolio: Portfolio) => 
        set((state) => ({ portfolios: [...state.portfolios, portfolio] })),
      getPortfolioById: (id: string) => 
        get().portfolios.find(portfolio => portfolio.id === id)
    }),
    {
      name: 'portfolio-storage'
    }
  )
);
