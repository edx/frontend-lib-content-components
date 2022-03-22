import React from 'react';
import * as module from './hooks';
import * as sortUtils from './sortUtils';

export const state = {
  images: (val) => React.useState(val),
  highlighted: (val) => React.useState(val),
  searchString: (val) => React.useState(val),
  sortFilter: (val) => React.useState(val),
  loading: (val) => React.useState(val),
  error: (val) => React.useState(val),
};

export const getFilteredImages = (images, searchString, sortBy) => {
  const list = images.filter(img => img.displayName.toLowerCase().includes(searchString.toLowerCase()));
  let sorted = false;
  Object.keys(sortOptions).forEach((key) => {
    if (sortBy === sortOptions[key]) {
      list.sort(sortUrils[key]);
    }
  });
  if (!sorted) {
    list.sort(sortUtils.dateNewest);
  }
  switch (sortBy) {
    case 'By date added (newest)':
      list.sort(sortUtils.dateNewest);
      break;
    case 'By date added (oldest)':
      list.sort(sortUtils.dateOldest);
      break;
    case 'By name (ascending)':
      list.sort(sortUtils.nameAscending);
      break;
    case 'By name (descending)':
      list.sort(sortUtils.nameDescending);
      break;
    default:
      list.sort(sortUtils.dateNewest);
      break;
  }
  return list;
};

export const getImg = (imgId, imgList) => imgList.find(img => img.id === imgId);

export const selection = () => {
  const [images, setImages] = module.state.images([]);
  const [highlighted, setHighlighted] = module.state.highlighted(null);
  
  return {
    images,
    setImages,
    highlighted,
    setHighlighted,
  }
};

export const searchAndSort = () => {
  const [searchString, setSearchString] = module.state.searchString('');
  const [sortFilter, setSortFilter] = module.state.sortFilter(sortOptions.dateAscending);
  return { searchString, setSearchString, sortFilter, setSortFilter }
};

export const imgHooks = ({ fetchImages, uploadImage, setSelection }) => {
  const selection = module.selection();
  const searchSortProps = module.searchAndSort();

  const addFileRef = React.useRef();
  const { loading, startLoading, stopLoading } = module.loadingHooks();
  const { error, setError } = module.errorHooks();

  React.useEffect(() => {
    fetchImages({ onSuccess: setImages, stopLoading });
    stopLoading();
  }, []);

  return {
    imgList: getFilteredImages(images, searchString, sortFilter),
    galleryProps: {
      highlighted: selection.highlighted,
      imgList: selection.imgList,
      loading,
      setHilighted: selection.setHighlighted,
    },
    searchSortProps,

    searchString,
    setSearchString,
    sortFilter,
    setSortFilter,
    highlighted,
    setHighlighted,
    addFileRef,
    addFileClick: () => addFileRef.current.click(),
    onFileSubmit: (e) => {
      const file = e.target.files[0];
      return uploadImage({
        file,
        startLoading,
        stopLoading,
        resetFile: () => {
          addFileRef.current.value = '';
        },
        setError,
      });
    },
    onConfirmSelection: () => setSelection(getImg(highlighted, images)),
    loading,
    error,
    setError,
  };
};

export const loadingHooks = () => {
  const [loading, setLoading] = module.state.loading(true);
  return {
    loading,
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
  };
};

export const errorHooks = () => {
  const [error, setError] = module.state.error(null);
  return {
    error,
    setError,
  };
};

export default {
  imgHooks,
};