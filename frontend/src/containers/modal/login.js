import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../../components/login';
import Modal from '../../components/modal';
import { hideModal, loginReset, showModal, login } from '../../actions';

const LoginModal = () => {
  const { isAuthenticated, isLoading, error } = useSelector((state) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);

  const handleLogin = (username, password) => {
    dispatch(login(username, password));
  };

  const handleClose = () => {
    dispatch(hideModal());
    dispatch(loginReset());
  };

  const showRegister = () => {
    dispatch(showModal('REGISTER', {}));
    dispatch(loginReset());
  };

  return isAuthenticated ? null : (
    <Modal onClose={handleClose}>
      <Login
        handleLogin={handleLogin}
        showRegister={showRegister}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
};

export default LoginModal;
