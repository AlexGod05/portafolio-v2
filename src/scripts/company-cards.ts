// Función para inicializar las tarjetas de empresa
export function initCompanyCards() {
  // Esperar a que el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCompanyCards);
  } else {
    setupCompanyCards();
  }
}

function setupCompanyCards() {
  // Leer los datos del trabajo agrupado
  const groupedWorkData = document.getElementById('grouped-work-data');
  if (!groupedWorkData?.dataset.work) return;
  
  const groupedWork = JSON.parse(groupedWorkData.dataset.work);
  
  // Añadir manejadores de clic a las tarjetas de empresa
  document.querySelectorAll('.company-card').forEach(card => {
    card.addEventListener('click', () => {
      const company = card.getAttribute('data-company');
      if (!company || !groupedWork[company]) return;

      const modalElement = document.getElementById('experience-modal');
      if (!modalElement) return;

      /** @type {HTMLElement & { closeModal?: () => void, openModal?: () => void }} */
      const modal = modalElement;

      const modalContent = modal.querySelector('.modal-content');
      if (!modalContent) return;

      // Actualizar título
      const modalTitle = modal.querySelector('.modal-header h2');
      if (modalTitle) modalTitle.textContent = company;

      // Actualizar el contenido de la modal con el acordeón de experiencias
      updateModalContent(modalContent, company, groupedWork[company]);

      // Abrir la modal
      if (typeof modal['openModal'] === 'function') {
        modal['openModal']();
      } else {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Agregar event listener para la tecla ESC
      const handleEscKey = (event) => {
        if (event.key === 'Escape') {
          if (typeof modal['closeModal'] === 'function') {
            modal['closeModal']();
          } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
          document.removeEventListener('keydown', handleEscKey);
        }
      };
      document.addEventListener('keydown', handleEscKey);
    });
  });
}

/**
 * Actualiza el contenido del modal con las experiencias de la empresa
 * @param {HTMLElement} modalContent - El elemento del contenido del modal
 * @param {string} company - El nombre de la empresa
 * @param {Array} experiences - Las experiencias de la empresa
 */
function updateModalContent(modalContent, company, experiences) {
  // Crear el HTML del contenido del modal
  modalContent.innerHTML = `
    <div class="modal-controls">
      <button class="close-button" aria-label="Cerrar modal">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="company-header">
      <h2>${company}</h2>
    </div>
    <div class="experiences-accordion">
      ${experiences.map(exp => {
        const startYear = new Date(exp.startDate).getFullYear();
        const endYear = exp.endDate 
          ? new Date(exp.endDate).getFullYear() 
          : "Actual";
        
        return `
          <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false">
              <div class="position-info">
                <h3>${exp.position}</h3>
                <div class="year-badge">
                  <i class="fas fa-calendar-alt"></i>
                  <time>${startYear} - ${endYear}</time>
                </div>
              </div>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-content" aria-hidden="true">
              <div class="experience-content">
                <div class="summary-card">
                  <p>${exp.summary}</p>
                </div>
                <div class="highlights-card">
                  <h4>Logros y Responsabilidades</h4>
                  <ul>
                    ${exp.highlights.map(highlight => `
                      <li>
                        <span class="bullet">•</span>
                        <span>${highlight}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="modal-footer">
      <button class="close-modal-button">
        <i class="fas fa-times"></i>
        Cerrar
      </button>
    </div>
  `;

  // Agregar manejadores de eventos para los acordeones dentro del modal
  const accordionHeaders = modalContent.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;
      
      // Toggle solo el acordeón actual
      header.setAttribute('aria-expanded', (!isExpanded).toString());
      if (content) {
        content.setAttribute('aria-hidden', isExpanded.toString());
        
        // Ajustar altura máxima para animación
        if (content instanceof HTMLElement) {
          content.style.maxHeight = isExpanded ? '0px' : `${content.scrollHeight}px`;
        }
      }
    });
  });

  // Agregar manejadores para los botones de cierre
  const closeButtons = modalContent.querySelectorAll('.close-button, .close-modal-button');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = modalContent.closest('#experience-modal');
      if (!modal) return;
      
      if ('closeModal' in modal && typeof modal.closeModal === 'function') {
        modal.closeModal();
      } else {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
} 