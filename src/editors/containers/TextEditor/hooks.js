import {
  useRef, useEffect, useCallback, useState,
} from 'react';

import { StrictDict } from '../../utils';
import tinyMCE from '../../data/constants/tinyMCE';
import pluginConfig from './pluginConfig';
import * as appHooks from '../../hooks';
import * as module from './hooks';

export const { nullMethod, navigateCallback, navigateTo } = appHooks;

export const state = StrictDict({
  isModalOpen: (val) => useState(val),
  imageSelection: (val) => useState(val),
  refReady: (val) => useState(val),
});

/**
 * Create A function which takes in a tinyMCE editor instance and adds custom
 * features to the toolbars and UI.
 *
 * @param {openModal} func - a function which opens the custom image modal.
 * @param {setImage} func - a function which sets the current image selected in the image modal.
 * @return {func} - takes in a tinyMCE editor instance and adds custom
 * features to the toolbars and UI.
 */

export const setupCustomBehavior = ({ openModal, setImage }) => (editor) => {
  // image upload button
  editor.ui.registry.addButton(tinyMCE.buttons.imageUploadButton, {
    icon: 'image',
    onAction: openModal,
  });
  // editing an existing image
  editor.ui.registry.addButton(tinyMCE.buttons.editImageSettings, {
    icon: 'image',
    onAction: module.openModalWithSelectedImage({ editor, setImage, openModal }),
  });
  // overriding the code plugin's icon with 'HTML' text
  const openCodeEditor = () => editor.execCommand('mceCodeEditor');
  editor.ui.registry.addButton(tinyMCE.buttons.code, {
    text: 'HTML',
    tooltip: 'Source code',
    onAction: openCodeEditor,
  });
};

/**
 * Setup tinyMCE editor with chosen inputs
 *
 * @param {setEditorRef} func - a function which sets the higher-level reference to the editor.
 * @param {blockValue} object - the xblock object which contains the html.
 * @param {openModal} func - a function which opens the custom image modal.
 * @param {setSelection} func - a function which sets the current image selected in the image modal.
 * @param {initializeEditor} func - a function which tells the higher level data abstraction
 * the editor is ready to be displayed.
 */

export const editorConfig = ({
  setEditorRef,
  blockValue,
  openModal,
  initializeEditor,
  setSelection,
}) => ({
  onInit: (evt, editor) => {
    setEditorRef(editor);
    initializeEditor();
  },
  initialValue: blockValue ? blockValue.data.data : '',
  init: {

    setup: module.setupCustomBehavior({ openModal, setImage: setSelection }),
    plugins: pluginConfig.plugins,
    imagetools_toolbar: pluginConfig.imageToolbar,
    toolbar: pluginConfig.toolbar,
    contextmenu: 'link table',
    ...pluginConfig.config,
    valid_elements: '*[*]',
  },
});

/**
 * A stateful toggle for opening/closing a modal.
 * @return {object} - An with toggle open/closed functions and a state reference.
 *
 * usage:
 *   const {isModalOpen: isOpen, openModal, closeModal} = modalToggle();
 *   openModal();
 *   closeModal();
 */

export const modalToggle = () => {
  const [isOpen, setIsOpen] = module.state.isModalOpen(false);
  return {
    isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  };
};

/**
 * Creates a function which opens the image modal with the selected image when called.
 *
 * @param {editor} object - a tinyMCE editor
 * @param {openModal} func - a function which opens the custom image modal.
 * @param {setImage} func - a function which sets the current image selected in the image modal.
 *
 * @return {func} - An with toggle open/closed functions and a state reference.
 *
 * usage:
 *   const openModal= openModalWithSelectedImage ({editor: currentMCE, setImage, openModal})
 *   openModal();
 */

export const openModalWithSelectedImage = ({ editor, setImage, openModal }) => () => {
  const imgHTML = editor.selection.getNode();
  setImage({
    externalUrl: imgHTML.src,
    altText: imgHTML.alt,
    width: imgHTML.width,
    height: imgHTML.height,
  });
  openModal();
};

export const prepareEditorRef = () => {
  const editorRef = useRef(null);
  const setEditorRef = useCallback((ref) => {
    editorRef.current = ref;
  }, []);
  const [refReady, setRefReady] = module.state.refReady(false);
  useEffect(() => setRefReady(true), []);
  return { editorRef, refReady, setEditorRef };
};

/**
 * Creates a function which returns the HTML content of the tinyMCE Editor
 *
 * @param {editorRef} object - a reference to the tinyMCE editor instance in the DOM
 * @return {func} - a function which returns the content of the editor.
 */

export const getContent = ({ editorRef }) => () => editorRef.current?.getContent();

export const selectedImage = (val) => {
  const [selection, setSelection] = module.state.imageSelection(val);
  return {
    clearSelection: () => setSelection(null),
    selection,
    setSelection,
  };
};
