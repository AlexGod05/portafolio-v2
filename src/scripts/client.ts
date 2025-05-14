import { initAccordions } from '../components/accordion';
import { initCompanyCards } from './company-cards';

// Initialize all client-side functionality
export function initializeClient() {
  // Initialize accordions and company cards
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAccordions();
      initCompanyCards();
    });
  } else {
    initAccordions();
    initCompanyCards();
  }
} 