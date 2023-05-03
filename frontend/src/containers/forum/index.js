import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createThreadSave,
  createThreadToggle,
  fetchForum,
  createThread,
} from '../../actions';
import ThreadList from '../../components/threadlist';
import NewThread from '../../components/newthread';
import { useParams } from 'react-router-dom';

const ForumContainer = () => {
  
  const { forum } = useParams();
  
  const forumData = useSelector((state) => state.forumData);

  const dispatch = useDispatch();
  
  const handleFetchForum = useCallback((forum) => {
    dispatch(fetchForum(forum));
  }, [dispatch]);
  
  const handleCreateThread = () => {
    dispatch(createThread());
  };
  
  const handleCreateThreadSave = (threadData) => {
    dispatch(createThreadSave(threadData));
  };
  
  const handleCreateThreadToggle = () => {
    dispatch(createThreadToggle());
  };

  useEffect(() => {
    handleFetchForum(forum);
  }, [forum, handleFetchForum]);
  
  const {
    isLoading,
    name,
    slug,
    description,
    threads,
    error,
    isAuthenticated,
    newThreadLoading,
    newThreadSuccess,
    newThreadName,
    newThreadContent,
    newThreadId,
    newThreadError,
    newThreadShow,
  } = forumData;

  return (
    <div>
      <NewThread
        forum={slug}
        isAuthenticated={isAuthenticated}
        isLoading={newThreadLoading}
        success={newThreadSuccess}
        name={newThreadName}
        content={newThreadContent}
        id={newThreadId}
        error={newThreadError}
        showEditor={newThreadShow}
        createThread={handleCreateThread}
        updateNewThread={handleCreateThreadSave}
        toggleShowEditor={handleCreateThreadToggle}
        maxLength={2000}
      />
      <ThreadList
        isLoading={isLoading}
        name={name}
        slug={slug}
        description={description}
        threads={threads}
        error={error}
      />
    </div>
  );
};

export default ForumContainer;
