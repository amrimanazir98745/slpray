import React, { useState } from 'react';
import { NotificationSettings, PrayerKey, District } from '../types/prayer';
import { requestNotificationPermission, sendPrayerNotification, saveNotificationSettings } from '../utils/notifications';
import { getDistrictFullName } from '../utils/sriLankaDistricts';
import { Bell, X, Check, ShieldCheck, Sparkles, Volume2, VolumeX, Music, Square } from 'lucide-react';
import { playAdhanTone, stopAdhanTone, SoundPreset } from '../utils/audioSynthesizer';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NotificationSettings;
  onUpdateSettings: (newSettings: NotificationSettings) => void;
  selectedDistrict: District;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  selectedDistrict,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPermissionStatus('granted');
      const updated = { ...settings, pushEnabled: true };
      onUpdateSettings(updated);
      saveNotificationSettings(updated);
    } else {
      setPermissionStatus(Notification.permission);
    }
  };

  const handleTogglePush = async () => {
    if (!settings.pushEnabled && permissionStatus !== 'granted') {
      await handleRequestPermission();
    } else {
      const updated = { ...settings, pushEnabled: !settings.pushEnabled };
      onUpdateSettings(updated);
      saveNotificationSettings(updated);
    }
  };

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    onUpdateSettings(updated);
    saveNotificationSettings(updated);
  };

  const handleSelectSoundPreset = (preset: SoundPreset) => {
    const updated = { ...settings, soundPreset: preset, soundEnabled: true };
    onUpdateSettings(updated);
    saveNotificationSettings(updated);

    // Play preview automatically when selecting
    setIsPlayingAudio(true);
    playAdhanTone(preset);
    const duration = preset === 'short_adhan' ? 10000 : 5000;
    setTimeout(() => setIsPlayingAudio(false), duration);
  };

  const handlePlaySoundPreview = () => {
    if (isPlayingAudio) {
      stopAdhanTone();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const preset = settings.soundPreset || 'notify_1';
      playAdhanTone(preset);
      const duration = preset === 'short_adhan' ? 10000 : 5000;
      setTimeout(() => setIsPlayingAudio(false), duration);
    }
  };

  const handleTogglePrayer = (key: PrayerKey) => {
    const updated = {
      ...settings,
      prayers: {
        ...settings.prayers,
        [key]: !settings.prayers[key],
      },
    };
    onUpdateSettings(updated);
    saveNotificationSettings(updated);
  };

  const handleTestNotification = () => {
    sendPrayerNotification(
      'Fajr',
      getDistrictFullName(selectedDistrict),
      false,
      settings.soundEnabled,
      settings.soundPreset || 'notify_1'
    );
  };

  const prayerKeys: { key: PrayerKey; label: string }[] = [
    { key: 'Fajr', label: 'Fajr Adhan' },
    { key: 'Dhuhr', label: 'Dhuhr Adhan' },
    { key: 'Asr', label: 'Asr Adhan' },
    { key: 'Maghrib', label: 'Maghrib Adhan' },
    { key: 'Isha', label: 'Isha Adhan' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A0A0C]/90 backdrop-blur-xl animate-fadeIn font-['Anek_Tamil',sans-serif] overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[24px] glass-panel shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 text-[#F3F1EC] border border-[#F3F1EC]/12 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F3F1EC]/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-[14px] glass-btn-accent text-[#C9B896]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#F3F1EC] font-['Anek_Tamil',sans-serif]">Push & Adhan Sound Alerts</h3>
              <p className="text-xs text-[#F3F1EC]/65">Configure Audio Melody & Notifications</p>
            </div>
          </div>

          <button
            onClick={() => {
              stopAdhanTone();
              onClose();
            }}
            className="p-2 rounded-[12px] glass-pill text-[#F3F1EC]/65 hover:text-[#F3F1EC] transition-all active:scale-[0.97] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Banner */}
        <div className="p-4 rounded-[16px] bg-[#1C1B1F]/80 border border-[#F3F1EC]/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#C9B896]" />
              <span className="text-xs font-bold text-[#F3F1EC]">Browser Notification Permission</span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-[6px] ${
              permissionStatus === 'granted'
                ? 'glass-btn-accent text-[#C9B896]'
                : 'glass-pill text-[#F3F1EC]/65'
            }`}>
              {permissionStatus}
            </span>
          </div>

          {permissionStatus !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="w-full py-2.5 rounded-[14px] glass-btn-accent text-[#C9B896] font-extrabold text-xs transition-all active:scale-[0.97] cursor-pointer"
            >
              Grant Browser Notification Permission
            </button>
          )}
        </div>

        {/* Global Sound & Push Toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#1C1B1F]/80 border border-[#F3F1EC]/10">
            <div>
              <span className="block text-xs font-bold text-[#F3F1EC]">Enable Push Notifications</span>
              <span className="text-[10px] text-[#F3F1EC]/65">Receive browser popups at exact Adhan times</span>
            </div>
            <button
              onClick={handleTogglePush}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${settings.pushEnabled ? 'bg-[#C9B896]' : 'bg-[#8F8066]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-[#0A0A0C] absolute top-0.5 transition-transform ${settings.pushEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#1C1B1F]/80 border border-[#F3F1EC]/10">
            <div>
              <span className="block text-xs font-bold text-[#F3F1EC]">Adhan Sound Notification</span>
              <span className="text-[10px] text-[#F3F1EC]/65">Play rich acoustic Takbeer sound when prayer time arrives</span>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${settings.soundEnabled ? 'bg-[#C9B896]' : 'bg-[#8F8066]'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-[#0A0A0C] absolute top-0.5 transition-transform ${settings.soundEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
            </button>
          </div>
        </div>

        {/* Adhan Sound Presets Selection */}
        <div className="space-y-2.5 p-4 rounded-[18px] bg-[#0A0A0C]/80 border border-[#C9B896]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="w-4 h-4 text-[#C9B896]" />
              <h4 className="text-xs font-bold text-[#C9B896] uppercase tracking-wider">Adhan Sound Tone Style</h4>
            </div>
            <button
              onClick={handlePlaySoundPreview}
              className="px-3 py-1 rounded-[10px] glass-btn-accent text-[#C9B896] text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-[0.97] cursor-pointer"
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3 h-3 text-[#C9B896] fill-current" />
                  <span>Stop Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C9B896]" />
                  <span>Preview Sound</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* 1. Good Notify Sound */}
            <button
              onClick={() => handleSelectSoundPreset('notify_1')}
              className={`p-3.5 rounded-[14px] text-left transition-all cursor-pointer border relative ${
                (settings.soundPreset || 'notify_1') === 'notify_1'
                  ? 'bg-[#C9B896]/20 border-[#C9B896] text-[#C9B896]'
                  : 'bg-[#1C1B1F]/60 border-[#F3F1EC]/10 text-[#F3F1EC]/70 hover:text-[#F3F1EC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">1. Good Notify Sound</span>
                <span className="text-[9px] font-bold uppercase bg-[#C9B896]/30 text-[#C9B896] px-1.5 py-0.5 rounded-full border border-[#C9B896]/40">Default</span>
              </div>
              <span className="text-[10px] opacity-75 block mt-0.5">Grand Medina Crystal Bell</span>
            </button>

            {/* 2. Another Good Notify */}
            <button
              onClick={() => handleSelectSoundPreset('notify_2')}
              className={`p-3.5 rounded-[14px] text-left transition-all cursor-pointer border ${
                settings.soundPreset === 'notify_2'
                  ? 'bg-[#C9B896]/20 border-[#C9B896] text-[#C9B896]'
                  : 'bg-[#1C1B1F]/60 border-[#F3F1EC]/10 text-[#F3F1EC]/70 hover:text-[#F3F1EC]'
              }`}
            >
              <span className="block text-xs font-black">2. Another Good Notify</span>
              <span className="text-[10px] opacity-75 block mt-0.5">Peaceful Sanctuary Chime</span>
            </button>

            {/* 3. Short Beautiful Adhan (10 sec) */}
            <button
              onClick={() => handleSelectSoundPreset('short_adhan')}
              className={`p-3.5 rounded-[14px] text-left transition-all cursor-pointer border ${
                settings.soundPreset === 'short_adhan'
                  ? 'bg-[#C9B896]/20 border-[#C9B896] text-[#C9B896]'
                  : 'bg-[#1C1B1F]/60 border-[#F3F1EC]/10 text-[#F3F1EC]/70 hover:text-[#F3F1EC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">3. Short Adhan (10 Sec)</span>
                <span className="text-[9px] font-bold uppercase bg-[#D97706]/30 text-[#FBBF24] px-1.5 py-0.5 rounded-full border border-[#FBBF24]/40">Vocal MP3</span>
              </div>
              <span className="text-[10px] opacity-75 block mt-0.5">Authentic Vocal Call</span>
            </button>
          </div>

          {isPlayingAudio && (
            <div className="flex items-center justify-center space-x-1 py-1.5">
              <span className="text-[10px] text-[#C9B896] font-bold mr-2">Playing Adhan Tone...</span>
              <div className="w-1.5 h-3 bg-[#C9B896] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-4 bg-[#C9B896] rounded-full animate-bounce [animation-delay:0.15s]"></div>
              <div className="w-1.5 h-2 bg-[#C9B896] rounded-full animate-bounce [animation-delay:0.3s]"></div>
            </div>
          )}
        </div>

        {/* Per-Prayer Notification Checkbox Matrix */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#C9B896] uppercase tracking-wider">Per-Prayer Sound & Push Alerts</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {prayerKeys.map(({ key }) => {
              const isChecked = settings.prayers[key];
              return (
                <button
                  key={key}
                  onClick={() => handleTogglePrayer(key)}
                  className={`p-3 rounded-[14px] text-xs font-bold flex items-center justify-between transition-all active:scale-[0.97] cursor-pointer ${
                    isChecked
                      ? 'glass-btn-accent text-[#C9B896] font-extrabold'
                      : 'glass-pill text-[#F3F1EC]/65'
                  }`}
                >
                  <span>{key}</span>
                  {isChecked && <Check className="w-3.5 h-3.5 text-[#C9B896]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Notification Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#F3F1EC]/10">
          <button
            onClick={handleTestNotification}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-[14px] glass-pill text-[#F3F1EC] text-xs font-bold transition-all active:scale-[0.97] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9B896]" />
            <span>Send Test Push & Sound Alert</span>
          </button>

          <button
            onClick={() => {
              stopAdhanTone();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-[14px] glass-btn-accent text-[#C9B896] text-xs font-extrabold transition-all active:scale-[0.97] cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

