
import { create } from 'zustand';

export interface AnalysisResult {
  id: string;
  portfolioId: string;
  analysisType: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  startTime: Date;
  endTime?: Date;
  results?: any;
}

interface AnalysisState {
  isModalOpen: boolean;
  selectedAnalysisTypes: string[];
  analysisDepth: 'quick' | 'comprehensive';
  analyses: AnalysisResult[];
  openModal: () => void;
  closeModal: () => void;
  setAnalysisTypes: (types: string[]) => void;
  setAnalysisDepth: (depth: 'quick' | 'comprehensive') => void;
  addAnalysis: (analysis: AnalysisResult) => void;
  updateAnalysis: (id: string, updates: Partial<AnalysisResult>) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isModalOpen: false,
  selectedAnalysisTypes: [],
  analysisDepth: 'comprehensive',
  analyses: [],
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setAnalysisTypes: (types: string[]) => set({ selectedAnalysisTypes: types }),
  setAnalysisDepth: (depth: 'quick' | 'comprehensive') => set({ analysisDepth: depth }),
  addAnalysis: (analysis: AnalysisResult) => 
    set((state) => ({ analyses: [...state.analyses, analysis] })),
  updateAnalysis: (id: string, updates: Partial<AnalysisResult>) =>
    set((state) => ({
      analyses: state.analyses.map(analysis => 
        analysis.id === id ? { ...analysis, ...updates } : analysis
      )
    }))
}));
