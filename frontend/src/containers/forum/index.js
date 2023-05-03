import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  createThreadSave,
  createThreadToggle,
  fetchForum,
  createThread,
} from '../../actions';
import ThreadList from '../../components/threadlist';
import NewThread from '../../components/newthread';
import { useParams } from 'react-router-dom';

const ForumContainer = (props) => {
  const { forum } = useParams();

  useEffect(() => {
    props.fetchForum(forum);
  }, [forum, props]);

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
    createThread,
    createThreadSave,
    createThreadToggle,
  } = props;

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
        createThread={createThread}
        updateNewThread={createThreadSave}
        toggleShowEditor={createThreadToggle}
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


const mapStateToProps = state => ({
  isLoading: state.forum.isLoading,
  name: state.forum.name,
  slug: state.forum.slug,
  description: state.forum.description,
  threads: state.forum.threads,
  error: state.forum.error,
  isAuthenticated: state.auth.isAuthenticated,
  newThreadLoading: state.forum.newThreadLoading,
  newThreadSuccess: state.forum.newThreadSuccess,
  newThreadName: state.forum.newThreadName,
  newThreadContent: state.forum.newThreadContent,
  newThreadId: state.forum.newThreadId,
  newThreadError: state.forum.newThreadError,
  newThreadShow: state.forum.newThreadShow,
});

const mapDispatchToProps = dispatch => ({
  fetchForum: forum => {
    dispatch(fetchForum(forum));
  },
  createThread: newThread => {
    dispatch(createThread(newThread));
  },
  createThreadSave: newThread => {
    dispatch(createThreadSave(newThread));
  },
  createThreadToggle: () => {
    dispatch(createThreadToggle());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForumContainer);
