export function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    const content = header.nextElementSibling as HTMLElement;
    
    // Establecer estado inicial
    header.setAttribute('aria-expanded', 'false');
    if (content) {
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0px';
    }

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Actualizar estado
      header.setAttribute('aria-expanded', String(!isExpanded));
      if (content) {
        content.setAttribute('aria-hidden', String(isExpanded));
        content.style.maxHeight = isExpanded ? '0px' : content.scrollHeight + 'px';
      }
    });
  });
} 