
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { usePortfolioStore } from "@/stores/portfolioStore";
import { useAnalysisStore } from "@/stores/analysisStore";
import { AnalysisModal } from "@/components/AnalysisModal";
import { ViewType } from "@/pages/Index";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Activity,
  FileText,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Calendar
} from "lucide-react";

interface DashboardProps {
  setCurrentView: (view: ViewType) => void;
}

export const Dashboard = ({ setCurrentView }: DashboardProps) => {
  const { portfolios, selectedPortfolio, getPortfolioById } = usePortfolioStore();
  const { openModal } = useAnalysisStore();
  
  const currentPortfolio = getPortfolioById(selectedPortfolio || '');

  const handleExportData = () => {
    setCurrentView('upload');
  };

  const handleNewAnalysis = () => {
    openModal();
  };

  // Calculate derived values from holdings
  const calculatePortfolioMetrics = (portfolio: typeof currentPortfolio) => {
    if (!portfolio || !portfolio.holdings) {
      return {
        totalValue: '$0.00',
        totalReturn: '+0.00%',
        holdingsCount: 0,
        sharpeRatio: '0.00'
      };
    }

    const totalValue = portfolio.holdings.reduce((sum, holding) => {
      return sum + (holding.quantity * (holding.current_price || holding.purchase_price || 0));
    }, 0);

    // Mock calculations for demo purposes
    const totalReturn = Math.random() * 20 - 10; // -10% to +10%
    const sharpeRatio = Math.random() * 3; // 0 to 3

    return {
      totalValue: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalReturn: `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`,
      holdingsCount: portfolio.holdings.length,
      sharpeRatio: sharpeRatio.toFixed(2)
    };
  };

  if (!currentPortfolio) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Portfolio Dashboard</h1>
        </div>
        <Card className="bg-white">
          <CardContent className="flex items-center justify-center h-32 bg-white">
            <p className="text-gray-500">No portfolio selected</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metrics = calculatePortfolioMetrics(currentPortfolio);
  const lastAnalyzed = new Date(currentPortfolio.updated_at).toLocaleDateString();

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center bg-white">
        <div className="bg-white">
          <h1 className="text-3xl font-bold text-black">{currentPortfolio.name}</h1>
          <p className="text-gray-600 mt-1">Last analyzed {lastAnalyzed}</p>
        </div>
        <div className="flex space-x-3 bg-white">
          <Button onClick={handleExportData} variant="outline" className="flex items-center space-x-2 bg-white">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
          <Button onClick={handleNewAnalysis} className="robinhood-button flex items-center space-x-2 bg-white">
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-black">{metrics.totalValue}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white">
            <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-green-600">{metrics.totalReturn}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white">
            <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
            <PieChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-black">{metrics.holdingsCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-white">
            <CardTitle className="text-sm font-medium text-gray-600">Sharpe Ratio</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="bg-white">
            <div className="text-2xl font-bold text-black">{metrics.sharpeRatio}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white">
        <Card className="bg-white">
          <CardHeader className="bg-white">
            <CardTitle className="text-black">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex justify-between items-center bg-white">
              <span className="text-gray-600">Risk Tolerance</span>
              <Badge variant="outline" className="bg-white">{currentPortfolio.risk_tolerance || 'Not Set'}</Badge>
            </div>
            <div className="flex justify-between items-center bg-white">
              <span className="text-gray-600">Currency</span>
              <Badge variant="secondary" className="bg-gray-50">
                {currentPortfolio.currency}
              </Badge>
            </div>
            <div className="flex justify-between items-center bg-white">
              <span className="text-gray-600">Holdings Count</span>
              <Badge variant="outline" className="bg-white">{metrics.holdingsCount}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="bg-white">
            <CardTitle className="text-black">Top Holdings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            {currentPortfolio.holdings.slice(0, 3).map((holding, index) => (
              <div key={holding.id} className="flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2 bg-white">
                  <span className="text-black font-medium">{holding.symbol}</span>
                  <span className="text-gray-500 text-sm">{holding.company_name}</span>
                </div>
                <span className="text-gray-600 font-medium">{holding.quantity} shares</span>
              </div>
            ))}
            {currentPortfolio.holdings.length === 0 && (
              <p className="text-gray-500 text-center bg-white">No holdings found</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white">
        <CardHeader className="bg-white">
          <CardTitle className="text-black">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="space-y-4 bg-white">
            <div className="flex items-center space-x-3 bg-white">
              <Activity className="w-5 h-5 text-blue-500" />
              <div className="flex-1 bg-white">
                <p className="text-black font-medium">Portfolio created</p>
                <p className="text-sm text-gray-500">Portfolio {currentPortfolio.name} was created</p>
              </div>
              <span className="text-sm text-gray-400">{lastAnalyzed}</span>
            </div>
            <Separator />
            <div className="flex items-center space-x-3 bg-white">
              <FileText className="w-5 h-5 text-green-500" />
              <div className="flex-1 bg-white">
                <p className="text-black font-medium">Ready for analysis</p>
                <p className="text-sm text-gray-500">Click "New Analysis" to start portfolio analysis</p>
              </div>
              <span className="text-sm text-gray-400">Now</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Include the AnalysisModal */}
      <AnalysisModal />
    </div>
  );
};
