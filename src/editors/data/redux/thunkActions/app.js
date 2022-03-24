import { StrictDict, camelizeKeys } from '../../../utils';
import { actions } from '..';
import * as requests from './requests';
import * as module from './app';

export const fetchBlock = () => (dispatch) => {
  dispatch(requests.fetchBlock({
    onSuccess: (response) => dispatch(actions.app.setBlockValue(response)),
    onFailure: (e) => dispatch(actions.app.setBlockValue(e)),
  }));
};

export const fetchUnit = () => (dispatch) => {
  dispatch(requests.fetchUnit({
    onSuccess: (response) => dispatch(actions.app.setUnitUrl(response)),
    onFailure: (e) => dispatch(actions.app.setUnitUrl(e)),
  }));
};

/**
 * @param {string} studioEndpointUrl
 * @param {string} blockId
 * @param {string} courseId
 * @param {string} blockType
 */
export const initialize = (data) => (dispatch) => {
  dispatch(actions.app.initialize(data));
  dispatch(module.fetchBlock());
  dispatch(module.fetchUnit());
};

/**
 * @param {func} onSuccess
 */
export const saveBlock = ({ content, returnToUnit }) => (dispatch) => {
  dispatch(actions.app.setBlockContent(content));
  dispatch(requests.saveBlock({
    content,
    onSuccess: (response) => {
      dispatch(actions.app.setSaveResponse(response));
      returnToUnit();
    },
  }));
};

<<<<<<< HEAD
export const fetchImages = ({ onSuccess, stopLoading }) => () => {
  // get images
  const processedData = Array.from(mockData.mockImageData, el => {
    const jsDate = new Date(el.dateAdded.replace(' at', '')).getTime();
    return {
      ...el,
      jsDate,
    };
  });
  stopLoading();
  return onSuccess(processedData);
};

export const uploadImage = ({
  file, startLoading, stopLoading, resetFile, setError,
}) => () => {
  // input file
  // lastModified: 1643131112097
  // lastModifiedDate: Tue Jan 25 2022 12:18:32 GMT-0500 (Eastern Standard Time) {}
  // name: "Profile.jpg"
  // size: 21015
  // type: "image/jpeg"

  // api will respond with the following JSON
  // {
  //   "asset": {
  //     "display_name": "journey_escape.jpg",
  //     "content_type": "image/jpeg",
  //     "date_added": "Jan 05, 2022 at 21:26 UTC",
  //     "url": "/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg",
  //     "external_url": "https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg",
  //     "portable_url": "/static/journey_escape.jpg",
  //     "thumbnail": "/asset-v1:edX+test101+2021_T1+type@thumbnail+block@journey_escape.jpg",
  //     "locked": false,
  //     "id": "asset-v1:edX+test101+2021_T1+type@asset+block@journey_escape.jpg"
  //   },
  //   "msg": "Upload completed"
  // }

  console.log(file);
  startLoading();
  setTimeout(() => {
    stopLoading();
    resetFile();
    setError('test error');
  }, 5000);
  return null;
=======
>>>>>>> 5067226 (feat: use redux for loading)
export const fetchImages = ({ onSuccess }) => (dispatch) => {
  dispatch(requests.fetchImages({
    onSuccess: (response) => onSuccess(camelizeKeys(response.data.assets)),
    onFailure: (e) => onSuccess(e),
  }));
};

export const uploadImage = ({ image, setSelected }) => (dispatch) => {
  dispatch(requests.uploadImage({
    image,
    onSuccess: () => setSelected(image),
  }));
};

export default StrictDict({
  fetchBlock,
  fetchUnit,
  initialize,
  saveBlock,
  fetchImages,
  uploadImage,
});
