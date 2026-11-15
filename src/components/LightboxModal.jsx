import React from 'react';

/**
 * Image Lightbox Modal component for viewing photos in full size
 */
export function LightboxModal({ lightbox, onClose }) {
  if (!lightbox) return null;

  return (
    <div
      className="catedral-lightbox-overlay"
      onClick={onClose}
    >
      <div
        className="catedral-lightbox-modal"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          type="button"
          className="catedral-lightbox-close"
          aria-label="Cerrar imagen"
          onClick={onClose}
        >
          ×
        </button>
        <img src={lightbox.src} alt={lightbox.caption || 'Imagen'} />
        {lightbox.caption && (
          <div className="catedral-lightbox-caption">{lightbox.caption}</div>
        )}
      </div>
    </div>
  );
}

