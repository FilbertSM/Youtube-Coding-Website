import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">YT</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            YouTube Coding Guide
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          {user && (
            <button 
              onClick={() => navigate('/create')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Create Guide
            </button>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {user.user_metadata?.username || user.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button 
                variant="youtube"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;