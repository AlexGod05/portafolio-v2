import { initCardHoverEffectsUtil, initClickableCardsUtil, setupResponsiveCardGridUtil } from './utils/cardUtil';
import { default as CompanyCardScripts } from './company/companyCards';

export default function Card() {
  initCardHoverEffectsUtil();
  setupResponsiveCardGridUtil();
  
  initClickableCardsUtil('.company-card', (card) => {
    const company = card.getAttribute('data-company');
    if (company) {
      console.log(`Clicked on company card: ${company}`);
    }
  });

  CompanyCardScripts();
}