import React from 'react';
import { Bell, Calendar, Sparkles, Download, Smartphone } from 'lucide-react';
import { TasbihIcon, DuaIcon, WebsiteLogoIcon } from './IslamicIcons';

interface HeaderProps {
  activeTab: 'today' | 'calendar' | 'tasbih' | 'duas';
  setActiveTab: (tab: 'today' | 'calendar' | 'tasbih' | 'duas') => void;
  hijriDate: string;
  onOpenNotifications: () => void;
  onInstallPwa?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hijriDate,
  onOpenNotifications,
  onInstallPwa,
}) => {
  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-[#F3F1EC]/12 transition-colors duration-300 font-['Anek_Tamil',sans-serif]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('today')}>
            <div className="relative flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105">
              <WebsiteLogoIcon className="w-10 h-10 sm:w-11 sm:h-11" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="text-base sm:text-lg font-black text-[#F3F1EC] tracking-wide font-['Anek_Tamil',sans-serif]">
                  Srilanka <span className="text-[#C9B896]">Prayer Times</span>
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-[#F3F1EC]/65 font-medium leading-none mt-0.5">
                {hijriDate}
              </p>
            </div>
          </div>

          {/* Action Tools: Install PWA + Notifications */}
          <div className="flex items-center space-x-2 shrink-0">
            {onInstallPwa && (
              <button
                onClick={onInstallPwa}
                className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-[14px] glass-btn-accent text-[#C9B896] hover:text-white text-xs font-black flex items-center space-x-1.5 transition-all active:scale-[0.97] cursor-pointer shadow-md"
                title="Download App / Add to Home Screen"
              >
                <Download className="w-4 h-4 text-[#C9B896]" />
                <span className="hidden sm:inline">Download App</span>
              </button>
            )}

            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 sm:p-3 rounded-[14px] glass-pill text-[#F3F1EC] transition-all active:scale-[0.97] flex items-center justify-center cursor-pointer"
              title="Push Notification Settings"
            >
              <Bell className="w-4 h-4 text-[#C9B896]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9B896] rounded-full"></span>
            </button>
          </div>

        </div>

        {/* Liquid Glass Tab Navigation Menu (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center space-x-2 border-t border-[#F3F1EC]/10 py-2.5">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-[14px] text-xs sm:text-sm font-extrabold transition-all active:scale-[0.97] cursor-pointer ${
              activeTab === 'today'
                ? 'glass-btn-accent text-[#C9B896] font-extrabold'
                : 'glass-pill text-[#F3F1EC]/65 hover:text-[#F3F1EC]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9B896]" />
            <span>Today's Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-[14px] text-xs sm:text-sm font-extrabold transition-all active:scale-[0.97] cursor-pointer ${
              activeTab === 'calendar'
                ? 'glass-btn-accent text-[#C9B896] font-extrabold'
                : 'glass-pill text-[#F3F1EC]/65 hover:text-[#F3F1EC]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#C9B896]" />
            <span>Monthly Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('tasbih')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-[14px] text-xs sm:text-sm font-extrabold transition-all active:scale-[0.97] cursor-pointer ${
              activeTab === 'tasbih'
                ? 'glass-btn-accent text-[#C9B896] font-extrabold'
                : 'glass-pill text-[#F3F1EC]/65 hover:text-[#F3F1EC]'
            }`}
          >
            <TasbihIcon className="w-4 h-4 text-[#C9B896]" />
            <span>Digital Tasbih</span>
          </button>

          <button
            onClick={() => setActiveTab('duas')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-[14px] text-xs sm:text-sm font-extrabold transition-all active:scale-[0.97] cursor-pointer ${
              activeTab === 'duas'
                ? 'glass-btn-accent text-[#C9B896] font-extrabold'
                : 'glass-pill text-[#F3F1EC]/65 hover:text-[#F3F1EC]'
            }`}
          >
            <DuaIcon className="w-4 h-4 text-[#C9B896]" />
            <span>Daily Duas</span>
          </button>
        </div>

      </div>
    </header>
  );
};
