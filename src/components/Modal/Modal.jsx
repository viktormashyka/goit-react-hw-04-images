// import React, { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleBackdropClickClose = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
      // this.props.onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = evt => {
      if (evt.code === 'Escape') {
        onClose();
        // this.props.onClose();
      }
    };

    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClickClose}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     console.log('componentDidMount...');
//     window.addEventListener('keydown', this.handleEscClose);
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount...');
//     window.removeEventListener('keydown', this.handleEscClose);
//   }

//   handleEscClose = evt => {
//     if (evt.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClickClose = evt => {
//     if (evt.currentTarget === evt.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackdropClickClose}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
