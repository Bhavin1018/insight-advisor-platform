
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
    { name: "GDP Growth (YoY)", value: "2.4%", trend: "stable", impact: "Positive", type: "Coincident" },
    { name: "CPI Inflation", value: "3.2%", trend: "down", impact: "Positive", type: "Lagging" },
    { name: "PMI Manufacturing", value: "52.3", trend: "up", impact: "Positive", type: "Leading" },
    { name: "Consumer Confidence", value: "108.7", trend: "up", impact: "Positive", type: "Leading" },
    { name: "Unemployment Rate", value: "3.8%", trend: "stable", impact: "Neutral", type: "Lagging" },
    { name: "10Y-2Y Yield Curve", value: "-0.45%", trend: "inverted", impact: "Negative", type: "Leading" },
    { name: "M2 Money Supply", value: "+6.2%", trend: "up", impact: "Neutral", type: "Leading" },
    { name: "Housing Starts", value: "1.42M", trend: "up", impact: "Positive", type: "Leading" }
  ];

  const marketSignals = [
    {
      signal: "VIX Volatility Index",
      strength: "Strong",
      description: "VIX at 16.8 suggests low fear, potential complacency risk",
      confidence: 85,
      value: "16.8",
      interpretation: "Bullish (Low Fear)"
    },
    {
      signal: "Put/Call Ratio",
      strength: "Moderate",
      description: "0.68 ratio indicates bullish sentiment, below long-term average",
      confidence: 78,
      value: "0.68",
      interpretation: "Bullish Sentiment"
    },
    {
      signal: "MACD Signal",
      strength: "Strong",
      description: "MACD line crossing above signal line on S&P 500",
      confidence: 82,
      value: "Bullish Cross",
      interpretation: "Momentum Buy Signal"
    },
    {
      signal: "RSI Momentum",
      strength: "Moderate",
      description: "RSI at 58, neutral zone with upward momentum",
      confidence: 65,
      value: "58.2",
      interpretation: "Neutral-Bullish"
    },
    {
      signal: "Bollinger Bands",
      strength: "Weak",
      description: "Price near upper band, potential resistance level",
      confidence: 45,
      value: "Upper Band",
      interpretation: "Overbought Warning"
    },
    {
      signal: "Short Interest Ratio",
      strength: "Strong",
      description: "High short interest in meme stocks, squeeze potential",
      confidence: 88,
      value: "8.2 days",
      interpretation: "Squeeze Risk"
    },
    {
      signal: "Insider Trading",
      strength: "Moderate",
      description: "Increased insider buying in tech sector",
      confidence: 70,
      value: "3:1 Buy/Sell",
      interpretation: "Insider Bullish"
    },
    {
      signal: "Currency Strength (DXY)",
      strength: "Strong",
      description: "Dollar strength may pressure emerging markets",
      confidence: 75,
      value: "104.2",
      interpretation: "EM Headwind"
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
          <TabsList className="grid w-full grid-cols-4 bg-gray-200">
            <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
            <TabsTrigger value="economic">Economic Indicators</TabsTrigger>
            <TabsTrigger value="signals">Technical Signals</TabsTrigger>
            <TabsTrigger value="decisions">Decision Matrix</TabsTrigger>
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
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-black">{indicator.name}</span>
                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                              {indicator.type}
                            </Badge>
                          </div>
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
                <CardTitle className="text-black">Technical & Sentiment Signals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {marketSignals.map((signal, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-black text-sm">{signal.signal}</h4>
                        <Badge className={`${
                          signal.strength === 'Strong' ? 'bg-green-100 text-green-800' :
                          signal.strength === 'Moderate' ? 'bg-white text-gray-800 border border-gray-300' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {signal.strength}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-black">{signal.value}</span>
                        <span className="text-sm font-medium text-blue-600">{signal.interpretation}</span>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3">{signal.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Confidence</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${signal.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-black">{signal.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decisions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Investment Decision Framework</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Buy Signals</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• PMI above 50 (expansion)</li>
                      <li>• MACD bullish crossover</li>
                      <li>• Insider buying activity</li>
                      <li>• VIX below 20 (low volatility)</li>
                      <li>• Consumer confidence rising</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Caution Signals</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Inverted yield curve</li>
                      <li>• Price near Bollinger upper band</li>
                      <li>• High short interest ratios</li>
                      <li>• Strong dollar pressure on EM</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">🎯 Action Items</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Monitor Fed policy changes</li>
                      <li>• Watch earnings season impact</li>
                      <li>• Track credit spread movements</li>
                      <li>• Assess geopolitical risks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-black">Risk-Adjusted Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border-l-4 border-l-green-500 bg-green-50">
                    <h4 className="font-semibold text-green-800 mb-2">Conservative Allocation</h4>
                    <p className="text-sm text-green-700 mb-2">Based on current economic indicators:</p>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 40% Large Cap Growth (Tech focus)</li>
                      <li>• 30% Investment Grade Bonds</li>
                      <li>• 20% International Developed Markets</li>
                      <li>• 10% Cash/Money Market</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Moderate Allocation</h4>
                    <p className="text-sm text-blue-700 mb-2">For balanced risk exposure:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 50% Equity (60% US, 40% Intl)</li>
                      <li>• 35% Fixed Income</li>
                      <li>• 10% REITs/Commodities</li>
                      <li>• 5% Cash</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border-l-4 border-l-orange-500 bg-orange-50">
                    <h4 className="font-semibold text-orange-800 mb-2">Aggressive Allocation</h4>
                    <p className="text-sm text-orange-700 mb-2">For growth-oriented investors:</p>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• 70% Growth Stocks</li>
                      <li>• 15% Emerging Markets</li>
                      <li>• 10% High Yield Bonds</li>
                      <li>• 5% Options/Alternatives</li>
                    </ul>
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
