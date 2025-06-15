
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Portfolio = Tables<'portfolios'>;
type PortfolioHolding = Tables<'portfolio_holdings'>;

export interface PortfolioWithHoldings extends Portfolio {
  holdings?: PortfolioHolding[];
  holdingsCount?: number;
}

interface PortfolioState {
  portfolios: PortfolioWithHoldings[];
  selectedPortfolio: string | null;
  loading: boolean;
  setSelectedPortfolio: (portfolioId: string) => void;
  fetchPortfolios: (userId: string) => Promise<void>;
  addPortfolio: (portfolio: Portfolio) => void;
  getPortfolioById: (id: string) => PortfolioWithHoldings | undefined;
  setLoading: (loading: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolios: [],
      selectedPortfolio: null,
      loading: false,
      setSelectedPortfolio: (portfolioId: string) => 
        set({ selectedPortfolio: portfolioId }),
      fetchPortfolios: async (userId: string) => {
        set({ loading: true });
        try {
          const { data: portfolios, error } = await supabase
            .from('portfolios')
            .select(`
              *,
              portfolio_holdings (*)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching portfolios:', error);
            return;
          }

          const portfoliosWithStats = portfolios?.map(portfolio => ({
            ...portfolio,
            holdingsCount: portfolio.portfolio_holdings?.length || 0,
            holdings: portfolio.portfolio_holdings || []
          })) || [];

          set({ 
            portfolios: portfoliosWithStats,
            selectedPortfolio: portfoliosWithStats[0]?.id || null 
          });
        } catch (error) {
          console.error('Error fetching portfolios:', error);
        } finally {
          set({ loading: false });
        }
      },
      addPortfolio: (portfolio: Portfolio) => 
        set((state) => ({ 
          portfolios: [{ ...portfolio, holdingsCount: 0, holdings: [] }, ...state.portfolios] 
        })),
      getPortfolioById: (id: string) => 
        get().portfolios.find(portfolio => portfolio.id === id),
      setLoading: (loading: boolean) => set({ loading })
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ 
        selectedPortfolio: state.selectedPortfolio 
      })
    }
  )
);
