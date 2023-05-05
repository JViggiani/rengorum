import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditProfile from '../../components/editprofile';
import Modal from '../../components/modal';
import { hideModal, editProfileReset, editProfile } from '../../actions';

const EditProfileModal = () => {
  const {
    isAuthenticated,
    isEditing,
    error,
    avatar,
    name,
    success,
  } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isEditing: state.auth.isEditing,
    error: state.auth.editError,
    avatar: state.auth.avatar,
    name: state.auth.name,
    success: state.auth.editSuccess,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);

  const handleClose = () => {
    dispatch(hideModal());
    dispatch(editProfileReset());
  };

  const handleEdit = (newProfile) => {
    dispatch(editProfile(newProfile));
  };

  return !isAuthenticated ? null : (
    <Modal onClose={handleClose} dialogStyle={{ minWidth: '500px' }}>
      <EditProfile
        avatar={avatar}
        name={name}
        handleEdit={handleEdit}
        isLoading={isEditing}
        error={error}
        success={success}
      />
    </Modal>
  );
};

export default EditProfileModal;
