
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
    // Navigate to upload page with export context
    setCurrentView('upload');
  };

  const handleNewAnalysis = () => {
    // Open the new AnalysisModal
    openModal();
  };

  if (!currentPortfolio) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Portfolio Dashboard</h1>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-gray-500">No portfolio selected</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black">{currentPortfolio.name}</h1>
          <p className="text-gray-600 mt-1">Last analyzed {currentPortfolio.lastAnalyzed}</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleExportData} variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
          <Button onClick={handleNewAnalysis} className="robinhood-button flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{currentPortfolio.totalValue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentPortfolio.totalReturn}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
            <PieChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{currentPortfolio.holdings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sharpe Ratio</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{currentPortfolio.sharpeRatio}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">YTD Return</span>
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                {currentPortfolio.ytdReturn}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Return</span>
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                {currentPortfolio.monthReturn}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Risk Level</span>
              <Badge variant="outline">{currentPortfolio.riskLevel}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-black">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-black">Best Performer</span>
              </div>
              <span className="text-green-600 font-medium">{currentPortfolio.topPerformer}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-black">Underperformer</span>
              </div>
              <span className="text-red-600 font-medium">{currentPortfolio.underperformer}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-black font-medium">Portfolio analysis completed</p>
                <p className="text-sm text-gray-500">Comprehensive risk assessment finished</p>
              </div>
              <span className="text-sm text-gray-400">{currentPortfolio.lastAnalyzed}</span>
            </div>
            <Separator />
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-black font-medium">Report generated</p>
                <p className="text-sm text-gray-500">Q4 2024 performance report available</p>
              </div>
              <span className="text-sm text-gray-400">3 hours ago</span>
            </div>
            <Separator />
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-black font-medium">Risk assessment updated</p>
                <p className="text-sm text-gray-500">Portfolio risk level adjusted to moderate</p>
              </div>
              <span className="text-sm text-gray-400">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Include the AnalysisModal */}
      <AnalysisModal />
    </div>
  );
};
