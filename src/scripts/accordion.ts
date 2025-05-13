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
    // Buscar el contenido del acordeón que sigue al header
    const content = header.nextElementSibling;
    if (!content || !content.classList.contains('accordion-content')) {
      console.error('No se encontró el contenido del acordeón');
      return;
    }

    // Buscar el contenedor del acordeón
    const accordion = header.closest('.accordion-container');
    if (!accordion) {
      console.error('No se encontró el contenedor del acordeón');
      return;
    }

    // Establecer estado inicial
    header.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');
    
    // Configurar estilos iniciales
    const contentElement = content as HTMLElement;
    contentElement.style.display = 'none';
    contentElement.style.overflow = 'hidden';
    contentElement.style.transition = 'all 0.3s ease-out';

    // Agregar evento de click
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      
      // Actualizar estado
      header.setAttribute('aria-expanded', String(!isExpanded));
      content.setAttribute('aria-hidden', String(isExpanded));
      
      // Actualizar visibilidad
      if (isExpanded) {
        contentElement.style.display = 'none';
      } else {
        contentElement.style.display = 'block';
        // Scroll al inicio del acordeón si se está abriendo
        setTimeout(() => {
          accordion.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }, 100);
      }
    });
  });
} 