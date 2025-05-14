export interface ModalElement extends HTMLElement {
  openModal: () => void;
  closeModal: () => void;
  navigateModals: (direction: 'prev' | 'next') => void;
} 