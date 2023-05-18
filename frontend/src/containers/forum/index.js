import React, { useEffect } from 'react';
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
  } = useSelector((state) => ({
    ...state.forum,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const { forum } = useParams();

  useEffect(() => {
    dispatch(fetchForum(forum));
  }, [forum, dispatch]);

  // const newThread = {
  //   name: newThreadName,
  //   content: newThreadContent,
  //   id: newThreadId,
  // };

  // console.log("JOSH - ForumContainer newThread: " + JSON.stringify(newThread));

  return (
    <div>
      <NewThread
        forum={forum}
        slug={slug}
        isAuthenticated={isAuthenticated}
        isLoading={newThreadLoading}
        success={newThreadSuccess}
        name={newThreadName}
        content={newThreadContent}
        id={newThreadId}
        error={newThreadError}
        showEditor={newThreadShow}
        createThread={() => dispatch(createThread(/*newThread*/))}
        updateNewThread={(newThread) => dispatch(createThreadSave(newThread))}
        toggleShowEditor={() => dispatch(createThreadToggle())}
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