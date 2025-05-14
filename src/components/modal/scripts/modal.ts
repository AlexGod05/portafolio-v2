export default function initModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const closeBtn = modal.querySelector('.close-modal');
  if (!closeBtn) return;

  // Función para abrir la modal
  function openModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Añadir animación de entrada a las tarjetas
    const cards = modal.querySelectorAll('.experience-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        (card as HTMLElement).style.transition = 'all 0.3s ease';
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      }, 100);
    });
  }

  // Función para cerrar la modal
  function closeModal() {
    if (!modal) return;
    
    // Añadir animación de salida a las tarjetas
    const cards = modal.querySelectorAll('.experience-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(20px)';
    });

    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Resetear las tarjetas
      cards.forEach(card => {
        (card as HTMLElement).style.opacity = '';
        (card as HTMLElement).style.transform = '';
      });
    }, 300);
  }

  // Función para actualizar el contenido de la modal
  function updateModalContent(content: string) {
    if (!modal) return;
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;

    // Limpiar el contenido actual
    modalContent.innerHTML = '';

    // Crear un contenedor temporal para el nuevo contenido
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = content;

    // Añadir el nuevo contenido
    modalContent.appendChild(tempContainer);

    // Inicializar las tarjetas
    const cards = modalContent.querySelectorAll('.experience-card');
    cards.forEach(card => {
      // Añadir efecto hover
      card.addEventListener('mouseenter', () => {
        (card as HTMLElement).style.transform = 'translateY(-4px)';
        (card as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
      });

      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'translateY(0)';
        (card as HTMLElement).style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
      });
    });
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Exponer funciones públicamente
  Object.assign(modal, { 
    openModal, 
    closeModal,
    updateModalContent 
  });
} 