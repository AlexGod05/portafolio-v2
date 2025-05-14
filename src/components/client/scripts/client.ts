import { AccordionScripts } from "@accordion/index";
import { CardInit } from "@card/index";

// Initialize all client-side functionality
export function initializeClient() {
  // Initialize accordions and all card scripts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      AccordionScripts();
      CardInit();
    });
  } else {
    AccordionScripts();
    CardInit();
  }
} 