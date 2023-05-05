import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../actions';
import StatusMessage from '../../components/statusmessage';
import Profile from '../../components/profile';
import { useParams } from 'react-router-dom';
import './styles.css';

const UserProfileContainer = () => {
  const { isLoading, error, profile } = useSelector((state) => ({
    isLoading: state.userProfile.isLoading,
    profile: state.userProfile.profile,
    error: state.userProfile.error,
  }));

  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    dispatch(fetchUserProfile(username));
  }, [username, dispatch]);

  if (error || !profile || isLoading) {
    return (
      <StatusMessage
        error={error || !profile}
        errorClassName="userProfile-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the user profile for you`}
        type="default"
      />
    );
  }

  const {
    name,
    status,
    bio,
    avatar,
    is_staff,
    date_joined,
  } = profile;

  return (
    <Profile
      username={username}
      name={name}
      avatar={avatar}
      status={status}
      bio={bio}
      dateJoined={date_joined}
      isStaff={is_staff}
    />
  );
};

export default UserProfileContainer;
