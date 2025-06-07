
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const RecentAnalysis = () => {
  const recentReports = [
    {
      id: 1,
      title: "Tech Growth Fund Q4 Report",
      timestamp: "2 hours ago",
      status: "completed",
      redFlags: 2,
      recommendation: "Hold with caution"
    },
    {
      id: 2,
      title: "Healthcare REIT Analysis",
      timestamp: "5 hours ago",
      status: "completed",
      redFlags: 0,
      recommendation: "Strong Buy"
    },
    {
      id: 3,
      title: "Emerging Markets ETF",
      timestamp: "1 day ago",
      status: "processing",
      redFlags: null,
      recommendation: "Pending"
    },
    {
      id: 4,
      title: "Value Dividend Portfolio",
      timestamp: "2 days ago",
      status: "completed",
      redFlags: 1,
      recommendation: "Buy"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRedFlagBadge = (count: number | null) => {
    if (count === null) return null;
    if (count === 0) return <Badge className="bg-green-100 text-green-800">Clean</Badge>;
    return <Badge className="bg-red-100 text-red-800">{count} Red Flag{count > 1 ? 's' : ''}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Analysis
          <Button variant="outline" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentReports.map((report) => (
          <div key={report.id} className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground">{report.title}</h4>
              {getStatusBadge(report.status)}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{report.timestamp}</span>
              <div className="flex items-center space-x-2">
                {getRedFlagBadge(report.redFlags)}
              </div>
            </div>
            
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">Recommendation: </span>
              <span className="text-sm font-medium">{report.recommendation}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
