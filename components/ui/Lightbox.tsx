'use client';

import React, { useEffect } from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title?: string;
  description?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  description,
}) => {
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-lg p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Image lightbox'}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white shadow-lg transition-all hover:bg-white/20 hover:scale-110"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] cursor-zoom-out"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={title || 'Enlarged image'}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Image info */}
        {(title || description) && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 bg-gradient-to-t from-slate-950/90 to-transparent rounded-b-2xl transition-all duration-300">
            {title && (
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            )}
            {description && (
              <p className="text-slate-300 text-sm">{description}</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        <span>Press ESC to close</span>
      </div>
    </div>
  );
};
