
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { MarketOverview } from "@/components/MarketOverview";
import { RecentAnalysis } from "@/components/RecentAnalysis";
import { ModelPerformance } from "@/components/ModelPerformance";
import { TrendingUp, TrendingDown, PieChart, BarChart3, Activity, DollarSign, FolderOpen, Download, Plus } from "lucide-react";

export const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState("portfolio_2024_Q4.csv");
  const [isExporting, setIsExporting] = useState(false);
  const [isCreatingAnalysis, setIsCreatingAnalysis] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStep, setExportStep] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("");

  const availableFiles = [
    "portfolio_2024_Q4.csv",
    "portfolio_2024_Q3.csv", 
    "portfolio_2024_Q2.csv",
    "portfolio_2024_Q1.csv",
    "portfolio_2023_Q4.csv",
    "retirement_portfolio.csv",
    "growth_strategy.csv",
    "dividend_focused.csv"
  ];

  // Portfolio-specific data based on selected file
  const getPortfolioData = (fileName: string) => {
    const portfolioData: { [key: string]: any } = {
      "portfolio_2024_Q4.csv": {
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
      "portfolio_2024_Q3.csv": {
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
      "portfolio_2024_Q2.csv": {
        totalValue: "$112,800",
        totalReturn: "+4.2%",
        holdings: 10,
        sharpeRatio: "0.9",
        ytdReturn: "+4.2%",
        monthReturn: "+1.2%",
        riskLevel: "Moderate",
        lastAnalyzed: "3 days ago",
        topPerformer: "NVDA (+15.3%)",
        underperformer: "AMZN (-1.8%)"
      },
      "portfolio_2024_Q1.csv": {
        totalValue: "$108,400",
        totalReturn: "+2.8%",
        holdings: 9,
        sharpeRatio: "0.8",
        ytdReturn: "+2.8%",
        monthReturn: "+0.9%",
        riskLevel: "Conservative",
        lastAnalyzed: "1 week ago",
        topPerformer: "GOOGL (+8.1%)",
        underperformer: "NFLX (-4.2%)"
      },
      "portfolio_2023_Q4.csv": {
        totalValue: "$105,600",
        totalReturn: "+18.9%",
        holdings: 8,
        sharpeRatio: "1.4",
        ytdReturn: "+18.9%",
        monthReturn: "+3.2%",
        riskLevel: "Moderate-High",
        lastAnalyzed: "2 weeks ago",
        topPerformer: "AAPL (+24.1%)",
        underperformer: "DIS (-2.4%)"
      },
      "retirement_portfolio.csv": {
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
      },
      "growth_strategy.csv": {
        totalValue: "$89,300",
        totalReturn: "+14.2%",
        holdings: 8,
        sharpeRatio: "1.6",
        ytdReturn: "+14.2%",
        monthReturn: "+3.8%",
        riskLevel: "High",
        lastAnalyzed: "6 hours ago",
        topPerformer: "QQQ (+16.7%)",
        underperformer: "ARKK (-2.1%)"
      },
      "dividend_focused.csv": {
        totalValue: "$156,200",
        totalReturn: "+3.9%",
        holdings: 14,
        sharpeRatio: "0.6",
        ytdReturn: "+3.9%",
        monthReturn: "+1.1%",
        riskLevel: "Conservative",
        lastAnalyzed: "1 day ago",
        topPerformer: "JNJ (+4.8%)",
        underperformer: "T (-1.2%)"
      }
    };
    
    return portfolioData[fileName] || portfolioData["portfolio_2024_Q4.csv"];
  };

  const currentPortfolio = getPortfolioData(selectedFile);

  // Portfolio-specific holdings data
  const getHoldingsData = (fileName: string) => {
    const holdingsData: { [key: string]: any[] } = {
      "portfolio_2024_Q4.csv": [
        { symbol: "AAPL", name: "Apple Inc.", allocation: "18.4%", color: "blue-600" },
        { symbol: "MSFT", name: "Microsoft Corp.", allocation: "15.2%", color: "green-600" },
        { symbol: "GOOGL", name: "Alphabet Inc.", allocation: "12.8%", color: "red-600" },
        { symbol: "AMZN", name: "Amazon.com Inc.", allocation: "10.5%", color: "orange-600" },
        { symbol: "TSLA", name: "Tesla Inc.", allocation: "8.7%", color: "purple-600" }
      ],
      "portfolio_2024_Q3.csv": [
        { symbol: "MSFT", name: "Microsoft Corp.", allocation: "16.8%", color: "blue-600" },
        { symbol: "AAPL", name: "Apple Inc.", allocation: "14.2%", color: "gray-600" },
        { symbol: "NVDA", name: "NVIDIA Corp.", allocation: "13.5%", color: "green-600" },
        { symbol: "GOOGL", name: "Alphabet Inc.", allocation: "11.2%", color: "red-600" },
        { symbol: "META", name: "Meta Platforms", allocation: "9.8%", color: "blue-500" }
      ],
      "retirement_portfolio.csv": [
        { symbol: "VTI", name: "Vanguard Total Stock", allocation: "35.2%", color: "blue-600" },
        { symbol: "BND", name: "Vanguard Bond Index", allocation: "25.8%", color: "green-600" },
        { symbol: "VTIAX", name: "Vanguard Intl Stock", allocation: "20.4%", color: "purple-600" },
        { symbol: "VGSLX", name: "Vanguard REIT Index", allocation: "10.3%", color: "orange-600" },
        { symbol: "VNQ", name: "Vanguard Real Estate", allocation: "8.3%", color: "red-600" }
      ],
      "growth_strategy.csv": [
        { symbol: "QQQ", name: "Invesco QQQ Trust", allocation: "28.5%", color: "green-600" },
        { symbol: "ARKK", name: "ARK Innovation ETF", allocation: "18.2%", color: "purple-600" },
        { symbol: "NVDA", name: "NVIDIA Corp.", allocation: "16.8%", color: "blue-600" },
        { symbol: "TSLA", name: "Tesla Inc.", allocation: "14.7%", color: "red-600" },
        { symbol: "AMD", name: "Advanced Micro Devices", allocation: "11.3%", color: "orange-600" }
      ],
      "dividend_focused.csv": [
        { symbol: "JNJ", name: "Johnson & Johnson", allocation: "12.4%", color: "blue-600" },
        { symbol: "PG", name: "Procter & Gamble", allocation: "10.8%", color: "green-600" },
        { symbol: "KO", name: "Coca-Cola Company", allocation: "9.6%", color: "red-600" },
        { symbol: "PEP", name: "PepsiCo Inc.", allocation: "8.9%", color: "blue-500" },
        { symbol: "WMT", name: "Walmart Inc.", allocation: "8.2%", color: "purple-600" }
      ]
    };
    
    return holdingsData[fileName] || holdingsData["portfolio_2024_Q4.csv"];
  };

  const currentHoldings = getHoldingsData(selectedFile);

  // Portfolio-specific allocation data
  const getAllocationData = (fileName: string) => {
    const allocationData: { [key: string]: any[] } = {
      "portfolio_2024_Q4.csv": [
        { category: "Technology", percentage: "45.2%", color: "blue-500" },
        { category: "Healthcare", percentage: "18.4%", color: "green-500" },
        { category: "Consumer Defensive", percentage: "16.2%", color: "purple-500" },
        { category: "Financial Services", percentage: "12.1%", color: "orange-500" },
        { category: "Cash", percentage: "8.1%", color: "gray-500" }
      ],
      "retirement_portfolio.csv": [
        { category: "US Stocks (ETF)", percentage: "35.2%", color: "blue-500" },
        { category: "Bonds", percentage: "30.8%", color: "green-500" },
        { category: "International Stocks", percentage: "20.4%", color: "purple-500" },
        { category: "Real Estate (REIT)", percentage: "10.3%", color: "orange-500" },
        { category: "Cash", percentage: "3.3%", color: "gray-500" }
      ],
      "growth_strategy.csv": [
        { category: "Technology ETFs", percentage: "48.7%", color: "blue-500" },
        { category: "Growth Stocks", percentage: "32.1%", color: "green-500" },
        { category: "Innovation ETFs", percentage: "15.2%", color: "purple-500" },
        { category: "Cash", percentage: "4.0%", color: "gray-500" }
      ],
      "dividend_focused.csv": [
        { category: "Dividend Stocks", percentage: "42.3%", color: "blue-500" },
        { category: "Utility Stocks", percentage: "25.1%", color: "green-500" },
        { category: "Consumer Staples", percentage: "18.6%", color: "purple-500" },
        { category: "REITs", percentage: "10.2%", color: "orange-500" },
        { category: "Cash", percentage: "3.8%", color: "gray-500" }
      ]
    };
    
    return allocationData[fileName] || allocationData["portfolio_2024_Q4.csv"];
  };

  const currentAllocation = getAllocationData(selectedFile);

  const handleExportData = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      // Step 1: Data Compilation
      setExportStep("Compiling portfolio data...");
      setExportProgress(20);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Format Selection
      setExportStep("Preparing export formats...");
      setExportProgress(40);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Step 3: Report Generation
      setExportStep("Generating comprehensive report...");
      setExportProgress(70);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 4: File Download
      setExportStep("Preparing download...");
      setExportProgress(90);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setExportProgress(100);
      setExportStep("Export completed!");
      
      // Simulate file download
      const fileName = `${selectedFile.replace('.csv', '')}_FullReport_${new Date().toISOString().slice(0,10)}.xlsx`;
      alert(`✅ Export successful!\n\nFile: ${fileName}\nSize: 2.3 MB\nFormat: Excel (.xlsx)\n\nYour comprehensive report includes:\n- Portfolio Summary\n- Holdings Detail\n- Analysis Results\n- Market Data\n- Raw Data\n\nCheck your downloads folder.`);
      
    } catch (error) {
      alert("❌ Export failed. Please try again.");
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStep("");
      }, 1000);
    }
  };

  const handleNewAnalysis = async () => {
    setIsCreatingAnalysis(true);
    setAnalysisProgress(0);
    
    try {
      // Step 1: Workspace Initialization
      setAnalysisStep("Initializing analysis workspace...");
      setAnalysisProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Step 2: Data Preparation
      setAnalysisStep("Preparing portfolio data...");
      setAnalysisProgress(50);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Step 3: Environment Setup
      setAnalysisStep("Loading financial models framework...");
      setAnalysisProgress(80);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnalysisProgress(100);
      setAnalysisStep("Workspace ready!");
      
      // Show analysis options
      const analysisType = confirm("🚀 Analysis Workspace Created!\n\nChoose your analysis type:\n\nOK = Comprehensive Analysis (All 10 models)\nCancel = Quick Analysis (Essential models only)");
      
      if (analysisType) {
        alert(`📊 Comprehensive Analysis Workspace Ready!\n\nPortfolio: ${selectedFile}\nModels: All 10 legendary economist models\nEstimated Time: 15-30 minutes\nOutput: 15-20 page detailed report\n\n✨ Features available:\n- Real-time progress tracking\n- Interactive model results\n- Specific dollar-amount recommendations\n- Risk mitigation strategies\n- Timeline for implementation\n\nClick "Financial Models" tab to begin analysis!`);
      } else {
        alert(`⚡ Quick Analysis Workspace Ready!\n\nPortfolio: ${selectedFile}\nModels: Essential health check models\nEstimated Time: 5-10 minutes\nOutput: Portfolio score & top 3 recommendations\n\n✨ Features available:\n- Portfolio score (A+ to F)\n- Top recommendations\n- Risk level assessment\n- Quick action items\n\nClick "Financial Models" tab to begin analysis!`);
      }
      
    } catch (error) {
      alert("❌ Analysis workspace creation failed. Please try again.");
    } finally {
      setTimeout(() => {
        setIsCreatingAnalysis(false);
        setAnalysisProgress(0);
        setAnalysisStep("");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-8 p-6 bg-white">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back. Here's your financial analysis overview.
            </p>
          </div>
          
          {/* File Selection and Actions */}
          <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
            {/* File Selector */}
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Portfolio:</span>
              <Select value={selectedFile} onValueChange={setSelectedFile}>
                <SelectTrigger className="w-[200px] bg-white border-gray-300 text-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {availableFiles.map((file) => (
                    <SelectItem key={file} value={file} className="text-gray-700 hover:bg-gray-50">
                      {file}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3">
              <div className="flex flex-col space-y-1">
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={handleExportData}
                  disabled={isExporting}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export Data"}
                </Button>
                {isExporting && (
                  <div className="w-full px-2">
                    <Progress value={exportProgress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{exportStep}</p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-1">
                <Button 
                  className="robinhood-button"
                  onClick={handleNewAnalysis}
                  disabled={isCreatingAnalysis}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isCreatingAnalysis ? "Creating..." : "New Analysis"}
                </Button>
                {isCreatingAnalysis && (
                  <div className="w-full px-2">
                    <Progress value={analysisProgress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{analysisStep}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">{currentPortfolio.totalValue}</div>
              <p className="text-sm text-green-600 font-medium">{currentPortfolio.totalReturn} total return</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">{currentPortfolio.holdings}</div>
              <p className="text-sm text-blue-600 font-medium">Active positions</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Sharpe Ratio</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">{currentPortfolio.sharpeRatio}</div>
              <p className="text-sm text-gray-600 font-medium">Risk-adjusted return</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Risk Level</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-black">{currentPortfolio.riskLevel}</div>
              <p className="text-sm text-gray-600 font-medium">Last analyzed: {currentPortfolio.lastAnalyzed}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketOverview />
          <RecentAnalysis />
        </div>

        <ModelPerformance />

        {/* Portfolio Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Allocation */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-white">
              <CardTitle className="text-black flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Portfolio Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-4">
                {currentAllocation.map((allocation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-${allocation.color} rounded-full`}></div>
                      <span className="text-sm text-gray-700">{allocation.category}</span>
                    </div>
                    <span className="font-medium text-black">{allocation.percentage}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Performance */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-white">
              <CardTitle className="text-black flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Portfolio Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">1 Month</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-600">{currentPortfolio.monthReturn}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">YTD Return</span>
                  <div className="flex items-center space-x-1">
                    {parseFloat(currentPortfolio.ytdReturn) >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`font-medium ${parseFloat(currentPortfolio.ytdReturn) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentPortfolio.ytdReturn}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Top Performer</span>
                  <span className="font-medium text-green-600 text-sm">{currentPortfolio.topPerformer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Underperformer</span>
                  <span className="font-medium text-red-600 text-sm">{currentPortfolio.underperformer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Portfolio Value</span>
                  <span className="font-medium text-black">{currentPortfolio.totalValue}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Holdings */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-white">
              <CardTitle className="text-black flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-4">
                {currentHoldings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 bg-${holding.color.replace('-600', '-100')} rounded-full flex items-center justify-center`}>
                        <span className={`font-bold text-${holding.color} text-xs`}>{holding.symbol}</span>
                      </div>
                      <span className="text-sm text-gray-700">{holding.name}</span>
                    </div>
                    <span className="font-medium text-black">{holding.allocation}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-white">
              <CardTitle className="text-black">Market Insights</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">Strong Technology Sector Performance</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Technology stocks showing robust growth with 15% average gains this quarter
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <DollarSign className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800">Fed Rate Decision Impact</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Recent rate cuts creating favorable conditions for equity markets
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <Activity className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Volatility Alert</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Increased market volatility expected due to upcoming earnings season
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-white">
              <CardTitle className="text-black">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-black">Sharpe Ratio</span>
                  <Badge className="bg-green-100 text-green-800">{currentPortfolio.sharpeRatio} (Excellent)</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-black">Risk Level</span>
                  <Badge className={`${
                    currentPortfolio.riskLevel === 'Conservative' ? 'bg-green-100 text-green-800' :
                    currentPortfolio.riskLevel === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                    currentPortfolio.riskLevel === 'Moderate-High' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentPortfolio.riskLevel}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-black">Holdings Count</span>
                  <Badge className="bg-blue-100 text-blue-800">{currentPortfolio.holdings} Positions</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-black">Last Analysis</span>
                  <Badge className="bg-gray-100 text-gray-800">{currentPortfolio.lastAnalyzed}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
