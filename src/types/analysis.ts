
export interface AnalysisConfig {
  portfolioId: string;
  analysisTypes: string[];
  depth: 'quick' | 'comprehensive';
  outputFormat: 'dashboard' | 'pdf' | 'excel' | 'all';
}

export interface AnalysisProgress {
  id: string;
  step: string;
  progress: number;
  estimatedTimeRemaining: string;
}

export interface AnalysisResult {
  id: string;
  portfolioId: string;
  analysisType: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  startTime: Date;
  endTime?: Date;
  results?: any;
  reportUrl?: string;
}
