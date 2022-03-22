import {
  useRef, useEffect, useCallback, useState,
} from 'react';

import { StrictDict } from './utils';
import * as module from './hooks';

export const state = StrictDict({
  refReady: (val) => useState(val),
});

export const initializeApp = ({ initialize, data }) => useEffect(
  () => initialize(data),
  [],
);

export const prepareEditorRef = () => {
  const editorRef = useRef(null);
  const setEditorRef = useCallback((ref) => {
    editorRef.current = ref;
  }, []);
  const [refReady, setRefReady] = module.state.refReady(false);
  useEffect(() => setRefReady(true), []);
  return { editorRef, refReady, setEditorRef };
};

export const navigateTo = (destination) => {
  window.location.assign(destination);
};

export const navigateCallback = (destination) => () => module.navigateTo(destination);

export const saveBlock = ({
  editorRef,
  returnUrl,
  saveFunction,
}) => {
  saveFunction({
    returnToUnit: module.navigateCallback(returnUrl),
    content: editorRef.current.getContent(),
  });
};

// for toast onClose to avoid console warnings
export const nullMethod = () => {};
