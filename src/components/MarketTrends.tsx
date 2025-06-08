
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MarketTrends = () => {
  const sectorData = [
    { name: "Technology", performance: "+8.2%", trend: "up", risk: "Medium" },
    { name: "Healthcare", performance: "+3.1%", trend: "up", risk: "Low" },
    { name: "Energy", performance: "-2.4%", trend: "down", risk: "High" },
    { name: "Financials", performance: "+1.8%", trend: "up", risk: "Medium" },
    { name: "Consumer Disc.", performance: "-0.7%", trend: "down", risk: "Medium" },
    { name: "Real Estate", performance: "+2.9%", trend: "up", risk: "Medium" }
  ];

  const economicIndicators = [
    { name: "GDP Growth", value: "2.4%", trend: "stable", impact: "Positive" },
    { name: "Inflation Rate", value: "3.2%", trend: "down", impact: "Positive" },
    { name: "Unemployment", value: "3.8%", trend: "stable", impact: "Neutral" },
    { name: "Fed Funds Rate", value: "5.25%", trend: "stable", impact: "Negative" }
  ];

  const marketSignals = [
    {
      signal: "Bullish Sentiment",
      strength: "Strong",
      description: "Options flow showing increased call activity",
      confidence: 85
    },
    {
      signal: "Yield Curve Inversion",
      strength: "Moderate",
      description: "2Y/10Y spread remains inverted, recession indicator",
      confidence: 72
    },
    {
      signal: "Credit Spreads Tightening",
      strength: "Weak",
      description: "Corporate bonds showing improved credit conditions",
      confidence: 58
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Market Trends</h1>
            <p className="text-gray-600">
              Real-time market analysis and trend identification
            </p>
          </div>
          <Button className="robinhood-button">
            Generate Report
          </Button>
        </div>

        <Tabs defaultValue="sectors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-200">
            <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
            <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
            <TabsTrigger value="signals">Market Signals</TabsTrigger>
          </TabsList>

          <TabsContent value="sectors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Sector Performance (30D)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorData.map((sector) => (
                      <div key={sector.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            sector.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <span className="font-medium text-black">{sector.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={sector.risk === 'Low' ? 'default' : 'secondary'}>
                            {sector.risk} Risk
                          </Badge>
                          <span className={`font-bold ${
                            sector.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {sector.performance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Trending Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Top Performer</h4>
                    <p className="text-sm text-green-700">
                      Technology sector leading with +8.2% gains driven by AI and cloud adoption
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Underperformer</h4>
                    <p className="text-sm text-red-700">
                      Energy sector declining -2.4% due to oil price volatility and demand concerns
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Key Insight</h4>
                    <p className="text-sm text-blue-700">
                      Defensive sectors (Healthcare, Utilities) showing resilience amid market uncertainty
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="economic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Economic Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economicIndicators.map((indicator) => (
                      <div key={indicator.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white">
                        <div>
                          <span className="font-medium text-black">{indicator.name}</span>
                          <div className="text-sm text-gray-600">
                            Trend: {indicator.trend}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-black">{indicator.value}</div>
                          <Badge className={`${
                            indicator.impact === 'Positive' ? 'bg-green-100 text-green-800' :
                            indicator.impact === 'Negative' ? 'bg-red-100 text-red-800' :
                            'bg-white text-gray-800 border border-gray-300'
                          }`}>
                            {indicator.impact}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Economic Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Current Environment</h4>
                    <p className="text-sm text-blue-700">
                      Economy showing resilience with steady GDP growth and declining inflation
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white border border-gray-300">
                    <h4 className="font-semibold text-gray-800 mb-2">Federal Reserve Outlook</h4>
                    <p className="text-sm text-gray-700">
                      Fed likely to maintain current rates through Q2 2024, watching inflation data
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Investment Implication</h4>
                    <p className="text-sm text-green-700">
                      Favorable environment for quality growth stocks and high-grade corporates
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Market Sentiment Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {marketSignals.map((signal, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-black">{signal.signal}</h4>
                        <Badge className={`${
                          signal.strength === 'Strong' ? 'bg-green-100 text-green-800' :
                          signal.strength === 'Moderate' ? 'bg-white text-gray-800 border border-gray-300' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {signal.strength}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{signal.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Confidence Level</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${signal.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-black">{signal.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
