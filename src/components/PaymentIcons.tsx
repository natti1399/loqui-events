import React from 'react';

// Mastercard icon component
const MastercardIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="9" cy="12" r="6" fill="#EB001B"/>
    <circle cx="15" cy="12" r="6" fill="#F79E1B"/>
    <path d="M12 7.5c1.24 1.42 2 3.27 2 5.25s-.76 3.83-2 5.25c-1.24-1.42-2-3.27-2-5.25s.76-3.83 2-5.25z" fill="#FF5F00"/>
  </svg>
);

const PaymentIcons: React.FC = () => (
  <div className="flex items-center space-x-4 mt-4">
    <img src="/vipps icon.webp" alt="Vipps" className="h-8 w-auto" loading="lazy" />
    <img src="/visa.svg" alt="Visa" className="h-8 w-auto" loading="lazy" />
    <MastercardIcon size={32} />
    <img src="/optimized/Apple_Pay-Logo.wine.webp" alt="Apple Pay" className="h-8 w-auto" loading="lazy" />
  </div>
);

export default PaymentIcons;