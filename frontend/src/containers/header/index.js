import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navlink from '../../components/navlink';
import UserMenu from '../../components/usermenu';
import './styles.css';
import { showModal, logout } from '../../actions';

const HeaderContainer = () => {
  const { isAuthenticated, username, name, avatar, isLoading } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    name: state.auth.name,
    avatar: state.auth.avatar,
    isLoading: state.auth.isLoading,
  }));

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const showRegister = () => {
    dispatch(showModal('REGISTER', {}));
  };

  const showLogin = () => {
    dispatch(showModal('LOGIN', {}));
  };

  const showEditProfile = () => {
    dispatch(showModal('EDIT_PROFILE', {}));
  };

  return (
    <div className="headerContainer">
      <Navlink />
      <UserMenu
        isAuthenticated={isAuthenticated}
        username={username}
        name={name}
        avatar={avatar}
        logout={handleLogout}
        isLoading={isLoading}
        showRegister={showRegister}
        showLogin={showLogin}
        showEditProfile={showEditProfile}
      />
    </div>
  );
};

export default HeaderContainer;
