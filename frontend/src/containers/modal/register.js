import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Register from '../../components/register';
import Modal from '../../components/modal';
import { hideModal, registerReset, showModal, register } from '../../actions';

const RegisterModal = () => {
  const { isAuthenticated, error, isLoading } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.register.error,
    isLoading: state.register.isLoading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);

  const handleRegister = (data) => {
    dispatch(register(data));
  };

  const handleClose = () => {
    dispatch(hideModal());
    dispatch(registerReset());
  };

  const showLogin = () => {
    dispatch(showModal('LOGIN', {}));
    dispatch(registerReset());
  };

  return isAuthenticated ? null : (
    <Modal onClose={handleClose}>
      <Register
        handleRegister={handleRegister}
        showLogin={showLogin}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
};

export default RegisterModal;
