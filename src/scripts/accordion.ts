export function initAccordions() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccordions);
  } else {
    initializeAccordions();
  }
}

function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    const content = header.nextElementSibling as HTMLElement;
    const container = header.closest('.accordion-container');

    if (!content || !container) return;

    header.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');
    content.style.maxHeight = '0px';
    content.style.transition = 'max-height 0.3s ease-out';

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      header.setAttribute('aria-expanded', String(!isExpanded));
      content.setAttribute('aria-hidden', String(isExpanded));
      content.style.maxHeight = isExpanded ? '0px' : content.scrollHeight + 'px';

      if (!isExpanded) {
        setTimeout(() => {
          container.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }, 100);
      }
    });
  });
} 