
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { File, Upload, Check, X, Eye, Download } from "lucide-react";

interface DocumentUploadProps {
  onViewReport?: (reportId: string) => void;
}

export const DocumentUpload = ({ onViewReport }: DocumentUploadProps) => {
  const [files, setFiles] = useState<Array<{
    id: string;
    name: string;
    size: string;
    status: 'uploading' | 'analyzing' | 'completed' | 'error';
    progress: number;
    reportId?: string;
  }>>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    uploadedFiles.forEach((file) => {
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'uploading' as const,
        progress: 0
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === newFile.id) {
            if (f.progress < 100) {
              return { ...f, progress: f.progress + 10 };
            } else if (f.status === 'uploading') {
              return { ...f, status: 'analyzing' };
            } else if (f.status === 'analyzing') {
              clearInterval(interval);
              return { ...f, status: 'completed', progress: 100, reportId: `report_${f.id}` };
            }
          }
          return f;
        }));
      }, 300);
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'error':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <File className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Badge className="bg-blue-100 text-blue-800">Uploading</Badge>;
      case 'analyzing':
        return <Badge className="bg-white text-gray-800 border border-gray-300">Analyzing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Document Upload</h1>
        <p className="text-gray-600">
          Upload investment reports and summaries for automated analysis
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-white">
          <CardTitle className="text-black">Upload Investment Documents</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors bg-white">
            <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-black">Drag and drop files here</h3>
            <p className="text-gray-600 mb-4">
              or click to browse files (PDF, Word, Excel - Max 50MB)
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button className="cursor-pointer">
                Select Files
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="text-black">Processing Queue</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="space-y-4">
              {files.map((file) => (
                                  <div key={file.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 bg-white">
                  {getStatusIcon(file.status)}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black">{file.name}</span>
                      {getStatusBadge(file.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{file.size}</span>
                      {(file.status === 'uploading' || file.status === 'analyzing') && (
                        <div className="flex-1 max-w-xs">
                          <Progress value={file.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {file.status === 'completed' && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => file.reportId && onViewReport?.(file.reportId)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Guidelines */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-white">
          <CardTitle className="text-black">Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-black mb-3">Supported Formats</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>PDF documents (.pdf)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Word documents (.doc, .docx)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Excel spreadsheets (.xls, .xlsx)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Text files (.txt)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-3">Best Practices</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Ensure documents contain financial metrics</li>
                <li>• Include executive summaries when available</li>
                <li>• Verify document quality for OCR scanning</li>
                <li>• Check file size limits (max 50MB)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
