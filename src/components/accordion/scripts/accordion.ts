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
        content.style.maxHeight = '2000px'; // Altura suficiente para el contenido
        
        // Desplazarse al acordeón expandido, considerando la posición del header modal si existe
        setTimeout(() => {
          const modalHeader = header.closest('.modal-content')?.querySelector('.modal-header');
          const modalHeaderHeight = modalHeader ? (modalHeader as HTMLElement).offsetHeight : 0;
          
          const headerRect = header.getBoundingClientRect();
          const scrollContainer = header.closest('.modal-content') || window;
          
          if (scrollContainer && scrollContainer !== window) {
            (scrollContainer as HTMLElement).scrollTo({
              top: (header as HTMLElement).offsetTop - modalHeaderHeight - 10,
              behavior: 'smooth'
            });
          } else {
            window.scrollTo({
              top: window.scrollY + headerRect.top - modalHeaderHeight - 10,
              behavior: 'smooth'
            });
          }
        }, 100);
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