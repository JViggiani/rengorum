import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForums } from '../../actions';
import ForumList from '../../components/forumlist';

const HomeContainer = () => {
  const { isLoading, forums, error } = useSelector((state) => ({
    isLoading: state.home.isLoading,
    forums: state.home.forums,
    error: state.home.error,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForums());
  }, [dispatch]);

  return <ForumList isLoading={isLoading} forums={forums} error={error} />;
};

export default HomeContainer;
