import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAGES_BY_SLUG, SHARED_LAYOUT } from '../data/pagesData';
import { resolveInternalHref } from '../utils/navigation';
import { initCarousels } from '../utils/carousels';
import { activateResponsiveTab } from '../utils/tabs';
import { handleDonationClick } from '../utils/donationHandler';
import { useHeroTransition } from '../hooks/useHeroTransition';
import { useHeaderLayout } from '../hooks/useHeaderLayout';
import { LightboxModal } from './LightboxModal';

export default function CatedralPage({ pageSlug }) {
  const location = useLocation();
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  const page = PAGES_BY_SLUG[pageSlug] || PAGES_BY_SLUG['/'];
  const isHome = page.isHome;

  // Sync document title and body classes
  useEffect(() => {
    document.title = page.title;
    document.body.className = page.bodyClass;
    document.documentElement.lang = 'es-ES';
  }, [page]);

  // Scroll to hash or top on navigation
  useEffect(() => {
    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.replace(/^#/, ''));
      const timer = setTimeout(() => {
        const el =
          document.getElementById(targetId) ||
          document.querySelector(`[name="${CSS.escape(targetId)}"]`);
        if (el) {
          const headerOffset = 90;
          const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  // Modular custom hooks for hero slider and header layout
  useHeroTransition(isHome);
  useHeaderLayout(rootRef, page, isHome);

  // Delegated click handler for links, interactive tabs, donation flow, and lightboxes
  const handleRootClick = (e) => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    // 1. Bootstrap Navbar Mobile Toggle (.navbar-toggle)
    const navToggle = e.target.closest('.navbar-toggle');
    if (navToggle) {
      e.preventDefault();
      const collapseTarget = rootEl.querySelector('#bs-example-navbar-collapse-1');
      if (collapseTarget) {
        collapseTarget.classList.toggle('in');
      }
      return;
    }

    // 2. Copy to clipboard triggers ([data-copy-text])
    const copyBtn = e.target.closest('[data-copy-text]');
    if (copyBtn) {
      e.preventDefault();
      const textToCopy = copyBtn.getAttribute('data-copy-text');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
        const feedback = copyBtn.querySelector('.copy-feedback') || copyBtn;
        const originalHtml = feedback.innerHTML;
        feedback.innerHTML = '<i class="fa fa-check" style="color:#28a745;"></i> ¡Copiado!';
        setTimeout(() => {
          feedback.innerHTML = originalHtml;
        }, 2000);
      }
      return;
    }

    // 3. Donation module interactive clicks
    if (handleDonationClick(e, rootEl)) {
      return;
    }

    const anchor = e.target.closest('a');
    if (!anchor) return;

    const rawHref = anchor.getAttribute('href') || '';

    // 4. Responsive Tabs (.r-tabs-anchor or [data-toggle="tab"])
    if (
      anchor.classList.contains('r-tabs-anchor') ||
      anchor.getAttribute('data-toggle') === 'tab'
    ) {
      if (rawHref.startsWith('#')) {
        e.preventDefault();
        const tabsContainer = anchor.closest('.responsiveTabs, .r-tabs');
        if (tabsContainer) {
          activateResponsiveTab(tabsContainer, rawHref);
          initCarousels(tabsContainer);
        }
        return;
      }
    }

    // 5. Bootstrap Collapse / Accordion ([data-toggle="collapse"])
    if (anchor.getAttribute('data-toggle') === 'collapse' && rawHref.startsWith('#')) {
      e.preventDefault();
      const targetPanel = rootEl.querySelector(rawHref);
      if (targetPanel) {
        const isOpen = targetPanel.classList.contains('in');
        const parentSelector = anchor.getAttribute('data-parent');
        if (parentSelector) {
          const parentGroup = rootEl.querySelector(parentSelector);
          if (parentGroup) {
            parentGroup.querySelectorAll('.panel-collapse.in').forEach((p) => {
              if (p !== targetPanel) {
                p.classList.remove('in');
                p.style.height = '';
              }
            });
          }
        }
        targetPanel.classList.toggle('in', !isOpen);
        targetPanel.style.display = !isOpen ? 'block' : '';
      }
      return;
    }

    // 6. Fancybox / Image Lightbox
    const isImageHref = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(rawHref);
    if (anchor.classList.contains('fancybox') || (isImageHref && anchor.closest('#content'))) {
      e.preventDefault();
      const imgEl = anchor.querySelector('img');
      const caption =
        anchor.getAttribute('title') ||
        (imgEl ? imgEl.getAttribute('alt') : '') ||
        '';
      setLightbox({ src: rawHref, caption });
      return;
    }

    // 7. Internal route navigation via React Router
    const resolved = resolveInternalHref(rawHref);
    if (resolved) {
      e.preventDefault();

      // Collapse mobile menu if open
      const collapseTarget = rootEl.querySelector('#bs-example-navbar-collapse-1');
      if (collapseTarget && collapseTarget.classList.contains('in')) {
        collapseTarget.classList.remove('in');
      }

      if (resolved.pathname === null && resolved.hash) {
        // Same-page hash scroll
        const targetId = decodeURIComponent(resolved.hash.replace(/^#/, ''));
        const el =
          document.getElementById(targetId) ||
          document.querySelector(`[name="${CSS.escape(targetId)}"]`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      } else {
        navigate({
          pathname: resolved.pathname,
          search: resolved.search,
          hash: resolved.hash
        });
      }
    }
  };

  return (
    <div ref={rootRef} onClick={handleRootClick}>
      <div id="page" className="hfeed site">
        {/* Hero Section (only on Home) */}
        {isHome && page.heroHtml && (
          <div dangerouslySetInnerHTML={{ __html: page.heroHtml }} />
        )}

        {/* Page Header */}
        <div dangerouslySetInnerHTML={{ __html: page.headerHtml }} />

        {/* Header spacer for Home (calculates scroll threshold and transparency) */}
        {isHome && <div className="espaciado-cabecera" />}

        {/* Main Content */}
        <div id="content-container">
          <div dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
          <div dangerouslySetInnerHTML={{ __html: SHARED_LAYOUT.footerHtml }} />
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <LightboxModal lightbox={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
