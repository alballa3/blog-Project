import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, Bell, Settings, LogOut, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from 'react-router';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  userAvatar?: string;
  notifications?: Array<{
    id: string;
    message: string;
    timestamp: string;
    read: boolean;
    type: 'info' | 'warning' | 'error';
  }>;
  onSignOut: () => void;
  onNotificationClick?: (id: string) => void;
  onNotificationsClear?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  userName = '',
  userAvatar,
  notifications = [],
  onSignOut,
  onNotificationClick,
  onNotificationsClear
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <TooltipProvider>
      <header className="bg-white border-b border-gray-300 fixed w-full top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={menuRef}>
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Simple Blog
            </a>

            <div className="hidden md:flex items-center space-x-6">
              {menuItems.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className={`
                    text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  `}
                >
                  {label}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <div className="relative">
                              <Bell className="h-5 w-5" />
                              {unreadCount > 0 && (
                                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                                  {unreadCount > 99 ? '99+' : unreadCount}
                                </Badge>
                              )}
                            </div>
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Notifications</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="flex justify-between items-center p-2 border-b">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                          <Button variant="ghost" size="sm" onClick={onNotificationsClear}>
                            Clear all
                          </Button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-sm text-gray-500 p-4 text-center">No notifications</p>
                        ) : (
                          notifications.map(notification => (
                            <DropdownMenuItem
                              key={notification.id}
                              onClick={() => onNotificationClick?.(notification.id)}
                              className={`p-3 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                              <div>
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                              </div>
                            </DropdownMenuItem>
                          ))
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        {userAvatar ? (
                          <img src={userAvatar} alt={userName} className="h-6 w-6 rounded-full" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="max-w-[100px] truncate">{userName}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onSignOut} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className={`
                      block px-3 py-2 rounded-md text-base font-medium
                      text-gray-700 hover:text-blue-600
                    `}
                  >
                    {label}
                  </a>
                ))}

                {isAuthenticated ? (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex items-center px-3">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
                      ) : (
                        <User className="h-8 w-8" />
                      )}
                      <span className="ml-3 font-medium">{userName}</span>
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <UserCircle className="mr-2 h-4 w-4" /> Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Button>
                      <Button variant="ghost" onClick={onSignOut} className="w-full justify-start text-red-600">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                      Sign In
                    </Button>
                    <Button className="w-full bg-blue-600 text-white">
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </TooltipProvider>
  );
};