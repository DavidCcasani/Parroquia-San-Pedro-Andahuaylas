/**
 * Activates a tab inside a .responsiveTabs / .r-tabs container
 */
export function activateResponsiveTab(tabsContainer, targetHash) {
  if (!tabsContainer || !targetHash) return;
  const targetId = targetHash.replace(/^#/, '');

  const navItems = tabsContainer.querySelectorAll('.r-tabs-nav > li, .nav-tabs > li');
  navItems.forEach((li) => {
    const a = li.querySelector('a');
    const isMatch = a && a.getAttribute('href') === `#${targetId}`;
    li.classList.toggle('active', isMatch);
    li.classList.toggle('r-tabs-state-active', isMatch);
    li.classList.toggle('r-tabs-state-default', !isMatch);
  });

  const accordionTitles = tabsContainer.querySelectorAll('.r-tabs-accordion-title');
  accordionTitles.forEach((acc) => {
    const a = acc.querySelector('a');
    const isMatch = a && a.getAttribute('href') === `#${targetId}`;
    acc.classList.toggle('r-tabs-state-active', isMatch);
    acc.classList.toggle('r-tabs-state-default', !isMatch);
  });

  const panels = tabsContainer.querySelectorAll('.tab-content > .tab-pane, .contenido-tabs > .tab-pane');
  panels.forEach((panel) => {
    const isMatch = panel.id === targetId;
    if (isMatch) {
      panel.style.display = 'block';
      panel.classList.remove('in');
      // Trigger reflow for smooth animation
      void panel.offsetWidth;
      panel.classList.add('active', 'in', 'r-tabs-state-active');
      panel.classList.remove('r-tabs-state-default');
    } else {
      panel.classList.remove('active', 'in', 'r-tabs-state-active');
      panel.classList.add('r-tabs-state-default');
      panel.style.display = 'none';
    }
  });
}

