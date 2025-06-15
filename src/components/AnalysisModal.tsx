
import { useState } from 'react';
import { usePortfolioStore } from '@/stores/portfolioStore';
import { useAnalysisStore } from '@/stores/analysisStore';
import { analysisTypes, getCategoryIcon } from '@/data/analysisTypes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Upload,
  Activity,
  Shield,
  TrendingUp,
  BarChart3,
  PieChart,
  Leaf,
  Calculator,
  DollarSign,
  GitBranch,
  Zap,
  Search,
  Settings,
  Target
} from 'lucide-react';

const iconMap = {
  Activity, Shield, TrendingUp, BarChart3, PieChart, Leaf, Calculator,
  DollarSign, GitBranch, Zap, Search, Settings, CheckCircle: CheckCircle2, Target, FileText
};

export const AnalysisModal = () => {
  const { portfolios, selectedPortfolio, setSelectedPortfolio } = usePortfolioStore();
  const { 
    isModalOpen, 
    closeModal, 
    selectedAnalysisTypes, 
    setAnalysisTypes, 
    analysisDepth, 
    setAnalysisDepth 
  } = useAnalysisStore();
  
  const [outputFormat, setOutputFormat] = useState<'dashboard' | 'pdf' | 'excel' | 'all'>('dashboard');
  const [showUploadNew, setShowUploadNew] = useState(false);

  const handleAnalysisTypeToggle = (typeId: string) => {
    const newTypes = selectedAnalysisTypes.includes(typeId)
      ? selectedAnalysisTypes.filter(id => id !== typeId)
      : [...selectedAnalysisTypes, typeId];
    setAnalysisTypes(newTypes);
  };

  const handleStartAnalysis = () => {
    if (selectedAnalysisTypes.length === 0 || !selectedPortfolio) return;
    
    // Here we would start the actual analysis
    console.log('Starting analysis:', {
      portfolioId: selectedPortfolio,
      analysisTypes: selectedAnalysisTypes,
      depth: analysisDepth,
      outputFormat
    });
    
    closeModal();
  };

  const getEstimatedTime = () => {
    if (selectedAnalysisTypes.length === 0) return '0 min';
    
    const totalMinutes = selectedAnalysisTypes.reduce((total, typeId) => {
      const type = analysisTypes.find(t => t.id === typeId);
      if (!type) return total;
      
      const timeStr = type.estimatedTime[analysisDepth];
      const minutes = parseInt(timeStr.split('-')[1] || timeStr.split('-')[0]);
      return total + minutes;
    }, 0);
    
    return `${Math.ceil(totalMinutes * 0.8)}-${totalMinutes} min`;
  };

  const groupedAnalysisTypes = analysisTypes.reduce((acc, type) => {
    if (!acc[type.category]) acc[type.category] = [];
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, typeof analysisTypes>);

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">New Portfolio Analysis</DialogTitle>
          <DialogDescription className="text-gray-600">
            Select your portfolio and choose the analysis types you'd like to run
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Portfolio Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-black">Select Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedPortfolio || ''} onValueChange={setSelectedPortfolio}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose a portfolio to analyze" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {portfolios.map((portfolio) => (
                    <SelectItem key={portfolio.id} value={portfolio.id}>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>{portfolio.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {portfolio.totalValue}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setShowUploadNew(!showUploadNew)}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Types Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-black">Analysis Types</CardTitle>
              <div className="text-sm text-gray-600">
                Selected: {selectedAnalysisTypes.length} | Estimated time: {getEstimatedTime()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(groupedAnalysisTypes).map(([category, types]) => {
                const CategoryIcon = iconMap[getCategoryIcon(category) as keyof typeof iconMap];
                return (
                  <div key={category}>
                    <div className="flex items-center space-x-2 mb-3">
                      <CategoryIcon className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-black capitalize">
                        {category.replace('_', ' ')}
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-7">
                      {types.map((type) => {
                        const TypeIcon = iconMap[type.icon as keyof typeof iconMap];
                        const isSelected = selectedAnalysisTypes.includes(type.id);
                        
                        return (
                          <div
                            key={type.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              isSelected 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleAnalysisTypeToggle(type.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <Checkbox 
                                checked={isSelected}
                                onChange={() => handleAnalysisTypeToggle(type.id)}
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <TypeIcon className="w-4 h-4 text-blue-600" />
                                  <h5 className="font-medium text-black text-sm">
                                    {type.name}
                                  </h5>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  {type.description}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">
                                    {type.estimatedTime[analysisDepth]}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Analysis Depth & Output Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-black">Analysis Depth</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={analysisDepth} onValueChange={setAnalysisDepth}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quick" id="quick" />
                    <Label htmlFor="quick" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Quick Analysis</div>
                        <div className="text-sm text-gray-600">Essential metrics and recommendations</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comprehensive" id="comprehensive" />
                    <Label htmlFor="comprehensive" className="cursor-pointer">
                      <div>
                        <div className="font-medium">Comprehensive Analysis</div>
                        <div className="text-sm text-gray-600">Detailed analysis with full reports</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-black">Output Format</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="dashboard">Dashboard View Only</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="excel">Excel Export</SelectItem>
                    <SelectItem value="all">All Formats</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {selectedAnalysisTypes.length} analysis types selected
              </div>
              <Button 
                onClick={handleStartAnalysis}
                disabled={selectedAnalysisTypes.length === 0 || !selectedPortfolio}
                className="robinhood-button"
              >
                <Activity className="w-4 h-4 mr-2" />
                Start Analysis
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
