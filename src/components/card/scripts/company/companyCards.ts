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
  
  // Función para manejar la actualización del contenido del modal
  const handleCompanySelection = (company, modal) => {
    if (!company || !groupedWork[company]) return;

    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;

    const modalTitle = modal.querySelector('.modal-header h2');
    if (modalTitle) {
      // Obtener la URL de la empresa desde la primera experiencia
      const companyUrl = groupedWork[company][0]?.url;
      
      if (companyUrl) {
        modalTitle.innerHTML = `
          ${company}
          <a href="${companyUrl}" target="_blank" class="company-link" title="Visitar sitio web de ${company}">
            <i class="fas fa-external-link-alt"></i>
          </a>
        `;
      } else {
        modalTitle.textContent = company;
      }
    }

    updateModalContent(
      modalBody, 
      groupedWork[company], 
      groupedProjects[company] || [],
      company
    );
  };
  
  document.querySelectorAll('.company-card').forEach(card => {
    // Manejador para el clic normal en tarjeta (apertura inicial de modal)
    card.addEventListener('click', () => {
      const company = card.getAttribute('data-company');
      if (!company) return;

      const modalElement = document.getElementById('experience-modal');
      if (!modalElement) return;

      /** @type {HTMLElement & { closeModal?: () => void, openModal?: () => void, navigateModals?: (direction: 'prev' | 'next') => void }} */
      const modal = modalElement;

      // Actualizar contenido del modal
      handleCompanySelection(company, modal);

      // Abrir el modal si no está abierto
      if (typeof modal['openModal'] === 'function') {
        modal['openModal']();
      } else {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      const handleKeyNavigation = (event) => {
        if (event.key === 'Escape') {
          if (typeof modal['closeModal'] === 'function') {
            modal['closeModal']();
          } else {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
          document.removeEventListener('keydown', handleKeyNavigation);
        } else if (event.key === 'ArrowLeft') {
          if (typeof modal['navigateModals'] === 'function') {
            modal['navigateModals']('prev');
          }
        } else if (event.key === 'ArrowRight') {
          if (typeof modal['navigateModals'] === 'function') {
            modal['navigateModals']('next');
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyNavigation);
    });
    
    // Manejador para el evento personalizado 'modal-navigate' (navegación entre modales)
    card.addEventListener('modal-navigate', (e) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.modalElement) {
        const company = card.getAttribute('data-company');
        handleCompanySelection(company, customEvent.detail.modalElement);
      }
    });
  });
}

function updateModalContent(modalBody, experiences, projects, company) {
  // Primero obtenemos los iconos de habilidades para reutilizarlos
  const getSkillIcons = () => {
    const skillsIcons: Record<string, string> = {
      HTML: `<i class="fab fa-html5"></i>`,
      CSS: `<i class="fab fa-css3-alt"></i>`,
      JavaScript: `<i class="fab fa-js"></i>`,
      TypeScript: `<i class="fab fa-js"></i>`,
      React: `<i class="fab fa-react"></i>`,
      Node: `<i class="fab fa-node-js"></i>`,
      MySQL: `<i class="fas fa-database"></i>`,
      Git: `<i class="fab fa-git-alt"></i>`,
      GitHub: `<i class="fab fa-github"></i>`,
      Next: `<i class="fab fa-react"></i>`,
      Tailwind: `<i class="fab fa-css3-alt"></i>`,
      SCRUM: `<i class="fas fa-tasks"></i>`,
      Kanban: `<i class="fas fa-columns"></i>`,
      Java: `<i class="fab fa-java"></i>`,
      "Spring Framework": `<i class="fas fa-leaf"></i>`,
      AWS: `<i class="fab fa-aws"></i>`,
      "Azure DevOps": `<i class="fab fa-microsoft"></i>`,
      PostgreSQL: `<i class="fas fa-database"></i>`,
      MongoDB: `<i class="fas fa-database"></i>`,
      DynamoDB: `<i class="fab fa-aws"></i>`,
      Firebase: `<i class="fas fa-fire"></i>`,
      FluidAttack: `<i class="fas fa-shield-alt"></i>`,
      GitLab: `<i class="fab fa-gitlab"></i>`,
      Mockito: `<i class="fas fa-vial"></i>`,
      JUnit5: `<i class="fas fa-flask"></i>`,
      Kubernetes: `<i class="fas fa-ship"></i>`,
      RabbitMQ: `<i class="fas fa-exchange-alt"></i>`,
      SQS: `<i class="fab fa-aws"></i>`,
      Redis: `<i class="fas fa-database"></i>`,
      Docker: `<i class="fab fa-docker"></i>`,
      "CI/CD": `<i class="fas fa-sync-alt"></i>`,
      Jenkins: `<i class="fab fa-jenkins"></i>`,
      "GitHub Actions": `<i class="fab fa-github"></i>`,
      Contentful: `<i class="fas fa-file-alt"></i>`,
      NodeJS: `<i class="fab fa-node-js"></i>`,
      Angular: `<i class="fab fa-angular"></i>`,
      Astro: `<i class="fas fa-rocket"></i>`,
      Trello: `<i class="fab fa-trello"></i>`,
      Python: `<i class="fab fa-python"></i>`,
      FastAPI: `<i class="fas fa-bolt"></i>`,
      Django: `<i class="fab fa-python"></i>`,
      Serverless: `<i class="fas fa-cloud"></i>`,
      Nakama: `<i class="fas fa-gamepad"></i>`,
      "Microservicios": `<i class="fas fa-cubes"></i>`,
      "API REST": `<i class="fas fa-exchange-alt"></i>`,
      "Event-Driven": `<i class="fas fa-sitemap"></i>`,
      "gRPC": `<i class="fas fa-network-wired"></i>`,
      "RPC": `<i class="fas fa-network-wired"></i>`,
      "SOAP": `<i class="fas fa-soap"></i>`,
      "GraphQL": `<i class="fas fa-project-diagram"></i>`,
      "WebSocket": `<i class="fas fa-plug"></i>`,
      "Jira": `<i class="fab fa-jira"></i>`,
      "Slack": `<i class="fab fa-slack"></i>`,
      "Discord": `<i class="fab fa-discord"></i>`,
      "Microsoft Office": `<i class="fas fa-file-word"></i>`,
      "Google Workspace": `<i class="fab fa-google-drive"></i>`,
      "Microsoft Teams": `<i class="fab fa-microsoft"></i>`,
      "Obsidian": `<i class="fas fa-book"></i>`,
      "Excalidraw": `<i class="fas fa-paint-brush"></i>`,
      "Figma": `<i class="fab fa-figma"></i>`,
      "API Gateway": `<i class="fas fa-door-open"></i>`,
      "AWS Lambda": `<i class="fab fa-aws"></i>`,
      "AWS S3": `<i class="fab fa-aws"></i>`,
      "AWS ECR": `<i class="fab fa-docker"></i>`,
      "AWS ECS": `<i class="fab fa-aws"></i>`,
      "FARGATE": `<i class="fab fa-aws"></i>`,
      "C#": `<i class="fab fa-microsoft"></i>`
    };
    return skillsIcons;
  };

  const skillIcons = getSkillIcons();
  
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
              ${projects.map(project => {
                return `
                <div class="project-card">
                  <div class="project-header">
                    <h3>
                      ${project.url ? `
                        <a href="${project.url}" target="_blank" title="Ver proyecto ${project.name}">
                          ${project.name}
                        </a>
                      ` : `
                        ${project.name}
                      `}
                    </h3>
                    ${project.startYear ? `
                      <div class="year-badge">
                        <i class="fas fa-calendar-alt"></i>
                        <time>${project.startYear} - ${project.endYear || "Actual"}</time>
                      </div>
                    ` : ''}
                  </div>
                  ${project.client ? `
                    <div class="project-client">
                      <span class="client-label">Cliente:</span>
                      <span class="client-value">${project.client}</span>
                    </div>
                  ` : ''}
                  <p>${project.description || ''}</p>
                  <div class="project-tags">
                    ${project.highlights.map(tag => {
                      const tagIcon = skillIcons[tag] || `<i class="fas fa-circle"></i>`;
                      return `
                        <span class="project-tag">
                          <span class="tag-icon">${tagIcon}</span>
                          <span class="tag-text">${tag}</span>
                        </span>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
              }).join('')}
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

  // Añadir estilos para los iconos de etiquetas
  const style = document.createElement('style');
  style.textContent = `
    .project-tag {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .tag-icon {
      color: var(--secondary);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 14px;
    }
    .tag-text {
      flex: 1;
    }
    
    /* Mejorar visibilidad en modo oscuro */
    .project-card:hover .project-tag {
      background-color: var(--bg-secondary);
      border-color: var(--border);
    }
    
    .project-card:hover .tag-icon,
    .project-card:hover .tag-text {
      color: var(--text);
    }
  `;
  document.head.appendChild(style);

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