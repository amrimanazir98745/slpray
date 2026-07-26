import React, { useState } from 'react';
import { District } from '../types/prayer';
import { RegionalAttentionModal } from './RegionalAttentionModal';
import { AlertTriangle, ChevronRight, Eye } from 'lucide-react';

interface RegionalAttentionBannerProps {
  selectedDistrict: District;
  onSelectDistrict: (district: District) => void;
}

const ATTENTION_DISTRICT_IDS = ['ampara', 'jaffna', 'mullaitivu', 'badulla'];

export const RegionalAttentionBanner: React.FC<RegionalAttentionBannerProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Attention banner only shows if the selected district is Ampara, Jaffna, Mullaitivu, or Badulla
  const isAttentionDistrict = ATTENTION_DISTRICT_IDS.includes(
    selectedDistrict.id.toLowerCase()
  );

  if (!isAttentionDistrict) {
    return null;
  }

  // Customize dynamic label and subtext based on selected district (Bilingual English & Tamil)
  let districtNoticeTitleEn = 'Nallur, Padiyatalawa & Dehiattakandiya Note';
  let districtNoticeTitleTa = 'நல்லூர், படியத்தலாவ & தெஹியத்தகண்டிய குறிப்பு';
  let districtNoticeDetailEn = 'ACJU Official Schedule Note for this region. Click to view or switch schedule.';
  let districtNoticeDetailTa = 'இப்பிராந்தியத்திற்கான ACJU அதிகாரப்பூர்வ தொழுகை நேர வழிகாட்டல்.';

  if (selectedDistrict.id === 'ampara') {
    districtNoticeTitleEn = 'Ampara: Padiyatalawa & Dehiattakandiya Note';
    districtNoticeTitleTa = 'படியத்தலாவ & தெஹியத்தகண்டிய பிராந்திய குறிப்பு';
    districtNoticeDetailEn = 'Residents in Padiyatalawa & Dehiattakandiya follow Badulla schedule per ACJU.';
    districtNoticeDetailTa = 'படியத்தலாவ, தெஹியத்தகண்டிய வாசிகள் ACJU வழிகாட்டலின்படி பதுளை அட்டவணையைப் பின்பற்றவும்.';
  } else if (selectedDistrict.id === 'jaffna') {
    districtNoticeTitleEn = 'Nallur Division (Mullaitivu District) & Jaffna Note';
    districtNoticeTitleTa = 'நல்லூர் பிரிவு (முல்லைத்தீவு) & யாழ்ப்பாண நேரம்';
    districtNoticeDetailEn = 'Nallur Division in Mullaitivu District follows Jaffna schedule per ACJU.';
    districtNoticeDetailTa = 'முல்லைத்தீவு மாவட்ட நல்லூர் பிரிவு ACJU வழிகாட்டலின்படி யாழ்ப்பாண அட்டவணையைப் பின்பற்றும்.';
  } else if (selectedDistrict.id === 'mullaitivu') {
    districtNoticeTitleEn = 'Nallur Division (Mullaitivu District) Note';
    districtNoticeTitleTa = 'நல்லூர் பிரிவு (முல்லைத்தீவு மாவட்டம்) குறிப்பு';
    districtNoticeDetailEn = 'Mullaitivu schedule applies to Mullaitivu except Nallur Division (which follows Jaffna).';
    districtNoticeDetailTa = 'நல்லூர் பிரிவு தவிர ஏனைய முல்லைத்தீவு பகுதிகள் முல்லைத்தீவு அட்டவணையைப் பின்பற்றும்.';
  } else if (selectedDistrict.id === 'badulla') {
    districtNoticeTitleEn = 'Badulla & Uva Regional Schedule';
    districtNoticeTitleTa = 'பதுளை & ஊவா பிராந்திய தொழுகை அட்டவணை';
    districtNoticeDetailEn = 'Badulla schedule covers Badulla, Monaragala, Padiyatalawa & Dehiattakandiya divisions.';
    districtNoticeDetailTa = 'பதுளை அட்டவணை பதுளை, மொணராகலை, படியத்தலாவ, தெஹியத்தகண்டிய பகுதிகளை உள்ளடக்கியது.';
  }

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="w-full rounded-[20px] bg-gradient-to-r from-[#2E0A0D] via-[#200A0E] to-[#121115] border-2 border-[#EF4444]/80 p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 transition-all hover:border-[#F87171] hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] cursor-pointer relative overflow-hidden group"
      >
        {/* Subtle Ambient Red Glow Background Effect */}
        <div className="absolute inset-0 bg-[#EF4444]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex items-center space-x-3 relative z-10">
          {/* Pulsing Red Attention Icon - Perfect Round Circle Shape */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/60 text-[#F87171] shadow-inner flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#F87171] animate-bounce [animation-duration:2s]" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DC2626]"></span>
            </span>
          </div>

          <div className="text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#DC2626] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-[#F87171]/40 whitespace-nowrap">
                ATTENTION / கவனம்
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-xs sm:text-sm text-[#F87171] font-black">
                  {districtNoticeTitleEn}
                </span>
                <span className="text-xs text-[#F87171]/90 font-bold font-['Anek_Tamil',sans-serif]">
                  • {districtNoticeTitleTa}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#F3F1EC]/90 mt-1 font-medium leading-tight">
              <span>{districtNoticeDetailEn}</span>
              <span className="block sm:inline sm:ml-1 text-[#C9B896] font-['Anek_Tamil',sans-serif]">
                ({districtNoticeDetailTa})
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="relative z-10 px-4 py-2 rounded-full bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-black flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer shadow-lg shadow-[#DC2626]/40 border border-[#F87171]/50 whitespace-nowrap shrink-0"
        >
          <Eye className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="whitespace-nowrap">View Guidance / விவரம்</span>
          <ChevronRight className="w-4 h-4 text-white shrink-0" />
        </button>
      </div>

      <RegionalAttentionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={onSelectDistrict}
      />
    </>
  );
};


