import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

interface DetailedReportProps {
  reportId: string;
  reportData?: any;
}

export const DetailedReport = ({ reportId, reportData }: DetailedReportProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample report data
  const sampleReport = {
    id: reportId,
    title: "Technology Growth Fund Q4 Analysis",
    uploadDate: "2024-01-15",
    analyst: "Sarah Chen",
    totalValue: "$2,847,392",
    performance: "+12.4%",
    riskLevel: "Moderate",
    recommendation: "Hold with Caution",
    
    portfolioBreakdown: [
      { name: "Equity", value: 51.69, color: "#3b82f6" },
      { name: "Debt (MF)", value: 20.24, color: "#8b5cf6" },
      { name: "Equity (MF)", value: 16.70, color: "#ec4899" },
      { name: "Debt", value: 8.96, color: "#f97316" },
      { name: "Gold", value: 2.41, color: "#eab308" }
    ],
    
    sectorBreakdown: [
      { name: "Financials", value: 25.59, color: "#3b82f6" },
      { name: "Energy", value: 23.37, color: "#8b5cf6" },
      { name: "Information Technology", value: 12.91, color: "#10b981" },
      { name: "Consumer Services", value: 9.02, color: "#f59e0b" },
      { name: "Materials", value: 6.93, color: "#ef4444" },
      { name: "Healthcare", value: 5.12, color: "#06b6d4" }
    ],

    topHoldings: [
      { symbol: "MSFT", name: "Microsoft Corp", allocation: 8.45, value: "$241,235", change: "+2.3%" },
      { symbol: "AAPL", name: "Apple Inc", allocation: 7.82, value: "$222,658", change: "+1.8%" },
      { symbol: "GOOGL", name: "Alphabet Inc", allocation: 6.91, value: "$196,774", change: "+3.1%" },
      { symbol: "AMZN", name: "Amazon.com Inc", allocation: 5.67, value: "$161,447", change: "-0.5%" },
      { symbol: "TSLA", name: "Tesla Inc", allocation: 4.23, value: "$120,436", change: "+4.2%" }
    ],

    performanceMetrics: [
      { label: "1 Month", value: "+3.2%", trend: "up" },
      { label: "3 Months", value: "+8.7%", trend: "up" },
      { label: "6 Months", value: "+12.4%", trend: "up" },
      { label: "1 Year", value: "+18.9%", trend: "up" },
      { label: "3 Years", value: "+45.2%", trend: "up" }
    ],

    riskMetrics: [
      { label: "Sharpe Ratio", value: "1.34", status: "good" },
      { label: "Beta", value: "1.12", status: "moderate" },
      { label: "Max Drawdown", value: "-8.2%", status: "good" },
      { label: "Volatility", value: "14.5%", status: "moderate" }
    ],

    redFlags: [
      { type: "warning", message: "High concentration in technology sector (65%)" },
      { type: "alert", message: "Currency exposure to USD increased by 12%" }
    ],

    insights: [
      "Portfolio shows strong momentum with consistent outperformance",
      "Technology sector allocation may need rebalancing",
      "Geographic diversification could be improved",
      "Risk-adjusted returns remain attractive"
    ]
  };

  const renderSimpleChart = (data: any[], title: string) => (
    <div className="space-y-4">
      <h4 className="font-semibold text-black text-center">{title}</h4>
      <div className="space-y-3">
        {data.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="font-medium text-black">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 p-6 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">{sampleReport.title}</h1>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span>Uploaded: {sampleReport.uploadDate}</span>
              <span>•</span>
              <span>Analyst: {sampleReport.analyst}</span>
              <span>•</span>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-300 text-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button className="robinhood-button">Share Report</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6 bg-white">
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-black">{sampleReport.totalValue}</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {sampleReport.performance}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6 bg-white">
              <div className="text-sm text-gray-600">Risk Level</div>
              <div className="text-xl font-bold text-black">{sampleReport.riskLevel}</div>
              <Badge className="bg-yellow-100 text-yellow-800 mt-2">Monitor</Badge>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6 bg-white">
              <div className="text-sm text-gray-600">Recommendation</div>
              <div className="text-lg font-bold text-black">{sampleReport.recommendation}</div>
              <div className="flex items-center mt-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                <span className="text-sm text-yellow-600">2 Red Flags</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6 bg-white">
              <div className="text-sm text-gray-600">Holdings</div>
              <div className="text-2xl font-bold text-black">24</div>
              <div className="text-sm text-gray-600">Active Positions</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 bg-white">
                  {renderSimpleChart(sampleReport.portfolioBreakdown, "Asset Allocation")}
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 bg-white">
                  {renderSimpleChart(sampleReport.sectorBreakdown, "Sector Breakdown")}
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 bg-white">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-black text-center">Top Holdings</h4>
                    <div className="space-y-3">
                      {sampleReport.topHoldings.slice(0, 5).map((holding, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-bold text-blue-600 text-xs">{holding.symbol}</span>
                            </div>
                            <span className="text-sm text-gray-700">{holding.name.split(' ')[0]}</span>
                          </div>
                          <span className="font-medium text-black text-sm">{holding.allocation}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black">Sector Allocation Details</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-4">
                    {sampleReport.sectorBreakdown.map((sector, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: sector.color }}
                          ></div>
                          <span className="font-medium text-black">{sector.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-black">{sector.value}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${Math.min(sector.value * 2, 100)}%`, 
                                backgroundColor: sector.color 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black">Top Holdings Details</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-4">
                    {sampleReport.topHoldings.map((holding, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-blue-600 text-xs">{holding.symbol}</span>
                          </div>
                          <div>
                            <div className="font-medium text-black text-sm">{holding.name}</div>
                            <div className="text-xs text-gray-600">{holding.allocation}% allocation</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-black text-sm">{holding.value}</div>
                          <div className={`text-xs font-medium ${
                            holding.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {holding.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black">Performance Returns</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-4">
                    {sampleReport.performanceMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium text-black">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-green-600">{metric.value}</span>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black">Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-4">
                    {sampleReport.riskMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium text-black">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-black">{metric.value}</span>
                          <Badge 
                            className={
                              metric.status === 'good' ? 'bg-green-100 text-green-800' :
                              metric.status === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    Red Flags
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-3">
                    {sampleReport.redFlags.map((flag, index) => (
                      <div key={index} className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-800">{flag.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader className="bg-white">
                  <CardTitle className="text-black flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="space-y-3">
                    {sampleReport.insights.map((insight, index) => (
                      <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800">{insight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}; 