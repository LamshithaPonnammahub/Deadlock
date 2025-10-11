import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon.jsx';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Active Call',
      path: '/emergency-call-interface',
      icon: 'Phone',
      description: 'Real-time call processing'
    },
    {
      label: 'Medical Guidance',
      path: '/first-aid-guidance',
      icon: 'Heart',
      description: 'Life-saving instructions'
    },
    {
      label: 'Dispatch',
      path: '/ambulance-dispatch',
      icon: 'Truck',
      description: 'Response coordination'
    }
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Admin', path: '/admin', icon: 'Shield' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 glass-card border-b border-border/20 shadow-glow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl shadow-glow animate-float">
            <Icon name="Shield" size={28} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gradient leading-tight">
              Smart Emergency Assistant
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              Emergency Response System
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationItems?.map((item) => {
            const isActive = isActivePath(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ease-out
                  ${isActive 
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow animate-glow' 
                    : 'text-foreground hover:bg-muted/50 hover:text-foreground hover:shadow-medical'
                  }
                `}
                title={item?.description}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActive ? 'currentColor' : 'currentColor'} 
                />
                <span className="font-semibold text-sm">{item?.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Emergency Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-success/20 text-success rounded-full shadow-glow-success">
            <div className="w-2.5 h-2.5 bg-success rounded-full animate-breathing"></div>
            <span className="text-sm font-semibold">System Active</span>
          </div>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoreMenuToggle}
              iconName="MoreHorizontal"
              iconSize={18}
              className="text-muted-foreground hover:text-foreground"
            >
              More
            </Button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 glass-card border border-border/20 rounded-xl shadow-glow z-1100 animate-slide-up">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted/50 transition-all duration-200 hover:shadow-medical"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span className="font-medium">{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground hover:text-foreground"
            iconName="Menu"
            iconSize={20}
          >
            Menu
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border/20 glass-card">
        <nav className="flex items-center justify-around py-3">
          {navigationItems?.map((item) => {
            const isActive = isActivePath(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 ease-out
                  ${isActive 
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={22} 
                  color="currentColor" 
                />
                <span className="text-xs font-semibold">{item?.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Click outside handler for more menu */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-1050" 
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;