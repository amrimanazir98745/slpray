import React from 'react';
import { District } from '../types/prayer';
import { SRI_LANKA_DISTRICTS } from '../utils/sriLankaDistricts';
import { AlertTriangle, X, MapPin, CheckCircle2, ChevronRight, Compass, Navigation, ArrowRight } from 'lucide-react';

interface RegionalAttentionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDistrict: District;
  onSelectDistrict: (district: District) => void;
}

export const RegionalAttentionModal: React.FC<RegionalAttentionModalProps> = ({
  isOpen,
  onClose,
  selectedDistrict,
  onSelectDistrict,
}) => {
  if (!isOpen) return null;

  const badullaDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === 'badulla');
  const jaffnaDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === 'jaffna');
  const amparaDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === 'ampara');
  const mullaitivuDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === 'mullaitivu');
  const monaragalaDistrict = SRI_LANKA_DISTRICTS.find((d) => d.id === 'monaragala');

  const isBadullaActive = selectedDistrict.id === 'badulla';
  const isJaffnaActive = selectedDistrict.id === 'jaffna';
  const isMullaitivuActive = selectedDistrict.id === 'mullaitivu';
  const isAmparaActive = selectedDistrict.id === 'ampara';

  const handleSwitchAndClose = (district: District) => {
    onSelectDistrict(district);
    onClose();
    // Smooth scroll to top prayer schedule
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-[28px] bg-[#121115] border-2 border-[#EF4444]/70 shadow-[0_0_50px_rgba(220,38,38,0.25)] overflow-hidden p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F3F1EC]/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/60 text-[#F87171] shrink-0 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-5 h-5 text-[#F87171]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#DC2626] px-3 py-0.5 rounded-full shadow-md font-bold border border-[#F87171]/40 whitespace-nowrap inline-block">
                ACJU Official Zone Guidance
              </span>
              <h3 className="text-lg font-black text-[#F3F1EC] mt-1 font-['Anek_Tamil',sans-serif]">
                Attention for Nallur, Padiyatalawa &amp; Dehiattakandiya
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center glass-pill text-[#F3F1EC]/60 hover:text-[#F3F1EC] transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#F3F1EC]/85 leading-relaxed font-medium">
          According to the All Ceylon Jamiyyathul Ulama (ACJU) official Sri Lanka prayer timetable guidance, residents in specific divisional secretariats must use designated district timetables for accurate adhan calculation.
          <span className="block mt-1 text-[#C9B896] font-['Anek_Tamil',sans-serif]">
            அகில இலங்கை ஜமய்யத்துல் உலமா (ACJU) அதிகாரப்பூர்வ தொழுகை நேர வழிகாட்டலின்படி, குறிப்பிட்ட பிரதேச செயலகப் பிரிவுகளைச் சேர்ந்தவர்கள் துல்லியமான தொழுகை நேரத்திற்கு குறிப்பிட்ட மாவட்ட அட்டவணைகளைப் பயன்படுத்த வேண்டும்.
          </span>
        </p>

        {/* Region Cards */}
        <div className="space-y-4">
          {/* Card 1: Padiyatalawa & Dehiattakandiya */}
          <div className={`p-4 rounded-[22px] border-2 transition-all ${
            isBadullaActive
              ? 'bg-[#DC2626]/20 border-[#EF4444] shadow-xl shadow-[#DC2626]/20'
              : 'bg-[#1C1B1F]/90 border-[#F3F1EC]/10 hover:border-[#EF4444]/50'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#F87171] shrink-0" />
                  <h4 className="text-sm font-black text-[#F3F1EC]">Padiyatalawa &amp; Dehiattakandiya</h4>
                </div>
                <p className="text-[11px] text-[#F87171] font-bold font-tamil mt-0.5">
                  படியத்தலாவ மற்றும் தெஹியத்தகண்டிய பகுதிகள்
                </p>
              </div>

              {isBadullaActive && (
                <span className="text-[10px] font-black bg-[#DC2626] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-[#F87171]/40">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  Active / செயலில்
                </span>
              )}
            </div>

            <div className="text-xs text-[#F3F1EC]/85 mt-2 leading-relaxed space-y-1">
              <p>
                These divisions are in Ampara District geographically, but <strong>ACJU specifies following the Badulla / Uva Zone timetable</strong>.
              </p>
              <p className="text-[#C9B896] font-['Anek_Tamil',sans-serif]">
                இப்பகுதிகள் புவியியல் ரீதியாக அம்பாறை மாவட்டத்தில் அமைந்திருந்தாலும், <strong>ACJU வழிகாட்டலின்படி பதுளை / ஊவா பிராந்திய தொழுகை அட்டவணையையே பின்பற்ற வேண்டும்</strong>.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#F3F1EC]/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-[#F3F1EC]/70">
                Official Timetable: <strong className="text-[#F87171]">Badulla District (பதுளை)</strong>
              </span>

              <div className="flex flex-wrap gap-2">
                {badullaDistrict && (
                  <button
                    onClick={() => handleSwitchAndClose(badullaDistrict)}
                    className={`px-3.5 py-1.5 rounded-[12px] text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isBadullaActive
                        ? 'bg-[#DC2626] text-white shadow-md'
                        : 'bg-[#DC2626]/30 hover:bg-[#DC2626] text-[#F87171] hover:text-white border border-[#F87171]/50'
                    }`}
                  >
                    <span>{isBadullaActive ? 'Active (Badulla)' : 'Switch to Badulla Schedule'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {amparaDistrict && (
                  <button
                    onClick={() => handleSwitchAndClose(amparaDistrict)}
                    className={`px-2.5 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer ${
                      isAmparaActive
                        ? 'bg-[#F3F1EC]/20 text-[#F3F1EC]'
                        : 'bg-[#F3F1EC]/5 hover:bg-[#F3F1EC]/15 text-[#F3F1EC]/70'
                    }`}
                  >
                    Ampara District
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Nallur Division (Mullaitivu District) */}
          <div className={`p-4 rounded-[22px] border-2 transition-all ${
            isJaffnaActive || isMullaitivuActive
              ? 'bg-[#DC2626]/20 border-[#EF4444] shadow-xl shadow-[#DC2626]/20'
              : 'bg-[#1C1B1F]/90 border-[#F3F1EC]/10 hover:border-[#EF4444]/50'
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#F87171] shrink-0" />
                  <h4 className="text-sm font-black text-[#F3F1EC]">Nallur Division (Mullaitivu District)</h4>
                </div>
                <p className="text-[11px] text-[#F87171] font-bold font-tamil mt-0.5">
                  நல்லூர் பிரிவு (முல்லைத்தீவு மாவட்டம்)
                </p>
              </div>

              {(isJaffnaActive || isMullaitivuActive) && (
                <span className="text-[10px] font-black bg-[#DC2626] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 border border-[#F87171]/40">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  Active / செயலில்
                </span>
              )}
            </div>

            <div className="text-xs text-[#F3F1EC]/85 mt-2 leading-relaxed space-y-1">
              <p>
                Nallur Division is part of Mullaitivu District, but <strong>ACJU guidelines specify that Nallur Division follows the Jaffna District timetable</strong>.
              </p>
              <p className="text-[#C9B896] font-['Anek_Tamil',sans-serif]">
                நல்லூர் பிரிவு முல்லைத்தீவு மாவட்டத்திற்குட்பட்ட பகுதியாகும். எனினும் <strong>ACJU வழிகாட்டலின்படி நல்லூர் பிரிவு யாழ்ப்பாண மாவட்ட தொழுகை அட்டவணையையே பின்பற்ற வேண்டும்</strong>.
              </p>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#F3F1EC]/10 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-[#F3F1EC]/70">
                Official Timetables: <strong className="text-[#F87171]">Jaffna (for Nallur)</strong> &amp; <strong className="text-[#F87171]">Mullaitivu</strong>
              </span>

              <div className="flex flex-wrap gap-2">
                {jaffnaDistrict && (
                  <button
                    onClick={() => handleSwitchAndClose(jaffnaDistrict)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                      isJaffnaActive
                        ? 'bg-[#DC2626] text-white shadow-md'
                        : 'bg-[#DC2626]/30 hover:bg-[#DC2626] text-[#F87171] hover:text-white border border-[#F87171]/50'
                    }`}
                  >
                    <span>{isJaffnaActive ? 'Active (Jaffna/Nallur)' : 'Jaffna & Nallur Schedule'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {mullaitivuDistrict && (
                  <button
                    onClick={() => handleSwitchAndClose(mullaitivuDistrict)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer ${
                      isMullaitivuActive
                        ? 'bg-[#DC2626] text-white shadow-md'
                        : 'bg-[#F3F1EC]/10 hover:bg-[#F3F1EC]/20 text-[#F3F1EC]/90 border border-[#F3F1EC]/20'
                    }`}
                  >
                    <span>{isMullaitivuActive ? 'Active (Mullaitivu)' : 'Mullaitivu District'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick District Jump Strip */}
        <div className="pt-2 border-t border-[#F3F1EC]/10 space-y-2">
          <span className="text-[11px] font-extrabold text-[#F87171] uppercase tracking-wider block">
            Directly Switch To Any District:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SRI_LANKA_DISTRICTS.map((d) => (
              <button
                key={d.id}
                onClick={() => handleSwitchAndClose(d)}
                className={`px-2.5 py-1 rounded-[10px] text-[11px] font-bold transition-all cursor-pointer ${
                  selectedDistrict.id === d.id
                    ? 'bg-[#DC2626] text-white font-black shadow border border-[#F87171]/50'
                    : 'bg-[#1C1B1F] hover:bg-[#DC2626]/20 text-[#F3F1EC]/80 hover:text-[#F87171] border border-[#F3F1EC]/10'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[14px] bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-black transition-all active:scale-95 cursor-pointer shadow-lg border border-[#F87171]/50"
          >
            Done &amp; Close View
          </button>
        </div>
      </div>
    </div>
  );
};

