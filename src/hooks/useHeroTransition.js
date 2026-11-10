import { useEffect } from 'react';

/**
 * Authentic images of Parroquia San Pedro de Andahuaylas available on disk
 */
export const HERO_IMAGES = [
  '/assets/images/foto-parroquia-san-pedro-lateral.jpg',
  '/assets/images/portada-historia-andahuaylas.jpg',
  '/assets/images/foto-apostol-2021.jpg',

];

/**
 * Hook to handle hero background image transitions smoothly without any black gaps or delays.
 * Uses a double-layer cross-dissolve: the previous image stays visible on heroEl underneath
 * while the new image dissolves in seamlessly on imgPres.
 */
export function useHeroTransition(isHome) {
  useEffect(() => {
    if (!isHome) return;
    const heroEl = document.querySelector('.home-presentacion');
    const imgPres = document.querySelector('.img-pres');
    if (!heroEl || !imgPres) return;

    // Preload all hero images into browser memory immediately
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let heroIndex = 0;

    // Set initial background on the underlying hero container
    heroEl.style.backgroundImage = `url(${HERO_IMAGES[0]})`;
    heroEl.style.backgroundPosition = 'center top';
    heroEl.style.backgroundSize = 'cover';

    const onIteration = () => {
      // 1. Current image remains on the underlying container so screen NEVER goes black
      const prevImage = HERO_IMAGES[heroIndex];
      heroEl.style.backgroundImage = `url(${prevImage})`;

      // 2. Next image index
      heroIndex = (heroIndex + 1) % HERO_IMAGES.length;
      const nextImage = HERO_IMAGES[heroIndex];

      // 3. Reset imgPres opacity without animation, set next image
      imgPres.style.transition = 'none';
      imgPres.style.opacity = '0';
      imgPres.style.backgroundImage = `url(${nextImage})`;

      // 4. Force browser reflow to commit opacity: 0
      void imgPres.offsetWidth;

      // 5. Smoothly dissolve next image in over previous image in 0.65s
      imgPres.style.transition = 'opacity 0.65s ease-in-out';
      imgPres.style.opacity = '1';
    };

    imgPres.addEventListener('animationiteration', onIteration);
    return () => {
      imgPres.removeEventListener('animationiteration', onIteration);
    };
  }, [isHome]);
}
