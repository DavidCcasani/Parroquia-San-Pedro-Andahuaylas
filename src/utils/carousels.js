/**
 * Normalizes and wires up all carousels (.slide-subitem, .galeria_apostol, .galería_apostol2, .galeria_apostol_3)
 * inside the given container so both pre-initialized slick sliders and uninitialized sliders work natively.
 */
export function initCarousels(rootEl) {
  if (!rootEl) return;
  const selector = '.slide-subitem, .galeria_apostol, .galería_apostol2, .galeria_apostol_3';
  const containers = rootEl.querySelectorAll(selector);

  containers.forEach((container) => {
    if (container.dataset.reactCarouselReady === 'true') return;
    container.dataset.reactCarouselReady = 'true';

    // Collect slide items: either inside .slick-track or direct children
    let slideNodes = [];
    const existingTrack = container.querySelector('.slick-track');
    if (existingTrack) {
      slideNodes = Array.from(existingTrack.children).filter(
        (el) => !el.classList.contains('slick-cloned')
      );
    } else {
      slideNodes = Array.from(container.children).filter(
        (el) => el.tagName === 'DIV' && !el.classList.contains('slick-list')
      );
    }

    if (slideNodes.length === 0) return;

    // Clean container and rebuild clean Slick-compatible DOM structure
    container.classList.add('slick-initialized', 'slick-slider');
    container.innerHTML = '';

    let currentIndex = 0;

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'slick-prev slick-arrow';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.textContent = 'Previous';

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'slick-next slick-arrow';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.textContent = 'Next';

    const listEl = document.createElement('div');
    listEl.className = 'slick-list draggable';

    const trackEl = document.createElement('div');
    trackEl.className = 'slick-track';
    trackEl.style.width = '100%';

    slideNodes.forEach((slide, idx) => {
      slide.classList.add('slick-slide');
      slide.style.width = '100%';
      slide.style.float = 'none';
      slide.style.opacity = '1';
      slide.style.position = 'relative';
      slide.style.left = '0px';
      slide.style.top = '0px';
      slide.style.display = idx === 0 ? 'block' : 'none';
      trackEl.appendChild(slide);
    });

    listEl.appendChild(trackEl);

    function updateSlides() {
      slideNodes.forEach((slide, idx) => {
        const active = idx === currentIndex;
        slide.style.display = active ? 'block' : 'none';
        slide.classList.toggle('slick-current', active);
        slide.classList.toggle('slick-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      prevBtn.classList.toggle('slick-disabled', slideNodes.length <= 1);
      nextBtn.classList.toggle('slick-disabled', slideNodes.length <= 1);
    }

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + slideNodes.length) % slideNodes.length;
      updateSlides();
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % slideNodes.length;
      updateSlides();
    });

    if (slideNodes.length > 1) {
      container.appendChild(prevBtn);
    }
    container.appendChild(listEl);
    if (slideNodes.length > 1) {
      container.appendChild(nextBtn);
    }
    updateSlides();
  });
}

