import { useEffect } from 'react';
import { OverlayEl, ModalEl } from './Modal.styled';

const Modal = ({ imageUrl, tag, onCloseModal }) => {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <OverlayEl onClick={onOverlayClick}>
      <ModalEl>
        <img src={imageUrl} alt={tag} />
      </ModalEl>
    </OverlayEl>
  );
};

export default Modal;
