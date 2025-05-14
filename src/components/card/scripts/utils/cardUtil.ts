export function initCardHoverEffectsUtil(
  cardSelector: string = '.card',
  hoverClass?: string
) {
  const cards = document.querySelectorAll(cardSelector);
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (hoverClass) {
        card.classList.add(hoverClass);
      }
      
      (card as HTMLElement).style.transform = 'translateY(-3px)';
      (card as HTMLElement).style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (hoverClass) {
        card.classList.remove(hoverClass);
      }
      
      (card as HTMLElement).style.transform = '';
      (card as HTMLElement).style.boxShadow = '';
    });
  });
}

export function initClickableCardsUtil(
  cardSelector: string = '.card',
  clickHandler: (card: Element) => void
) {
  const cards = document.querySelectorAll(cardSelector);
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      clickHandler(card);
    });
    
    card.addEventListener('mousedown', () => {
      (card as HTMLElement).style.transform = 'translateY(-1px)';
    });
    
    card.addEventListener('mouseup', () => {
      (card as HTMLElement).style.transform = 'translateY(-3px)';
    });
  });
}

export function setupResponsiveCardGridUtil(gridSelector: string = '.cards-grid') {
  const updateGridColumns = () => {
    const grids = document.querySelectorAll(gridSelector);
    const isMobile = window.innerWidth <= 768;
    
    grids.forEach(grid => {
      if (isMobile) {
        (grid as HTMLElement).style.gridTemplateColumns = '1fr';
      } else {
        (grid as HTMLElement).style.gridTemplateColumns = '';
      }
    });
  };
  
  updateGridColumns();
  
  window.addEventListener('resize', updateGridColumns);
}