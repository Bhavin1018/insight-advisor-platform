
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketOverview } from "@/components/MarketOverview";
import { RecentAnalysis } from "@/components/RecentAnalysis";
import { ModelPerformance } from "@/components/ModelPerformance";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-8 p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back. Here's your financial analysis overview.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-300 text-gray-700">Export Data</Button>
            <Button className="robinhood-button">New Analysis</Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Reports</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">247</div>
              <p className="text-sm text-green-600 font-medium">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Models Executed</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">1,432</div>
              <p className="text-sm text-green-600 font-medium">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Red Flags Detected</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">12</div>
              <p className="text-sm text-red-600 font-medium">-15% from last month</p>
            </CardContent>
          </Card>

          <Card className="robinhood-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Processing Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-black">42s</div>
              <p className="text-sm text-green-600 font-medium">-18s improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketOverview />
          <RecentAnalysis />
        </div>

        <ModelPerformance />
      </div>
    </div>
  );
};
