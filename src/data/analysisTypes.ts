
export interface AnalysisType {
  id: string;
  name: string;
  description: string;
  icon: string;
  estimatedTime: {
    quick: string;
    comprehensive: string;
  };
  category: 'assessment' | 'optimization' | 'compliance' | 'strategy';
}

export const analysisTypes: AnalysisType[] = [
  {
    id: 'portfolio_health',
    name: 'Overall Portfolio Health Assessment',
    description: 'Comprehensive evaluation of portfolio performance, diversification, and risk-return profile',
    icon: 'Activity',
    estimatedTime: { quick: '3-5 min', comprehensive: '8-12 min' },
    category: 'assessment'
  },
  {
    id: 'risk_assessment',
    name: 'Risk Assessment & Mitigation Strategy',
    description: 'Detailed risk analysis with volatility metrics, VaR calculations, and mitigation recommendations',
    icon: 'Shield',
    estimatedTime: { quick: '4-6 min', comprehensive: '10-15 min' },
    category: 'assessment'
  },
  {
    id: 'investment_opportunity',
    name: 'Investment Opportunity Analysis',
    description: 'Identify undervalued assets, market opportunities, and portfolio gap analysis',
    icon: 'TrendingUp',
    estimatedTime: { quick: '5-7 min', comprehensive: '12-18 min' },
    category: 'strategy'
  },
  {
    id: 'performance_benchmark',
    name: 'Performance Benchmarking Analysis',
    description: 'Compare portfolio performance against relevant benchmarks and peer analysis',
    icon: 'BarChart3',
    estimatedTime: { quick: '3-4 min', comprehensive: '8-10 min' },
    category: 'assessment'
  },
  {
    id: 'sector_allocation',
    name: 'Sector & Asset Allocation Review',
    description: 'Analyze sector exposure, geographic distribution, and asset class allocation',
    icon: 'PieChart',
    estimatedTime: { quick: '2-3 min', comprehensive: '6-8 min' },
    category: 'optimization'
  },
  {
    id: 'esg_compliance',
    name: 'ESG & Sustainability Compliance',
    description: 'Environmental, Social, and Governance analysis with sustainability scoring',
    icon: 'Leaf',
    estimatedTime: { quick: '4-5 min', comprehensive: '10-12 min' },
    category: 'compliance'
  },
  {
    id: 'tax_optimization',
    name: 'Tax Optimization Analysis',
    description: 'Tax-loss harvesting opportunities and tax-efficient rebalancing strategies',
    icon: 'Calculator',
    estimatedTime: { quick: '3-4 min', comprehensive: '8-10 min' },
    category: 'optimization'
  },
  {
    id: 'liquidity_analysis',
    name: 'Liquidity & Cash Flow Analysis',
    description: 'Assess portfolio liquidity, cash flow patterns, and income generation',
    icon: 'DollarSign',
    estimatedTime: { quick: '2-3 min', comprehensive: '5-7 min' },
    category: 'assessment'
  },
  {
    id: 'correlation_analysis',
    name: 'Market Correlation Analysis',
    description: 'Analyze asset correlations, market sensitivity, and diversification effectiveness',
    icon: 'GitBranch',
    estimatedTime: { quick: '4-5 min', comprehensive: '9-12 min' },
    category: 'assessment'
  },
  {
    id: 'stress_testing',
    name: 'Stress Testing & Scenario Planning',
    description: 'Monte Carlo simulations and stress testing under various market scenarios',
    icon: 'Zap',
    estimatedTime: { quick: '5-7 min', comprehensive: '15-20 min' },
    category: 'strategy'
  }
];

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'assessment': return 'Search';
    case 'optimization': return 'Settings';
    case 'compliance': return 'CheckCircle';
    case 'strategy': return 'Target';
    default: return 'FileText';
  }
};
