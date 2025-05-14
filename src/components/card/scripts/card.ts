import { initCardHoverEffectsUtil, initClickableCardsUtil, setupResponsiveCardGridUtil } from './utils/cardUtil';
import { default as CompanyCardScripts } from './company/companyCards';

export default function Card() {
  initCardHoverEffectsUtil();
  setupResponsiveCardGridUtil();
  
  initClickableCardsUtil('.company-card', (card) => {
    card.getAttribute('data-company');
  });

  CompanyCardScripts();
}