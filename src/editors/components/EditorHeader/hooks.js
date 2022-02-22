import React from 'react';
import * as module from './hooks';

export const hooks = {
  isEditing: () => {
    const [isEditing, setIsEditing] = React.useState(false);
    return {
      isEditing,
      startEditing: () => setIsEditing(true),
      stopEditing: () => setIsEditing(false),
    };
  },
  localTitle: ({
    setBlockTitle,
    stopEditing,
    typeHeader,
  }) => {
    const [localTitle, setLocalTitle] = React.useState(typeHeader);
    return {
      updateTitle: () => {
        setBlockTitle(localTitle);
        stopEditing();
      },
      handleChange: (e) => setLocalTitle(e.target.value),
      localTitle,
    };
  },
  handleKeyDown: ({ stopEditing, editorRef }) => (e) => {
    if (e.key === 'Enter') {
      stopEditing();
    }
    if (e.key === 'Tab' && editorRef) {
      e.preventDefault();
      editorRef.current.focus();
    }
  },
};

/* eslint-disable import/prefer-default-export */
export const localTitleHooks = ({
  editorRef,
  setBlockTitle,
  typeHeader,
}) => {
  const { isEditing, startEditing, stopEditing } = module.hooks.isEditing();
  const { localTitle, handleChange, updateTitle } = module.hooks.localTitle({
    setBlockTitle,
    stopEditing,
    typeHeader,
  });
  return {
    isEditing,
    startEditing,
    stopEditing,

    localTitle,
    updateTitle,
    handleChange,

    inputRef: React.createRef(),
    handleKeyDown: module.hooks.handleKeyDown({ stopEditing, editorRef }),
  };
};
