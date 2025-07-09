
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Monitor, Smartphone } from 'lucide-react';

const ViewSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobilePage = location.pathname === '/mobile';

  const switchView = () => {
    if (isMobilePage) {
      navigate('/', { replace: true });
    } else {
      navigate('/mobile', { replace: true });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={switchView}
        variant="outline"
        size="sm"
        className="
          bg-white/90 
          backdrop-blur-sm 
          border-2 
          border-foreground/20 
          shadow-lg 
          hover:bg-white 
          hover:scale-105 
          transition-all
        "
      >
        {isMobilePage ? (
          <>
            <Monitor className="w-4 h-4 mr-2" />
            Desktop View
          </>
        ) : (
          <>
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile View
          </>
        )}
      </Button>
    </div>
  );
};

export default ViewSwitcher;
