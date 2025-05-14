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

      const modalBody = modal.querySelector('.modal-body');
      if (!modalBody) return;

      // Actualizar título
      const modalTitle = modal.querySelector('.modal-header h2');
      if (modalTitle) modalTitle.textContent = company;

      // Actualizar el contenido de la modal con el acordeón de experiencias
      updateModalContent(modalBody, company, groupedWork[company]);

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
 * @param {HTMLElement} modalBody - El elemento del body del modal
 * @param {string} company - El nombre de la empresa
 * @param {Array} experiences - Las experiencias de la empresa
 */
function updateModalContent(modalBody, company, experiences) {
  // Crear el HTML del contenido del modal
  modalBody.innerHTML = `
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
              <div class="accordion-icon-wrapper">
                <span class="accordion-icon">▼</span>
              </div>
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
  `;

  // Agregar manejadores de eventos para los acordeones dentro del modal
  const accordionHeaders = modalBody.querySelectorAll('.accordion-header');
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
} 