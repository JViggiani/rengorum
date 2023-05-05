import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../actions';
import UserList from '../../components/userlist';

const UsersContainer = () => {
  const { isLoading, users, error } = useSelector((state) => ({
    isLoading: state.users.isLoading,
    users: state.users.users,
    error: state.users.error,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <UserList isLoading={isLoading} users={users} error={error} />;
};

export default UsersContainer;
