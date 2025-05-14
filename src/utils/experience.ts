export interface Experience {
  startDate: string;
  endDate?: string;
  position: string;
  summary: string;
  highlights: string[];
}

export function renderExperienceCards(experiences: Experience[]): string {
  return experiences.map(exp => {
    return `
      <div class="experience-item">
        <div class="experience-content">
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