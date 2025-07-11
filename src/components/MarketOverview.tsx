
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MarketOverview = () => {
  const marketData = [
    { symbol: "S&P 500", value: "4,783.35", change: "+1.2%", trend: "up" },
    { symbol: "NASDAQ", value: "15,145.33", change: "-0.3%", trend: "down" },
    { symbol: "10Y Treasury", value: "4.15%", change: "+0.05%", trend: "up" },
    { symbol: "VIX", value: "12.45", change: "-1.2%", trend: "down" },
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-black">
          Market Overview
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Markets Open
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {marketData.map((item) => (
          <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100">
            <div className="flex flex-col">
              <span className="font-medium text-black">{item.symbol}</span>
              <span className="text-sm text-gray-600">Real-time</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-black">{item.value}</div>
              <div className={`text-sm font-medium ${
                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
          <h4 className="font-semibold text-black mb-2">Fed Model Analysis</h4>
          <p className="text-sm text-gray-700">
            Current earnings yield (2.1%) vs 10Y Treasury (4.15%) suggests market overvaluation. 
            <span className="font-medium"> Risk Level: Moderate</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
