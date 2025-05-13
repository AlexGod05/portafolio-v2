import { initAccordions } from './accordion';

// Initialize all client-side functionality
export function initializeClient() {
  // Initialize accordions
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
} 