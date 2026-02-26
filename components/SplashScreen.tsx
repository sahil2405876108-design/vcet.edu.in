import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem('splashSeen');
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem('splashSeen', 'true');
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative max-h-[96vh] max-w-[720px] w-full mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Poster image */}
        <img
          src="/Images/Banner/poster%20Loder.png"
          alt="VCET Placement Poster"
          className="w-full h-auto block"
          style={{ maxHeight: '96vh', objectFit: 'contain' }}
        />

        {/* Click outside hint */}
        <p className="text-center text-white/50 text-[11px] mt-2 tracking-widest uppercase">
          Click anywhere outside to close
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
