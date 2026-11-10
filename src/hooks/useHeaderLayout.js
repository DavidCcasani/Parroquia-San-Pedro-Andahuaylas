import { useEffect } from 'react';
import { initCarousels } from '../utils/carousels';

/**
 * Hook to manage site header layout, scroll states, dropdown direction and scroll-spy
 */
export function useHeaderLayout(rootRef, page, isHome) {
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    initCarousels(rootEl);

    const updateHeaderLayout = () => {
      const headerEl = rootEl.querySelector('.site-header');
      const spacerEl = rootEl.querySelector('.espaciado-cabecera');
      const dropupEl = rootEl.querySelector('#dropupid');
      if (!headerEl) return;

      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (isHome && spacerEl) {
        if (w >= 990) {
          spacerEl.style.height = `${headerEl.clientHeight || 80}px`;
        }
        const isScrolled = spacerEl.getBoundingClientRect().top <= 0;
        headerEl.classList.toggle('scrolled', isScrolled);
      } else {
        headerEl.classList.add('scrolled');
      }

      if (dropupEl) {
        if (!isHome) {
          dropupEl.className = 'dropdown';
        } else {
          const cambioEl = rootEl.querySelector('#cambio-dropdown');
          if (cambioEl) {
            const rect = cambioEl.getBoundingClientRect();
            dropupEl.className = rect.bottom < window.innerHeight ? 'dropdown' : 'dropup';
          } else {
            dropupEl.className = window.scrollY > 220 ? 'dropdown' : 'dropup';
          }
        }
      }

      // Scroll-spy for .ancla sections
      const anclas = rootEl.querySelectorAll('.ancla');
      const menuItems = rootEl.querySelectorAll('#menu-principal .current_page_parent li');
      if (anclas.length > 0 && menuItems.length > 0) {
        menuItems.forEach((li) => li.classList.remove('active'));
        for (let i = anclas.length - 1; i >= 0; i--) {
          const ancla = anclas[i];
          if (ancla.getBoundingClientRect().top <= 120) {
            const matchLink = rootEl.querySelector(
              `#menu-principal .current_page_parent li a[href$="#${ancla.id}"]`
            );
            if (matchLink && matchLink.parentElement) {
              matchLink.parentElement.classList.add('active');
            }
            break;
          }
        }
      }
    };

    updateHeaderLayout();
    const timer = setTimeout(updateHeaderLayout, 300);
    window.addEventListener('scroll', updateHeaderLayout, { passive: true });
    window.addEventListener('resize', updateHeaderLayout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateHeaderLayout);
      window.removeEventListener('resize', updateHeaderLayout);
    };
  }, [rootRef, page, isHome]);
}

