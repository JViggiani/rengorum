import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {getSelectedBlock} from 'draftjs-utils';
import htmlToDraft from 'html-to-draftjs';
import {List} from 'immutable';
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
  Modifier,
} from 'draft-js';
import {Form, Icon, Divider, Button} from 'semantic-ui-react';
import './styles.css';
import RichEditor from '../richeditor';
import StatusMessage from '../statusmessage';

const NewThread = (props) => {
  console.log("JOSH - NewThread ==START==");
  console.log("JOSH - props: " + JSON.stringify(props));
  const {name: initialName, content: initialContent} = props;

  const convertToEditorState = (content) => {
    let editorState = EditorState.createEmpty();
    if (content) {
      try {
        const contentState = convertFromRaw(JSON.parse(content));
        editorState = EditorState.createWithContent(contentState);
      } catch (error) {
        const contentState = ContentState.createFromText(content);
        editorState = EditorState.createWithContent(contentState);
      }
    }
    return editorState;
  };

  const [name, setName] = useState(initialName);
  const [editorState, setEditorState] = useState(convertToEditorState(initialContent));

  useEffect(() => {
    setEditorState(convertToEditorState(props.content));
    setName(props.name);
  }, [props.content, props.name]);

  const toggleShowEditor = useCallback(() => {
    props.toggleShowEditor();
  }, [props]);

  const onSave = useCallback(() => {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      props.updateNewThread({
        name: name,
        content: content,
      });
      toggleShowEditor();
  }, [editorState, name, props]);

  const onCancel = useCallback(() => {
    const emptyEditorState = EditorState.createEmpty();
    setName('');
    setEditorState(emptyEditorState);
    const content = JSON.stringify(
      convertToRaw(emptyEditorState.getCurrentContent()),
    );
    props.updateNewThread({
      name: '',
      content: content,
    });
    toggleShowEditor();
  }, [props, toggleShowEditor]);

  const onNameChange = useCallback((e, {value}) => {
    setName(value);
  }, []);

  const onEditorStateChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  const isFormValid = useCallback(() => {
    return name;
  }, [name]);


  const onSubmit = useCallback(() => {
    if (isFormValid()) {
      const {forum, createThread} = props;
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent()),
      );
      let newThread = {
        name: name,
        forum: forum,
        content: content,
      };
      console.log("JOSH - onSubmit newThread: " + JSON.stringify(newThread));
      createThread(newThread);
    }
  }, [isFormValid, name, editorState, props]);

  const isValidLength = useCallback((contentState) => {
    const maxLength = props.maxLength || 100;
    return contentState.getPlainText('').length <= maxLength;
  }, [props.maxLength]);

  const handleBeforeInput = useCallback(input => {
    if (!isValidLength(editorState.getCurrentContent())) {
      return 'handled';
    }
  }, [editorState, isValidLength]);

  const handlePastedText = useCallback((text, html) => {
    if (html) {
      const contentBlock = htmlToDraft(html);
      let contentState = editorState.getCurrentContent();
      contentBlock.entityMap.forEach((value, key) => {
        contentState = contentState.mergeEntityData(key, value);
      });
      contentState = Modifier.replaceWithFragment(
        contentState,
        editorState.getSelection(),
        new List(contentBlock.contentBlocks),
      );
      if (!isValidLength(contentState)) {
        return 'handled';
      }
      setEditorState(EditorState.push(editorState, contentState, 'insert-characters'));
      return true;
    }
    const selectedBlock = getSelectedBlock(editorState);
    const newState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle(),
    );
    if (!isValidLength(newState)) {
      return 'handled';
    }
    setEditorState(EditorState.push(editorState, newState, 'insert-characters'));
    if (selectedBlock && selectedBlock.type === 'code') {
      return true;
    }
    return false;
  }, [editorState, isValidLength]);


  ///

    const {
      isAuthenticated,
      isLoading,
      success,
      id,
      error,
      showEditor,
    } = props;

    if (!isAuthenticated) {
      return <div className="newThread-none" />;
    }

    const statusMessage = (
      <StatusMessage
        error={error}
        errorClassName="newThread-message"
        errorMessage={error || 'Oops! Something went wrong.'}
        success={success}
        successClassName="newThread-message"
        successMessage={
          <Link to={`/thread/${id}`}>{'Successful on creating thread'}</Link>
        }
        type="modal"
      />
    );

    if (!showEditor) {
      return (
        <div>
          {statusMessage} {/*this will only show the success message*/}
          <div className="newThread-hidden">
            <Button
              size="small"
              color="blue"
              floated="left"
              onClick={toggleShowEditor}>
              <Icon name="edit" />
              New Thread
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="newThread-show">
        {statusMessage}
        <Form loading={isLoading} className="attached fluid segment">
          <Form.Input
            required
            fluid
            transparent
            icon="edit"
            iconPosition="left"
            size="big"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={onNameChange}
          />
          <Divider />
          <RichEditor
            placeholder="Start typing your thread content here..."
            editorState={editorState}
            wrapperClassName="newThread-wrapper"
            toolbarClassName="newThread-toolbar"
            editorClassName="newThread-editor"
            onEditorStateChange={onEditorStateChange}
            handleBeforeInput={handleBeforeInput}
            handlePastedText={handlePastedText}
          />
          <Button
            color="blue"
            size="small"
            loading={isLoading}
            disabled={isLoading}
            onClick={onSubmit}>
            <Icon name="edit" />
            Post thread
          </Button>
          <Button
            color="red"
            role="none"
            size="small"
            disabled={isLoading}
            onClick={onSave}>
            <Icon name="save" />
            Save Draft
          </Button>
          <Button
            role="none"
            size="small"
            disabled={isLoading}
            onClick={onCancel}>
            <Icon name="cancel" />
            Clear
          </Button>
        </Form>
      </div>
    );
}

export default NewThread;