import { initAccordionsInContainer } from '@accordion/scripts/accordion';

export default function initCompanyCards() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCompanyCards);
  } else {
    setupCompanyCards();
  }
}

function setupCompanyCards() {
  const groupedWorkData = document.getElementById('grouped-work-data');
  const groupedProjectsData = document.getElementById('grouped-projects-data');
  
  if (!groupedWorkData?.dataset.work) return;
  
  const groupedWork = JSON.parse(groupedWorkData.dataset.work);
  const groupedProjects = groupedProjectsData?.dataset.projects ? 
    JSON.parse(groupedProjectsData.dataset.projects) : {};
  
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

      const modalTitle = modal.querySelector('.modal-header h2');
      if (modalTitle) modalTitle.textContent = company;

      updateModalContent(
        modalBody, 
        groupedWork[company], 
        groupedProjects[company] || []
      );

      if (typeof modal['openModal'] === 'function') {
        modal['openModal']();
      } else {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

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

function updateModalContent(modalBody, experiences, projects) {
  modalBody.innerHTML = `
    <div class="tab-container">
      <div class="tab-header">
        <div class="tab-buttons">
          <button class="tab-button active" data-tab="experience">
            <i class="fas fa-briefcase"></i>
            <span>Experiencia</span>
          </button>
          <button class="tab-button ${projects.length === 0 ? 'disabled' : ''}" data-tab="projects">
            <i class="fas fa-code"></i>
            <span>Proyectos</span>
            ${projects.length > 0 ? `<span class="badge">${projects.length}</span>` : ''}
          </button>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane active" id="experience-tab">
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
        </div>
        <div class="tab-pane" id="projects-tab">
          ${projects.length > 0 ? `
            <div class="projects-grid">
              ${projects.map(project => `
                <div class="project-card">
                  <h3>
                    ${project.url ? `
                      <a href="${project.url}" target="_blank" title="Ver proyecto ${project.name}">
                        ${project.name}
                      </a>
                    ` : `
                      ${project.name}
                    `}
                  </h3>
                  <p>${project.description || ''}</p>
                  <div class="project-tags">
                    ${project.highlights.map(tag => `
                      <span class="project-tag">${tag}</span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="no-projects">
              <p>No hay proyectos disponibles para esta empresa.</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  initTabs(modalBody);
  
  // Usar la función centralizada de acordeones
  initAccordionsInContainer(modalBody);
}

function initTabs(container) {
  const tabButtons = container.querySelectorAll('.tab-button:not(.disabled)');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      container.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
      });
      container.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      if (tabId) {
        const tabPane = container.querySelector(`#${tabId}-tab`);
        if (tabPane) {
          tabPane.classList.add('active');
        }
      }
    });
  });
} 