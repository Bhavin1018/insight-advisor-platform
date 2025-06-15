
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type Portfolio = Tables<'portfolios'>;
export type PortfolioHolding = Tables<'portfolio_holdings'>;

export interface PortfolioWithHoldings extends Portfolio {
  holdings: PortfolioHolding[];
}

interface PortfolioState {
  portfolios: PortfolioWithHoldings[];
  selectedPortfolio: string | null;
  loading: boolean;
  error: string | null;
  fetchPortfolios: (userId: string) => Promise<void>;
  addPortfolio: (portfolio: Omit<Portfolio, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePortfolio: (id: string, updates: Partial<Portfolio>) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  selectPortfolio: (id: string) => void;
  setSelectedPortfolio: (id: string) => void;
  getPortfolioById: (id: string) => PortfolioWithHoldings | undefined;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  selectedPortfolio: null,
  loading: false,
  error: null,

  fetchPortfolios: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const { data: portfolios, error } = await supabase
        .from('portfolios')
        .select(`
          *,
          portfolio_holdings (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const portfoliosWithHoldings = portfolios?.map(portfolio => ({
        ...portfolio,
        holdings: portfolio.portfolio_holdings || []
      })) || [];

      set({ 
        portfolios: portfoliosWithHoldings,
        selectedPortfolio: portfoliosWithHoldings[0]?.id || null,
        loading: false 
      });
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  addPortfolio: async (portfolio) => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .insert([portfolio])
        .select()
        .single();

      if (error) throw error;

      const newPortfolio = {
        ...data,
        holdings: []
      };

      set(state => ({
        portfolios: [...state.portfolios, newPortfolio],
        selectedPortfolio: data.id
      }));
    } catch (error) {
      console.error('Error adding portfolio:', error);
      set({ error: (error as Error).message });
    }
  },

  updatePortfolio: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        portfolios: state.portfolios.map(p => 
          p.id === id ? { ...p, ...data } : p
        )
      }));
    } catch (error) {
      console.error('Error updating portfolio:', error);
      set({ error: (error as Error).message });
    }
  },

  deletePortfolio: async (id) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        portfolios: state.portfolios.filter(p => p.id !== id),
        selectedPortfolio: state.selectedPortfolio === id ? null : state.selectedPortfolio
      }));
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      set({ error: (error as Error).message });
    }
  },

  selectPortfolio: (id: string) => {
    set({ selectedPortfolio: id });
  },

  setSelectedPortfolio: (id: string) => {
    set({ selectedPortfolio: id });
  },

  getPortfolioById: (id: string) => {
    return get().portfolios.find(p => p.id === id);
  },
}));
