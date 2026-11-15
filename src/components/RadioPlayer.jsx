import React, { useState, useRef, useEffect } from 'react';

/**
 * URL de streaming configurable para la transmisión en vivo de la emisora.
 * Puede reemplazarse por la URL directa de Icecast, Shoutcast, HLS o MP3 de la Parroquia.
 */
export const RADIO_STREAM_URL = 'https://stream.zeno.fm/f3wvbbqmdg8uv';

export default function RadioPlayer({ streamUrl = RADIO_STREAM_URL }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sincronizar volumen con el elemento de audio HTML5
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Manejo de reproducción / pausa
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      setHasError(false);
      setIsLoading(true);

      // Para streaming en vivo: refrescar src con timestamp para asegurar sintonía en tiempo real
      try {
        const streamSeparator = streamUrl.includes('?') ? '&' : '?';
        audio.src = `${streamUrl}${streamSeparator}_live=${Date.now()}`;
        audio.load();

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Error al iniciar streaming de audio:', err);
        setIsPlaying(false);
        setIsLoading(false);
        setHasError(true);
      }
    }
  };

  // Control de cambio de volumen
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  // Silenciar / reactivar volumen
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      {/* Estilos encapsulados para el reproductor persistente con estética Parroquia San Pedro */}
      <style>{`
        body {
          padding-bottom: 68px !important;
        }

        .radio-player-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          background: #23170e;
          border-top: 3px solid #c59b43;
          box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.6);
          color: #f5efe6;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .radio-player-bar.minimized {
          transform: translateY(calc(100% - 32px));
        }

        .radio-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: relative;
        }

        /* Botón para minimizar / expandir */
        .radio-toggle-btn {
          position: absolute;
          top: -24px;
          right: 16px;
          background: #23170e;
          border: 2px solid #c59b43;
          border-bottom: none;
          color: #c59b43;
          border-radius: 8px 8px 0 0;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 -3px 8px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        }

        .radio-toggle-btn:hover {
          background: #322214;
          color: #e0b457;
        }

        /* Sección de Información de la Emisora */
        .radio-info {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 250px;
        }

        .radio-logo-badge {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #c59b43;
          color: #23170e;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(197, 155, 67, 0.4);
          flex-shrink: 0;
        }

        .radio-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* Indicador animado 'EN VIVO - Radio Parroquia San Pedro' */
        .radio-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #f5efe6;
          letter-spacing: 0.3px;
        }

        .live-pulse-dot {
          width: 9px;
          height: 9px;
          background-color: #ef4444;
          border-radius: 50%;
          display: inline-block;
          animation: radioPulse 1.6s infinite ease-in-out;
        }

        .live-tag {
          background: #ef4444;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .station-subtitle {
          font-size: 11px;
          color: #d1c4b2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Animación de ondas de audio (Equalizer) */
        .sound-wave-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
          margin-left: 4px;
        }

        .sound-bar {
          width: 3px;
          background-color: #c59b43;
          border-radius: 1px;
        }

        .sound-bar.active:nth-child(1) {
          animation: soundWave 0.9s infinite ease-in-out alternate;
        }
        .sound-bar.active:nth-child(2) {
          animation: soundWave 1.3s infinite ease-in-out alternate 0.2s;
        }
        .sound-bar.active:nth-child(3) {
          animation: soundWave 0.7s infinite ease-in-out alternate 0.4s;
        }
        .sound-bar.active:nth-child(4) {
          animation: soundWave 1.1s infinite ease-in-out alternate 0.1s;
        }

        .sound-bar.idle {
          height: 3px;
          opacity: 0.5;
        }

        /* Sección de Controles Principales */
        .radio-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .play-pause-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #c59b43;
          color: #23170e;
          border: 2px solid #e2be6c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(197, 155, 67, 0.4);
          outline: none;
        }

        .play-pause-btn:hover {
          background: #d8aa4f;
          transform: scale(1.06);
          box-shadow: 0 6px 16px rgba(197, 155, 67, 0.6);
        }

        .play-pause-btn:active {
          transform: scale(0.96);
        }

        /* Control de Volumen */
        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .volume-btn {
          background: transparent;
          border: none;
          color: #c59b43;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          transition: color 0.2s, background-color 0.2s;
        }

        .volume-btn:hover {
          color: #e2be6c;
          background: rgba(197, 155, 67, 0.15);
        }

        .volume-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 85px;
          height: 5px;
          border-radius: 999px;
          background: #443021;
          outline: none;
          transition: background 0.2s;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #c59b43;
          border: 2px solid #23170e;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
          transition: transform 0.15s;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #e2be6c;
        }

        .volume-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #c59b43;
          border: 2px solid #23170e;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
          transition: transform 0.15s;
        }

        /* Mensaje de Estado / Error */
        .radio-status-text {
          font-size: 11px;
          color: #c59b43;
          margin-left: 4px;
        }

        .radio-error-text {
          font-size: 11px;
          color: #ef4444;
          margin-left: 4px;
        }

        /* Animaciones clave */
        @keyframes radioPulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1.15);
            box-shadow: 0 0 0 7px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        @keyframes soundWave {
          0% {
            height: 3px;
          }
          50% {
            height: 13px;
          }
          100% {
            height: 6px;
          }
        }

        @keyframes spinLoading {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner-icon {
          animation: spinLoading 1s linear infinite;
        }

        /* Adaptabilidad en pantallas pequeñas / móviles */
        @media (max-width: 680px) {
          .radio-container {
            padding: 6px 12px;
            gap: 10px;
          }

          .radio-logo-badge {
            width: 34px;
            height: 34px;
          }

          .radio-live-indicator {
            font-size: 11.5px;
          }

          .station-subtitle {
            display: none;
          }

          .volume-slider {
            width: 60px;
          }

          .play-pause-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      {/* Barra de audio fija en el pie de página */}
      <aside
        className={`radio-player-bar ${isMinimized ? 'minimized' : ''}`}
        aria-label="Reproductor de Radio en Vivo"
        role="region"
      >
        <div className="radio-container">
          {/* Botón flotante para plegar/desplegar en pantallas reducidas */}
          <button
            type="button"
            className="radio-toggle-btn"
            onClick={() => setIsMinimized((prev) => !prev)}
            aria-label={isMinimized ? 'Expandir reproductor' : 'Minimizar reproductor'}
            title={isMinimized ? 'Expandir reproductor' : 'Minimizar reproductor'}
          >
            {isMinimized ? '▲ Radio' : '▼ Ocultar'}
          </button>

          {/* Información de la emisora e indicador 'EN VIVO - Radio Parroquia San Pedro' */}
          <div className="radio-info">
            <div className="radio-logo-badge" title="Radio Parroquia San Pedro">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 3.7 2.01 6.94 4.99 8.65l1-1.73C5.61 17.53 4 14.96 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-3.99 6.92l1 1.73C20 18.94 22 15.7 22 12c0-5.52-4.48-10-10-10zm0 4c-3.31 0-6 2.69-6 6 0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19 0-3.31-2.69-6-6-6zm0 4c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.72v4.28h2v-4.28c.6-.34 1-.98 1-1.72 0-1.1-.9-2-2-2z"/>
              </svg>
            </div>

            <div className="radio-details">
              <div className="radio-live-indicator">
                <span className="live-pulse-dot" />
                <span className="live-tag">EN VIVO</span>
                <span>Radio Parroquia San Pedro</span>
                
                {/* Ecualizador dinámico según estado de reproducción */}
                <span className="sound-wave-bars" aria-hidden="true">
                  <span className={`sound-bar ${isPlaying ? 'active' : 'idle'}`} />
                  <span className={`sound-bar ${isPlaying ? 'active' : 'idle'}`} />
                  <span className={`sound-bar ${isPlaying ? 'active' : 'idle'}`} />
                  <span className={`sound-bar ${isPlaying ? 'active' : 'idle'}`} />
                </span>
              </div>

              <div className="station-subtitle">
                <span>Transmisión Oficial &bull; Andahuaylas</span>
                {isLoading && <span className="radio-status-text">Conectando señal...</span>}
                {hasError && <span className="radio-error-text">No disponible en este momento</span>}
              </div>
            </div>
          </div>

          {/* Controles: Play/Pause y Volumen */}
          <div className="radio-controls">
            {/* Control deslizante y botón de volumen */}
            <div className="volume-control">
              <button
                type="button"
                className="volume-btn"
                onClick={toggleMute}
                aria-label={isMuted || volume === 0 ? 'Activar sonido' : 'Silenciar'}
                title={isMuted || volume === 0 ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted || volume === 0 ? (
                  /* Icono Mute */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : volume < 0.5 ? (
                  /* Icono Volumen Bajo */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                  </svg>
                ) : (
                  /* Icono Volumen Alto */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>

              <input
                type="range"
                className="volume-slider"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Control de volumen"
                title={`Volumen: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
              />
            </div>

            {/* Botón principal Play / Pause */}
            <button
              type="button"
              className="play-pause-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar transmisión en vivo' : 'Reproducir transmisión en vivo'}
              title={isPlaying ? 'Pausar transmisión' : 'Escuchar en vivo'}
            >
              {isLoading ? (
                /* Icono de carga giratorio */
                <svg className="spinner-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              ) : isPlaying ? (
                /* Icono Pause */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                /* Icono Play */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Etiqueta nativa <audio> de HTML5 para streaming */}
        <audio
          ref={audioRef}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlaying={() => {
            setIsPlaying(true);
            setIsLoading(false);
          }}
          onError={() => {
            setIsLoading(false);
            setIsPlaying(false);
            setHasError(true);
          }}
        >
          <source src={streamUrl} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio para la radio en vivo.
        </audio>
      </aside>
    </>
  );
}