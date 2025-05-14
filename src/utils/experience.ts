export interface Experience {
  startDate: string;
  endDate?: string;
  position: string;
  summary: string;
  highlights: string[];
}

export function renderExperienceCards(experiences: Experience[]): string {
  return experiences.map(exp => {
    const startYear = new Date(exp.startDate).getFullYear();
    const endYear = exp.endDate 
      ? new Date(exp.endDate).getFullYear() 
      : "Actual";

    return `
      <div class="experience-card">
        <div class="card-header">
          <div class="position-info">
            <h3>${exp.position}</h3>
            <time>${startYear} - ${endYear}</time>
          </div>
        </div>
        <div class="card-content">
          <div class="summary-card">
            <h4>Descripción del Rol</h4>
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
    `;
  }).join('');
} 