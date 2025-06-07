
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ModelPerformance = () => {
  const modelData = [
    { name: "Buffett Value Model", accuracy: 94, predictions: 156, confidence: "High" },
    { name: "Fed Model", accuracy: 87, predictions: 89, confidence: "Medium" },
    { name: "DCF Analysis", accuracy: 91, predictions: 203, confidence: "High" },
    { name: "Monte Carlo Simulation", accuracy: 89, predictions: 67, confidence: "Medium" },
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-black">Model Performance Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modelData.map((model) => (
            <div key={model.name} className="p-4 rounded-lg bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-black">{model.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  model.confidence === 'High' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {model.confidence} Confidence
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Accuracy Rate</span>
                    <span className="font-medium text-black">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Predictions</span>
                  <span>{model.predictions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
