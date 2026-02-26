import React, { useState } from 'react';

interface ShareButtonProps {
  lang: 'es' | 'en';
}

const ShareButton: React.FC<ShareButtonProps> = ({ lang }) => {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  };

  return (
    <>
      <button 
        className="share-button" 
        onClick={copyToClipboard}
        title={lang === 'es' ? 'Copiar link' : 'Copy link'}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>

      {showToast && (
        <div className="toast-container">
          <div className="toast">
            <span>✅ {lang === 'es' ? '¡Enlace copiado!' : 'Link copied!'}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
