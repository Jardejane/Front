import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 46%;
  max-width: 600px;
  background-color: #ae736f;
  border-radius: 8px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background-color: #ae736f;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color : #b7c9a9;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 28px;
  color: #e9f2f9;
  cursor: pointer;

  &:hover {
    color: #1c8080;
  }
`;

const ModalContent = styled.div`
  padding: 24px;
`;



const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <ModalBackground className={showHideClassName}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Editar dados</ModalTitle>
          <ModalCloseButton onClick={handleClose}>&times;</ModalCloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
