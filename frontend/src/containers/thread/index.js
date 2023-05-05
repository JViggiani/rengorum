import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, fetchThread, deletePost, deleteThread } from '../../actions';
import Thread from '../../components/thread';
import { useParams } from 'react-router-dom';

const ThreadContainer = () => {
  const {
    isLoading,
    name,
    content,
    pinned,
    creator,
    createdAt,
    posts,
    error,
    isAuthenticated,
    newPostLoading,
    newPostError,
    newPostSuccess,
    authenticatedUsername,
    authenticatedIsStaff,
    deletePostList,
    isDeleting,
    deleteError,
  } = useSelector((state) => ({
    ...state.thread,
    isAuthenticated: state.auth.isAuthenticated,
    authenticatedUsername: state.auth.username,
    authenticatedIsStaff: state.auth.isStaff,
  }));

  const dispatch = useDispatch();
  const { thread } = useParams();

  useEffect(() => {
    dispatch(fetchThread(thread));
  }, [thread, dispatch]);

  return (
    <Thread
      id={thread}
      isLoading={isLoading}
      name={name}
      content={content}
      pinned={pinned}
      creator={creator}
      createdAt={createdAt}
      posts={posts}
      error={error}
      isAuthenticated={isAuthenticated}
      createPost={(newPost) => dispatch(createPost(newPost))}
      newPostSuccess={newPostSuccess}
      newPostLoading={newPostLoading}
      newPostError={newPostError}
      authenticatedUsername={authenticatedUsername}
      authenticatedIsStaff={authenticatedIsStaff}
      deletePostList={deletePostList}
      deletePost={(id, threadID) => dispatch(deletePost(id, threadID))}
      isDeleting={isDeleting}
      deleteError={deleteError}
      deleteThread={(id) => dispatch(deleteThread(id))}
    />
  );
};

export default ThreadContainer;
