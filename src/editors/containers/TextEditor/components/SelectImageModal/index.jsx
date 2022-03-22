import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Stack } from '@edx/paragon';
import { Add } from '@edx/paragon/icons';

import { thunkActions } from '../../../../data/redux';
import hooks from './hooks';
import BaseModal from '../BaseModal';
import ErrorAlert from './ErrorAlert';
import SearchSort from './SearchSort';
import Gallery from './Gallery';

export const SelectImageModal = ({
  fetchImages,
  uploadImage,
  isOpen,
  close,
  setSelection,
}) => {
  const {
    imgList,
    searchString, setSearchString,
    sortFilter, setSortFilter,
    highlighted, setHighlighted,
    addFileRef,
    addFileClick,
    addFile,
    onConfirmSelection,
    loading,
    error, setError,
  } = hooks.imgHooks({ fetchImages, uploadImage, setSelection });

  return (
    <BaseModal
      close={close}
      confirmAction={(
        <Button
          variant="primary"
          onClick={onConfirmSelection}
          disabled={!highlighted}
        >
          Next
        </Button>
      )}
      handleUpload={addFileClick}
      isOpen={isOpen}
      footerAction={(
        <Button iconBefore={Add} onClick={addFileClick} variant="link">
          Upload a new image
        </Button>
      )}
      showUploadButton
      title="Add an image"
    >
      <Stack gap={3}>
        <SearchSort {...hooks.searchSortProps} />
        <Gallery {...hooks.galleryHooks} />
        <input
          accept=".gif,.jpg,.jpeg,.png,.tif,.tiff"
          className="upload d-none"
          onChange={e => addFile(e.target.files[0])}
          ref={addFileRef}
          type="file"
        />
      </Stack>
    </BaseModal>
  );
};

SelectImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
  // redux
  fetchImages: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({});
export const mapDispatchToProps = {
  fetchImages: thunkActions.app.fetchImages,
  uploadImage: thunkActions.app.uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectImageModal);