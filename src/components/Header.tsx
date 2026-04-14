import { Link, useLocation } from "react-router-dom";
import { FileSearch, MessageSquare, Home, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Главная", icon: Home },
    { to: "/analyze", label: "Анализ ТЗ", icon: FileSearch },
    { to: "/chat", label: "AI Ассистент", icon: MessageSquare },
    { to: "/history", label: "История", icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <FileSearch className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">TZ Analyzer</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.to}
              variant={location.pathname === item.to ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to={item.to} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
