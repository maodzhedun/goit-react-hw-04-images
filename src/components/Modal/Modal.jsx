import React, { Component } from 'react';
import { OverlayEl, ModalEl } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { imageUrl, tag } = this.props;

    return (
      <OverlayEl onClick={this.onOverlayClick}>
        <ModalEl>
          <img src={imageUrl} alt={tag} />
        </ModalEl>
      </OverlayEl>
    );
  }
}

export default Modal;
