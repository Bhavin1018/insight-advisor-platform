
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Auth } from "@/components/Auth";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { DocumentUpload } from "@/components/DocumentUpload";
import { DetailedReport } from "@/components/DetailedReport";
import { ModelAnalysis } from "@/components/ModelAnalysis";
import { MarketTrends } from "@/components/MarketTrends";
import { Reports } from "@/components/Reports";

export type ViewType = 'dashboard' | 'upload' | 'models' | 'trends' | 'reports';

const Index = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={setCurrentView} />;
      case 'upload':
        return <DocumentUpload onViewReport={(reportId) => {
          setSelectedReport(reportId);
          setCurrentView('reports');
        }} />;
      case 'models':
        return <ModelAnalysis />;
      case 'trends':
        return <MarketTrends />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex">
        <Sidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 bg-white ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <div className="p-6 bg-white">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
