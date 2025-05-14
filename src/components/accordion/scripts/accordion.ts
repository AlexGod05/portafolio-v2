export default function initAccordions() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccordions);
  } else {
    initializeAccordions();
  }
}

function initializeAccordions() {
  // Inicializa todos los acordeones en el documento
  initAccordionsInContainer(document);
}

/**
 * Inicializa los acordeones dentro de un contenedor específico
 * @param {HTMLElement|Document} container - El contenedor donde buscar los acordeones
 */
export function initAccordionsInContainer(container) {
  const accordionHeaders = container.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    const content = header.nextElementSibling as HTMLElement;
    const accordionContainer = header.closest('.accordion-container');

    if (!content) return;

    // Solo configurar si no está ya configurado
    if (!header.hasAttribute('aria-expanded')) {
      header.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');

      // Asegurarse de que el contenido tenga altura cero inicialmente
      if (content instanceof HTMLElement && !content.style.maxHeight) {
        content.style.maxHeight = '0px';
        content.style.transition = 'max-height 0.3s ease-out';
      }
    }

    // Remover listener anterior si existe
    const newHeader = header.cloneNode(true);
    header.parentNode?.replaceChild(newHeader, header);
    
    newHeader.addEventListener('click', () => {
      const isExpanded = newHeader.getAttribute('aria-expanded') === 'true';
      
      // Toggle estados
      newHeader.setAttribute('aria-expanded', String(!isExpanded));
      content.setAttribute('aria-hidden', String(isExpanded));
      
      // Ajustar altura máxima para animación
      if (!isExpanded) {
        // Expandir el contenido
        content.style.maxHeight = '2000px'; // Altura suficiente para el contenido
        
        // Desplazarse al acordeón expandido, considerando la posición del header modal si existe
        setTimeout(() => {
          const modalHeader = newHeader.closest('.modal-content')?.querySelector('.modal-header');
          const modalHeaderHeight = modalHeader ? (modalHeader as HTMLElement).offsetHeight : 0;
          
          const headerRect = newHeader.getBoundingClientRect();
          const scrollContainer = newHeader.closest('.modal-content') || window;
          
          if (scrollContainer && scrollContainer !== window) {
            (scrollContainer as HTMLElement).scrollTo({
              top: (newHeader as HTMLElement).offsetTop - modalHeaderHeight - 10,
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
      const icon = newHeader.querySelector('.accordion-icon');
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