
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-700"></div>
              <div className="w-full h-0.5 bg-gray-700"></div>
              <div className="w-full h-0.5 bg-gray-700"></div>
            </div>
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-green-600">PFAP</h1>
            <p className="text-sm text-gray-600">Private Financial Analysis Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-black">Financial Analyst</p>
            <p className="text-xs text-gray-600">Investment Team</p>
          </div>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <User className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};
