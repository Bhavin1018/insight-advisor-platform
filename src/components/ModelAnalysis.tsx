import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Calculator, DollarSign, BarChart3, Activity, Play, CheckCircle } from "lucide-react";

export const ModelAnalysis = () => {
  const [selectedModel, setSelectedModel] = useState("buffett");
  const [isRunning, setIsRunning] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [runningAllModels, setRunningAllModels] = useState(false);
  const [allModelsResults, setAllModelsResults] = useState(null);

  // Mock portfolio data - in real app this would come from uploaded files
  const portfolioInfo = {
    fileName: "portfolio_2024_Q4.csv",
    uploadDate: "2024-12-15",
    totalValue: "$127,450",
    totalHoldings: 12,
    lastUpdated: "2 hours ago",
    reportType: "Quarterly Portfolio Review",
    status: "Active"
  };

  const models = [
    {
      id: "buffett",
      name: "Buffett's Value Investing",
      description: "Intrinsic value analysis with margin of safety, focusing on strong fundamentals",
      accuracy: "94%",
      riskLevel: "Low",
      timeframe: "Long-term",
      category: "Value Investing",
      economist: "Warren Buffett"
    },
    {
      id: "buffettindicator",
      name: "Buffett Indicator",
      description: "Market Cap-to-GDP ratio for overall market valuation assessment",
      accuracy: "87%",
      riskLevel: "Low",
      timeframe: "Long-term",
      category: "Market Valuation",
      economist: "Warren Buffett"
    },
    {
      id: "dcf",
      name: "Discounted Cash Flow (DCF)",
      description: "Intrinsic value estimation through projected future cash flows",
      accuracy: "91%",
      riskLevel: "Medium",
      timeframe: "Long-term",
      category: "Valuation",
      economist: "Benjamin Graham/Buffett"
    },
    {
      id: "blackscholes",
      name: "Black-Scholes-Merton",
      description: "Options pricing using volatility, time decay, and risk-free rates",
      accuracy: "92%",
      riskLevel: "High",
      timeframe: "Short-term",
      category: "Derivatives",
      economist: "Black, Scholes, Merton"
    },
    {
      id: "keynesian",
      name: "Keynesian Multiplier",
      description: "Government spending impact on economic growth and market cycles",
      accuracy: "78%",
      riskLevel: "Medium",
      timeframe: "Medium-term",
      category: "Macroeconomic",
      economist: "John Maynard Keynes"
    },
    {
      id: "ricardo",
      name: "Comparative Advantage",
      description: "Trade efficiency analysis for international and sector investments",
      accuracy: "83%",
      riskLevel: "Low",
      timeframe: "Long-term",
      category: "Trade Theory",
      economist: "David Ricardo"
    },
    {
      id: "sowell",
      name: "Scarcity & Trade-Offs",
      description: "Resource allocation analysis considering opportunity costs and incentives",
      accuracy: "88%",
      riskLevel: "Low",
      timeframe: "Variable",
      category: "Economic Framework",
      economist: "Thomas Sowell"
    },
    {
      id: "cpi",
      name: "Consumer Price Index Analysis",
      description: "Inflation impact assessment on portfolio purchasing power",
      accuracy: "95%",
      riskLevel: "Low",
      timeframe: "Short-term",
      category: "Economic Indicator",
      economist: "Federal Reserve"
    },
    {
      id: "pmi",
      name: "Purchasing Managers' Index",
      description: "Manufacturing activity leading indicator for cyclical investments",
      accuracy: "89%",
      riskLevel: "Medium",
      timeframe: "Short-term",
      category: "Economic Indicator",
      economist: "ISM Institute"
    },
    {
      id: "yieldcurve",
      name: "Yield Curve Analysis",
      description: "Interest rate structure analysis for recession prediction and bond strategy",
      accuracy: "93%",
      riskLevel: "Medium",
      timeframe: "Medium-term",
      category: "Fixed Income",
      economist: "Federal Reserve"
    }
  ];

  const currentAnalysis = {
    buffett: {
      metrics: [
        { label: "Intrinsic Value", value: "$156.80", change: "+2.4%" },
        { label: "Margin of Safety", value: "15.2%", change: "-0.8%" },
        { label: "ROE", value: "18.5%", change: "+1.2%" },
        { label: "Debt-to-Equity", value: "0.42", change: "-0.05" }
      ],
      recommendation: "Strong Buy",
      confidence: "High",
      insights: [
        "Company trading below intrinsic value with good margin of safety",
        "Strong return on equity indicates efficient management",
        "Low debt levels provide financial stability",
        "Consistent earnings growth over 10+ year period"
      ]
    },
    buffettindicator: {
      metrics: [
        { label: "Market Cap/GDP", value: "185%", change: "-5%" },
        { label: "Historical Average", value: "100%", change: "Constant" },
        { label: "Overvaluation Level", value: "85%", change: "-3%" },
        { label: "Recession Probability", value: "High", change: "Increasing" }
      ],
      recommendation: "Hold with Caution",
      confidence: "High",
      insights: [
        "Market significantly overvalued by historical standards",
        "Ratio above 150% has preceded major corrections",
        "Consider defensive positioning or cash allocation",
        "Wait for ratio below 120% for aggressive buying"
      ]
    },
    dcf: {
      metrics: [
        { label: "Present Value", value: "$148.50", change: "+1.8%" },
        { label: "WACC", value: "8.2%", change: "+0.1%" },
        { label: "Terminal Value", value: "$98.30", change: "+2.1%" },
        { label: "Growth Rate", value: "3.5%", change: "No change" }
      ],
      recommendation: "Buy",
      confidence: "High",
      insights: [
        "DCF valuation supports current market price",
        "Conservative growth assumptions provide margin of safety",
        "WACC remains stable reflecting low financing risk",
        "Terminal value represents 66% of total valuation"
      ]
    },
    blackscholes: {
      metrics: [
        { label: "Implied Volatility", value: "24.3%", change: "-2.1%" },
        { label: "Delta", value: "0.68", change: "+0.05" },
        { label: "Theta", value: "-0.12", change: "-0.02" },
        { label: "Options Premium", value: "$8.50", change: "+0.35" }
      ],
      recommendation: "Buy Call Options",
      confidence: "High",
      insights: [
        "Low implied volatility creates attractive option entry points",
        "High delta provides good leverage to underlying movement",
        "Time decay manageable with upcoming catalysts",
        "Volatility expansion likely before earnings announcement"
      ]
    },
    keynesian: {
      metrics: [
        { label: "Multiplier Effect", value: "1.8x", change: "+0.2x" },
        { label: "Fiscal Stimulus", value: "$2.1T", change: "+$0.5T" },
        { label: "GDP Impact", value: "+3.8%", change: "+1.2%" },
        { label: "Market Response", value: "Bullish", change: "Improving" }
      ],
      recommendation: "Buy Cyclicals",
      confidence: "Medium",
      insights: [
        "Government spending boosting economic activity",
        "Multiplier effect supporting consumer demand",
        "Infrastructure spending benefits industrials",
        "Monitor for inflation risks from stimulus"
      ]
    },
    ricardo: {
      metrics: [
        { label: "Trade Efficiency", value: "92%", change: "+3%" },
        { label: "Export Advantage", value: "Technology", change: "Strengthening" },
        { label: "Import Dependency", value: "Manufacturing", change: "Stable" },
        { label: "Currency Impact", value: "Favorable", change: "+5%" }
      ],
      recommendation: "Buy Export Leaders",
      confidence: "High",
      insights: [
        "US maintains comparative advantage in technology",
        "Export-oriented tech companies well-positioned",
        "Trade agreements supporting market access",
        "Currency trends favor US exporters"
      ]
    },
    sowell: {
      metrics: [
        { label: "Resource Allocation", value: "Efficient", change: "Improving" },
        { label: "Opportunity Cost", value: "Low", change: "Decreasing" },
        { label: "Market Incentives", value: "Aligned", change: "Stable" },
        { label: "Policy Risk", value: "Medium", change: "Increasing" }
      ],
      recommendation: "Focus on Fundamentals",
      confidence: "High",
      insights: [
        "Market efficiently allocating capital to productive uses",
        "Low opportunity costs favor risk asset investment",
        "Incentive structures supporting innovation",
        "Monitor regulatory changes affecting market mechanisms"
      ]
    },
    cpi: {
      metrics: [
        { label: "Current CPI", value: "3.2%", change: "-0.3%" },
        { label: "Core CPI", value: "2.8%", change: "-0.2%" },
        { label: "Real Returns", value: "1.8%", change: "+0.5%" },
        { label: "Inflation Trend", value: "Declining", change: "Improving" }
      ],
      recommendation: "Buy Real Assets",
      confidence: "Medium",
      insights: [
        "Inflation moderating but still above Fed target",
        "Real returns turning positive for bonds",
        "TIPS and commodities provide inflation hedge",
        "Monitor for secondary inflation effects"
      ]
    },
    pmi: {
      metrics: [
        { label: "Manufacturing PMI", value: "52.3", change: "+1.2" },
        { label: "Services PMI", value: "54.1", change: "+0.8" },
        { label: "Employment Index", value: "51.5", change: "+0.5" },
        { label: "Economic Expansion", value: "Yes", change: "Strengthening" }
      ],
      recommendation: "Buy Cyclical Stocks",
      confidence: "High",
      insights: [
        "PMI above 50 indicates economic expansion",
        "Manufacturing activity accelerating",
        "Employment trends supporting consumer spending",
        "Industrial stocks positioned to benefit"
      ]
    },
    yieldcurve: {
      metrics: [
        { label: "2Y-10Y Spread", value: "-0.45%", change: "-0.05%" },
        { label: "Inversion Duration", value: "8 months", change: "+1 month" },
        { label: "Recession Signal", value: "Active", change: "Strengthening" },
        { label: "Fed Policy", value: "Restrictive", change: "Stable" }
      ],
      recommendation: "Defensive Positioning",
      confidence: "High",
      insights: [
        "Inverted yield curve signals recession risk",
        "Historical accuracy of 85% for predicting downturns",
        "Consider defensive sectors and quality bonds",
        "Watch for curve steepening as cycle turns"
      ]
    }
  };

  const selectedAnalysis = currentAnalysis[selectedModel as keyof typeof currentAnalysis];

  const analysisSteps = [
    { step: "Fetching Market Data", duration: 1500 },
    { step: "Downloading Economic Indicators", duration: 1200 },
    { step: "Processing Financial Statements", duration: 2000 },
    { step: "Running Model Calculations", duration: 1800 },
    { step: "Generating Risk Assessment", duration: 1000 },
    { step: "Creating Recommendations", duration: 800 }
  ];

  const handleRunAnalysis = async () => {
    setIsRunning(true);
    setAnalysisComplete(false);
    setProgress(0);
    setAnalysisResults(null);
    
    let totalProgress = 0;
    const stepIncrement = 100 / analysisSteps.length;
    
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(analysisSteps[i].step);
      
      // Simulate step processing
      await new Promise(resolve => setTimeout(resolve, analysisSteps[i].duration));
      
      totalProgress += stepIncrement;
      setProgress(Math.round(totalProgress));
    }
    
    // Generate realistic analysis results
    const results = generateAnalysisResults(selectedModel);
    setAnalysisResults(results);
    
    setIsRunning(false);
    setAnalysisComplete(true);
    setCurrentStep("Analysis Complete");
    
    // Reset completion status after 5 seconds
    setTimeout(() => {
      setAnalysisComplete(false);
      setCurrentStep("");
      setProgress(0);
    }, 5000);
  };

  const generateAnalysisResults = (modelId) => {
    const baseResults = {
      timestamp: new Date().toLocaleString(),
      model: models.find(m => m.id === modelId),
      riskLevel: "Medium",
      confidence: "High"
    };

    switch (modelId) {
      case "buffett":
        return {
          ...baseResults,
          recommendation: "Strong Buy",
          targetPrice: "$165.80",
          currentPrice: "$156.80",
          upside: "5.7%",
          keyMetrics: [
            { label: "Intrinsic Value", value: "$165.80", status: "positive" },
            { label: "Margin of Safety", value: "15.2%", status: "positive" },
            { label: "ROE", value: "18.5%", status: "positive" },
            { label: "Debt/Equity", value: "0.42", status: "neutral" }
          ],
          portfolioAnalysis: {
            totalIntrinsicValue: "$142,350",
            currentMarketValue: "$127,450",
            totalUpside: "11.7%",
            qualityScore: "A-",
            undervaluedHoldings: 8,
            overvaluedHoldings: 2,
            fairValueHoldings: 2
          },
          holdingsBreakdown: [
            { symbol: "AAPL", name: "Apple Inc.", weight: "18.5%", recommendation: "Strong Buy", upside: "12.3%", intrinsicValue: "$195.40", currentPrice: "$173.20" },
            { symbol: "MSFT", name: "Microsoft Corp.", weight: "15.2%", recommendation: "Buy", upside: "8.7%", intrinsicValue: "$385.50", currentPrice: "$354.80" },
            { symbol: "BRK.B", name: "Berkshire Hathaway", weight: "12.8%", recommendation: "Hold", upside: "2.1%", intrinsicValue: "$362.00", currentPrice: "$354.50" },
            { symbol: "JNJ", name: "Johnson & Johnson", weight: "9.3%", recommendation: "Strong Buy", upside: "15.4%", intrinsicValue: "$175.20", currentPrice: "$151.80" },
            { symbol: "PG", name: "Procter & Gamble", weight: "8.1%", recommendation: "Buy", upside: "7.2%", intrinsicValue: "$162.30", currentPrice: "$151.40" }
          ],
          sectorAnalysis: [
            { sector: "Technology", allocation: "35.7%", recommendation: "Overweight", score: "A" },
            { sector: "Healthcare", allocation: "18.4%", recommendation: "Neutral", score: "B+" },
            { sector: "Consumer Defensive", allocation: "16.2%", recommendation: "Underweight", score: "A-" },
            { sector: "Financials", allocation: "12.8%", recommendation: "Neutral", score: "B" },
            { sector: "Industrials", allocation: "8.9%", recommendation: "Overweight", score: "B+" }
          ],
          qualityMetrics: [
            { metric: "Average ROE", value: "22.1%", benchmark: ">15%", status: "positive" },
            { metric: "Debt-to-Equity", value: "0.38", benchmark: "<0.5", status: "positive" },
            { metric: "Earnings Growth", value: "12.4%", benchmark: ">10%", status: "positive" },
            { metric: "Dividend Yield", value: "1.8%", benchmark: ">1.5%", status: "positive" }
          ],
          actions: [
            "Increase AAPL position by $2,500 - trading at significant discount to intrinsic value",
            "Add JNJ position of $1,800 - healthcare defensive play with 15.4% upside",
            "Trim TSLA position by $3,200 - overvalued by 28% based on fundamentals",
            "Consider covered calls on MSFT above $380 for additional income",
            "Rebalance toward value stocks given current market conditions"
          ],
          riskFactors: [
            "Market overvaluation (Buffett Indicator at 185%) creates systemic risk",
            "Rising interest rates may compress multiples across all holdings",
            "Technology concentration risk - 35.7% allocation above recommended 30%",
            "Growth stock exposure vulnerable to value rotation"
          ]
        };
      
      case "buffettindicator":
        return {
          ...baseResults,
          recommendation: "Defensive Positioning",
          marketValuation: "185% of GDP",
          historicalAverage: "100% of GDP",
          overvaluation: "85% above average",
          keyMetrics: [
            { label: "Market Cap/GDP", value: "185%", status: "negative" },
            { label: "Historical Average", value: "100%", status: "neutral" },
            { label: "Recession Probability", value: "High", status: "negative" },
            { label: "Correction Risk", value: "35%", status: "negative" }
          ],
          portfolioAnalysis: {
            currentEquityAllocation: "73.2%",
            recommendedEquityAllocation: "45-50%",
            cashPosition: "8.1%",
            recommendedCashPosition: "25-30%",
            defensiveAllocation: "12.4%",
            riskAdjustment: "High Priority"
          },
          allocationRecommendations: [
            { assetClass: "US Equities", current: "58.5%", recommended: "35-40%", action: "Reduce", priority: "High" },
            { assetClass: "International Equities", current: "14.7%", recommended: "10-15%", action: "Slight Reduce", priority: "Medium" },
            { assetClass: "Bonds", current: "18.7%", recommended: "25-30%", action: "Increase", priority: "High" },
            { assetClass: "Cash", current: "8.1%", recommended: "25-30%", action: "Increase", priority: "High" }
          ],
          historicalContext: [
            { period: "2000 Dot-com Peak", ratio: "183%", outcome: "-49% decline over 2 years" },
            { period: "2007 Housing Peak", ratio: "173%", outcome: "-57% decline over 18 months" },
            { period: "Current", ratio: "185%", outcome: "Highest valuation in history" }
          ],
          actions: [
            "Immediately reduce equity allocation from 73% to 50% over next 60 days",
            "Build cash position to 25% through systematic selling of overvalued positions",
            "Shift to defensive sectors: utilities (+5%), consumer staples (+3%), healthcare (+2%)",
            "Consider international markets with lower valuations (Europe, Emerging Markets)",
            "Implement dollar-cost averaging for any new equity purchases"
          ],
          riskFactors: [
            "Current valuation 85% above historical average suggests major correction ahead",
            "Fed policy tightening could trigger rapid devaluation",
            "Historical precedent: every reading above 150% led to 30%+ market decline",
            "Corporate profit margins at unsustainable highs vulnerable to mean reversion"
          ]
        };

      case "dcf":
        return {
          ...baseResults,
          recommendation: "Buy",
          intrinsicValue: "$148.50",
          currentPrice: "$142.30",
          upside: "4.4%",
          keyMetrics: [
            { label: "Present Value", value: "$148.50", status: "positive" },
            { label: "WACC", value: "8.2%", status: "neutral" },
            { label: "Terminal Value", value: "$98.30", status: "positive" },
            { label: "Growth Rate", value: "3.5%", status: "neutral" }
          ],
          actions: [
            "Fair value supports current market price",
            "Conservative growth assumptions provide margin of safety",
            "Consider accumulating on any weakness below $140",
            "Price target: $150-155 range over 12 months"
          ],
          riskFactors: [
            "WACC increase from rising rates would lower valuation",
            "Growth assumptions may be conservative in current environment",
            "Terminal value represents 66% of total valuation"
          ]
        };

      default:
        return {
          ...baseResults,
          recommendation: "Hold",
          keyMetrics: [
            { label: "Analysis Score", value: "7.5/10", status: "positive" },
            { label: "Risk Level", value: "Medium", status: "neutral" },
            { label: "Confidence", value: "High", status: "positive" },
            { label: "Time Horizon", value: "Long-term", status: "neutral" }
          ],
          actions: [
            "Monitor key economic indicators for changes",
            "Maintain current allocation pending new data",
            "Review position sizing for optimal risk management"
          ],
          riskFactors: [
            "Economic uncertainty requires ongoing monitoring",
            "Model assumptions may change with new data"
          ]
        };
    }
  };

  const handleRunAllModels = async () => {
    setRunningAllModels(true);
    setAllModelsResults(null);
    
    const allResults = {};
    const totalModels = models.length;
    
    for (let i = 0; i < models.length; i++) {
      setCurrentStep(`Analyzing ${models[i].name}...`);
      setProgress(Math.round((i / totalModels) * 100));
      
      // Simulate analysis for each model
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      allResults[models[i].id] = generateAnalysisResults(models[i].id);
    }
    
    setAllModelsResults(allResults);
    setRunningAllModels(false);
    setProgress(100);
    setCurrentStep("All Models Complete");
    
    // Reset after 3 seconds
    setTimeout(() => {
      setCurrentStep("");
      setProgress(0);
    }, 3000);
  };

      return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Financial Models</h1>
          <p className="text-gray-600">Sophisticated quantitative analysis powered by proven economic frameworks from legendary economists and investors</p>
        </div>

        {/* Portfolio/File Information Header */}
        <Card className="bg-white border border-gray-200 mb-6">
          <CardHeader className="bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900 mb-1">
                    Analyzing: {portfolioInfo.fileName}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {portfolioInfo.reportType} • {portfolioInfo.totalHoldings} holdings • Last updated {portfolioInfo.lastUpdated}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{portfolioInfo.totalValue}</div>
                <div className="text-sm text-gray-500">Total Portfolio Value</div>
                <Badge className="bg-green-100 text-green-800 mt-1">{portfolioInfo.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-white pt-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{portfolioInfo.totalHoldings}</div>
                <div className="text-xs text-gray-600">Total Holdings</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">{portfolioInfo.uploadDate}</div>
                <div className="text-xs text-gray-600">Upload Date</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">+8.3%</div>
                <div className="text-xs text-gray-600">YTD Return</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">1.2</div>
                <div className="text-xs text-gray-600">Sharpe Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Selector Dropdown */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Financial Model ({models.length} available)
              </label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full max-w-md bg-white border border-gray-300 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Choose a financial model..." />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg">
                  {models.map((model) => (
                    <SelectItem 
                      key={model.id} 
                      value={model.id}
                      className="bg-white hover:bg-gray-50 focus:bg-gray-50 data-[highlighted]:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        {model.category === "Value Investing" && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {model.category === "Market Valuation" && <BarChart3 className="w-4 h-4 text-blue-600" />}
                        {model.category === "Economic Indicator" && <Activity className="w-4 h-4 text-purple-600" />}
                        {model.category === "Derivatives" && <Calculator className="w-4 h-4 text-red-600" />}
                        {model.category === "Macroeconomic" && <DollarSign className="w-4 h-4 text-orange-600" />}
                        {model.category === "Trade Theory" && <TrendingDown className="w-4 h-4 text-indigo-600" />}
                        {model.category === "Economic Framework" && <BarChart3 className="w-4 h-4 text-gray-600" />}
                        {model.category === "Fixed Income" && <Activity className="w-4 h-4 text-green-600" />}
                        {model.category === "Valuation" && <Calculator className="w-4 h-4 text-blue-600" />}
                        <div>
                          <div className="font-medium text-gray-900">{model.name}</div>
                          <div className="text-xs text-gray-500">{model.economist}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              className="bg-white border-green-600 text-green-600 hover:bg-green-50 focus:bg-white focus:ring-green-500"
              onClick={handleRunAllModels}
              disabled={runningAllModels || isRunning}
            >
              {runningAllModels ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"></div>
                  Running All Models...
                </div>
              ) : (
                "Run All Models"
              )}
            </Button>
          </div>

          {/* Selected Model Overview */}
          {models.find(m => m.id === selectedModel) && (
            <Card className="bg-white border border-gray-200 mb-6">
              <CardHeader className="bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">
                      {models.find(m => m.id === selectedModel)?.name}
                    </CardTitle>
                    <p className="text-gray-600 mb-3">
                      {models.find(m => m.id === selectedModel)?.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <strong>Economist:</strong> {models.find(m => m.id === selectedModel)?.economist}
                      </span>
                      <Badge variant="outline" className="bg-white border-blue-200 text-blue-800">
                        {models.find(m => m.id === selectedModel)?.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant="outline" className="bg-white border-green-200 text-green-800">
                      {models.find(m => m.id === selectedModel)?.accuracy} Accuracy
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {models.find(m => m.id === selectedModel)?.timeframe} • {models.find(m => m.id === selectedModel)?.riskLevel} Risk
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Model Analysis Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Info */}
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">{models.find(m => m.id === selectedModel)?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{models.find(m => m.id === selectedModel)?.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <Badge className="bg-green-100 text-green-800">{models.find(m => m.id === selectedModel)?.accuracy}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Level</span>
                  <Badge variant={models.find(m => m.id === selectedModel)?.riskLevel === 'Low' ? 'default' : 'secondary'}>
                    {models.find(m => m.id === selectedModel)?.riskLevel}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Timeframe</span>
                  <span className="text-sm font-medium text-black">{models.find(m => m.id === selectedModel)?.timeframe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-medium text-black">{models.find(m => m.id === selectedModel)?.category}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleRunAnalysis}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Running Analysis...
                    </div>
                  ) : analysisComplete ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Analysis Complete!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Run Analysis
                    </div>
                  )}
                </Button>

                {/* Progress Indicator */}
                {(isRunning || runningAllModels) && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{currentStep}</span>
                      <span className="text-gray-600">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Current Results */}
          <Card className="lg:col-span-2 bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-black">
                Current Analysis Results
                <Badge className={`${
                  selectedAnalysis.confidence === 'High' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-white text-gray-800 border border-gray-300'
                }`}>
                  {selectedAnalysis.confidence} Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {selectedAnalysis.metrics.map((metric, index) => (
                  <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">{metric.value}</span>
                      <span className={`text-sm ${
                        metric.change.startsWith('+') ? 'text-green-600' : 
                        metric.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-lg border-l-4 border-l-green-500 bg-green-50">
                <h4 className="font-semibold text-green-800 mb-2">
                  Recommendation: {selectedAnalysis.recommendation}
                </h4>
                <ul className="space-y-1">
                  {selectedAnalysis.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis Results */}
        {analysisResults && (
          <div className="mt-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader className="bg-white">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Detailed Analysis Results
                  <Badge className="bg-green-100 text-green-800 ml-2">
                    {analysisResults.confidence} Confidence
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Analysis completed at {analysisResults.timestamp}
                </p>
              </CardHeader>
              <CardContent className="bg-white space-y-6">
                {/* Key Recommendation */}
                <div className="p-4 rounded-lg border-l-4 border-l-green-500 bg-green-50">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Primary Recommendation: {analysisResults.recommendation}
                  </h3>
                  {analysisResults.targetPrice && (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Target Price:</span>
                        <div className="font-bold text-green-700">{analysisResults.targetPrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Current Price:</span>
                        <div className="font-bold text-gray-900">{analysisResults.currentPrice}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Upside:</span>
                        <div className="font-bold text-green-600">{analysisResults.upside}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Portfolio Analysis Summary */}
                {analysisResults.portfolioAnalysis && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Portfolio Analysis Summary</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{analysisResults.portfolioAnalysis.totalIntrinsicValue}</div>
                        <div className="text-sm text-gray-600">Intrinsic Value</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{analysisResults.portfolioAnalysis.totalUpside}</div>
                        <div className="text-sm text-gray-600">Total Upside</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{analysisResults.portfolioAnalysis.qualityScore}</div>
                        <div className="text-sm text-gray-600">Quality Score</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-xl font-bold text-gray-600">{analysisResults.portfolioAnalysis.undervaluedHoldings}</div>
                        <div className="text-sm text-gray-600">Undervalued Holdings</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Holdings Breakdown */}
                {analysisResults.holdingsBreakdown && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Holdings Analysis</h4>
                    <div className="space-y-3">
                      {analysisResults.holdingsBreakdown.map((holding, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-semibold text-gray-900">{holding.symbol}</h5>
                              <p className="text-sm text-gray-600">{holding.name}</p>
                            </div>
                            <Badge className={`${
                              holding.recommendation === 'Strong Buy' ? 'bg-green-100 text-green-800' :
                              holding.recommendation === 'Buy' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {holding.recommendation}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Weight:</span>
                              <div className="font-medium">{holding.weight}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Current:</span>
                              <div className="font-medium">{holding.currentPrice}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Intrinsic:</span>
                              <div className="font-medium">{holding.intrinsicValue}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Upside:</span>
                              <div className={`font-medium ${parseFloat(holding.upside) > 10 ? 'text-green-600' : 'text-gray-900'}`}>
                                {holding.upside}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sector Analysis */}
                {analysisResults.sectorAnalysis && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Sector Allocation Analysis</h4>
                    <div className="space-y-2">
                      {analysisResults.sectorAnalysis.map((sector, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">{sector.sector}</span>
                            <Badge variant="outline" className={`${
                              sector.score.startsWith('A') ? 'border-green-200 text-green-800 bg-green-50' :
                              sector.score.startsWith('B') ? 'border-blue-200 text-blue-800 bg-blue-50' :
                              'border-gray-200 text-gray-800 bg-gray-50'
                            }`}>
                              {sector.score}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-900">{sector.allocation}</span>
                            <Badge className={`${
                              sector.recommendation === 'Overweight' ? 'bg-green-100 text-green-800' :
                              sector.recommendation === 'Underweight' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {sector.recommendation}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality Metrics */}
                {analysisResults.qualityMetrics && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Portfolio Quality Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {analysisResults.qualityMetrics.map((metric, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm text-gray-600">{metric.metric}</span>
                            <div className={`w-3 h-3 rounded-full ${
                              metric.status === 'positive' ? 'bg-green-500' :
                              metric.status === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                          <div className="text-xs text-gray-500">Target: {metric.benchmark}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Metrics */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {analysisResults.keyMetrics.map((metric, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="text-sm text-gray-600">{metric.label}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            metric.status === 'positive' ? 'bg-green-500' :
                            metric.status === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommended Actions</h4>
                  <div className="space-y-2">
                    {analysisResults.actions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Risk Factors to Monitor</h4>
                  <div className="space-y-2">
                    {analysisResults.riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>

                                  {/* Model-Specific Data */}
                  {analysisResults.marketValuation && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Market Valuation Analysis</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">{analysisResults.marketValuation}</div>
                          <div className="text-sm text-gray-600">Current Ratio</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-600">{analysisResults.historicalAverage}</div>
                          <div className="text-sm text-gray-600">Historical Average</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{analysisResults.overvaluation}</div>
                          <div className="text-sm text-gray-600">Overvaluation</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Asset Allocation Recommendations */}
                  {analysisResults.allocationRecommendations && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Asset Allocation Recommendations</h4>
                      <div className="space-y-3">
                        {analysisResults.allocationRecommendations.map((allocation, index) => (
                          <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-semibold text-gray-900">{allocation.assetClass}</h5>
                              <Badge className={`${
                                allocation.priority === 'High' ? 'bg-red-100 text-red-800' :
                                allocation.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {allocation.priority} Priority
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Current:</span>
                                <div className="font-medium text-gray-900">{allocation.current}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Recommended:</span>
                                <div className="font-medium text-gray-900">{allocation.recommended}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Action:</span>
                                <div className={`font-medium ${
                                  allocation.action.includes('Reduce') ? 'text-red-600' :
                                  allocation.action.includes('Increase') ? 'text-green-600' :
                                  'text-gray-600'
                                }`}>
                                  {allocation.action}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Historical Context */}
                  {analysisResults.historicalContext && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Historical Context</h4>
                      <div className="space-y-2">
                        {analysisResults.historicalContext.map((context, index) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                            <div>
                              <span className="font-medium text-gray-900">{context.period}</span>
                              <span className="text-sm text-gray-600 ml-2">({context.ratio})</span>
                            </div>
                            <div className={`text-sm font-medium ${
                              context.outcome.includes('decline') ? 'text-red-600' : 'text-orange-600'
                            }`}>
                              {context.outcome}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Export Options */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    Export to PDF
                  </Button>
                  <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    Save to Reports
                  </Button>
                  <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    Share Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
