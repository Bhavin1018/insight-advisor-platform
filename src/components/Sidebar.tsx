
import { ViewType } from "@/pages/Index";
import { 
  Book, 
  BarChart3, 
  File, 
  Folder, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: BarChart3 },
  { id: 'upload' as ViewType, label: 'Document Upload', icon: File },
  { id: 'models' as ViewType, label: 'Financial Models', icon: Book },
  { id: 'trends' as ViewType, label: 'Market Trends', icon: TrendingUp },
  { id: 'reports' as ViewType, label: 'Analysis Reports', icon: Folder },
];

export const Sidebar = ({ currentView, setCurrentView, isOpen }: SidebarProps) => {
  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${!isOpen && 'px-3'} ${
                  isActive 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentView(item.id)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
        
        {isOpen && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-black mb-3">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reports Analyzed</span>
                <span className="font-medium text-black">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Models Run</span>
                <span className="font-medium text-black">1,432</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Red Flags</span>
                <span className="font-medium text-red-600">12</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
