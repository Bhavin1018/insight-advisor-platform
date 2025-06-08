
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Calendar, ArrowLeft } from "lucide-react";
import { DetailedReport } from "./DetailedReport";

export const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 1,
      title: "Q4 2023 Technology Fund Analysis",
      type: "Investment Report",
      date: "2024-01-15",
      status: "completed",
      redFlags: 2,
      recommendation: "Hold with Caution",
      analyst: "Sarah Chen",
      models: ["Buffett", "DCF", "Monte Carlo"]
    },
    {
      id: 2,
      title: "Healthcare REIT Portfolio Review",
      type: "Portfolio Analysis",
      date: "2024-01-12",
      status: "completed",
      redFlags: 0,
      recommendation: "Strong Buy",
      analyst: "Michael Rodriguez",
      models: ["Fed Model", "DCF"]
    },
    {
      id: 3,
      title: "Emerging Markets ETF Assessment",
      type: "Risk Analysis",
      date: "2024-01-10",
      status: "processing",
      redFlags: null,
      recommendation: "Pending",
      analyst: "Jennifer Liu",
      models: ["Monte Carlo", "Comparable Analysis"]
    },
    {
      id: 4,
      title: "Value Dividend Strategy Report",
      type: "Strategy Analysis",
      date: "2024-01-08",
      status: "completed",
      redFlags: 1,
      recommendation: "Buy",
      analyst: "David Thompson",
      models: ["Buffett", "Dividend Discount Model"]
    },
    {
      id: 5,
      title: "Corporate Bond Fund Review",
      type: "Fixed Income",
      date: "2024-01-05",
      status: "completed",
      redFlags: 0,
      recommendation: "Strong Buy",
      analyst: "Lisa Park",
      models: ["Credit Analysis", "Duration Model"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-gray-100 text-gray-800">Processing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRedFlagBadge = (count: number | null) => {
    if (count === null) return <Badge variant="secondary">Pending</Badge>;
    if (count === 0) return <Badge className="bg-green-100 text-green-800">Clean</Badge>;
    return <Badge className="bg-red-100 text-red-800">{count} Red Flag{count > 1 ? 's' : ''}</Badge>;
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Strong Buy':
        return 'text-green-700 bg-green-100';
      case 'Buy':
        return 'text-green-600 bg-green-50';
      case 'Hold with Caution':
        return 'text-gray-700 bg-white border border-gray-300';
      case 'Sell':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.analyst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show detailed report if one is selected
  if (selectedReport) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-6 bg-white">
          <Button 
            variant="outline" 
            className="mb-6 border-gray-300 text-gray-700"
            onClick={() => setSelectedReport(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Button>
          <DetailedReport reportId={selectedReport} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Analysis Reports</h1>
            <p className="text-gray-600">
              View and manage all investment analysis reports
            </p>
          </div>
          <Button className="robinhood-button">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border border-gray-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                <Input
                  placeholder="Search reports, analysts, or types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Filter by Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-black">{report.title}</h3>
                      {getStatusBadge(report.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>Analyst: {report.analyst}</span>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      {getRedFlagBadge(report.redFlags)}
                      <Badge className={getRecommendationColor(report.recommendation)}>
                        {report.recommendation}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Models used:</span>
                      {report.models.map((model, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-700">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-300 text-gray-700"
                      onClick={() => setSelectedReport(`report_${report.id}`)}
                    >
                      View Details
                    </Button>
                    {report.status === 'completed' && (
                      <Button size="sm" variant="ghost" className="text-gray-700">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="bg-white border border-gray-200">
            <CardContent className="text-center py-12">
              <p className="text-gray-600">No reports found matching your search criteria.</p>
              <Button variant="outline" className="mt-4 border-gray-300 text-gray-700" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
