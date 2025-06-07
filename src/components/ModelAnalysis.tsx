
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ModelAnalysis = () => {
  const [selectedModel, setSelectedModel] = useState("buffett");

  const models = [
    {
      id: "buffett",
      name: "Buffett Value Model",
      description: "Focus on intrinsic value and long-term cash flow analysis",
      accuracy: "94%",
      riskLevel: "Low",
      timeframe: "Long-term"
    },
    {
      id: "fed",
      name: "Fed Model",
      description: "Compare equity yields with Treasury yields for market valuation",
      accuracy: "87%",
      riskLevel: "Medium",
      timeframe: "Medium-term"
    },
    {
      id: "dcf",
      name: "DCF Analysis",
      description: "Estimate intrinsic value based on projected cash flows",
      accuracy: "91%",
      riskLevel: "Medium",
      timeframe: "Long-term"
    },
    {
      id: "montecarlo",
      name: "Monte Carlo Simulation",
      description: "Assess risk through probabilistic scenario analysis",
      accuracy: "89%",
      riskLevel: "High",
      timeframe: "Variable"
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
        "Low debt levels provide financial stability"
      ]
    },
    fed: {
      metrics: [
        { label: "Earnings Yield", value: "2.1%", change: "+0.1%" },
        { label: "10Y Treasury", value: "4.15%", change: "+0.05%" },
        { label: "Yield Spread", value: "-2.05%", change: "+0.05%" },
        { label: "Fair Value", value: "Overvalued", change: "No change" }
      ],
      recommendation: "Hold with Caution",
      confidence: "Medium",
      insights: [
        "Current earnings yield below Treasury yield suggests overvaluation",
        "Negative spread indicates potential market correction risk",
        "Monitor Fed policy changes for yield adjustments"
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
        "WACC remains stable reflecting low financing risk"
      ]
    },
    montecarlo: {
      metrics: [
        { label: "Expected Return", value: "12.4%", change: "+0.3%" },
        { label: "Value at Risk (95%)", value: "-8.2%", change: "+0.4%" },
        { label: "Sharpe Ratio", value: "1.35", change: "+0.08" },
        { label: "Max Drawdown", value: "-15.6%", change: "-1.2%" }
      ],
      recommendation: "Buy",
      confidence: "Medium",
      insights: [
        "Positive expected return with acceptable risk profile",
        "VaR indicates manageable downside risk",
        "Strong risk-adjusted returns based on Sharpe ratio"
      ]
    }
  };

  const selectedAnalysis = currentAnalysis[selectedModel as keyof typeof currentAnalysis];

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-black">Financial Models</h1>
          <p className="text-gray-600">
            Run sophisticated financial models to analyze investments and market conditions
          </p>
        </div>

        <Tabs value={selectedModel} onValueChange={setSelectedModel}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            {models.map((model) => (
              <TabsTrigger key={model.id} value={model.id} className="text-xs">
                {model.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {models.map((model) => (
            <TabsContent key={model.id} value={model.id}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Model Info */}
                <Card className="bg-white border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">{model.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{model.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Accuracy</span>
                        <Badge className="bg-green-100 text-green-800">{model.accuracy}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Risk Level</span>
                        <Badge variant={model.riskLevel === 'Low' ? 'default' : 'secondary'}>
                          {model.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Timeframe</span>
                        <span className="text-sm font-medium text-black">{model.timeframe}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4 robinhood-button">Run Analysis</Button>
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
                          : 'bg-yellow-100 text-yellow-800'
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
