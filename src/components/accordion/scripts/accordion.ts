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

    if (!content) return;

    header.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');

    // Asegurarse de que el contenido tenga altura cero inicialmente
    if (content instanceof HTMLElement && !content.style.maxHeight) {
      content.style.maxHeight = '0px';
      content.style.transition = 'max-height 0.3s ease-out';
    }

    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Toggle estados
      header.setAttribute('aria-expanded', String(!isExpanded));
      content.setAttribute('aria-hidden', String(isExpanded));
      
      // Ajustar altura máxima para animación
      if (!isExpanded) {
        // Expandir el contenido
        content.style.maxHeight = `${content.scrollHeight}px`;
        
        // Hacer scroll si es necesario
        if (container) {
          setTimeout(() => {
            container.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      } else {
        // Contraer el contenido
        content.style.maxHeight = '0px';
      }
      
      // Animar el ícono del acordeón
      const icon = header.querySelector('.accordion-icon');
      if (icon && icon instanceof HTMLElement) {
        if (!isExpanded) {
          icon.classList.add('rotated');
        } else {
          icon.classList.remove('rotated');
        }
      }
    });
  });
} 