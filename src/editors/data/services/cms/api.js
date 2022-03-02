import * as urls from './urls';
import { get, post } from './utils';
import * as module from './api';
import * as mockApi from './mockApi';

export const apiMethods = {
  fetchBlockById: ({ blockId, studioEndpointUrl }) => get(
    urls.block({ blockId, studioEndpointUrl }),
  ),
  fetchByUnitId: ({ blockId, studioEndpointUrl }) => get(
    urls.blockAncestor({ studioEndpointUrl, blockId }),
  ),
  normalizeContent: ({
    blockId,
    blockType,
    content,
    courseId,
    title,
  }) => {
    if (blockType === 'html') {
      return {
        category: blockType,
        couseKey: courseId,
        data: content,
        has_changes: true,
        id: blockId,
        metadata: { display_name: title },
      };
    }
    throw new TypeError(`No Block in V2 Editors named /"${blockType}/", Cannot Save Content.`);
  },
  saveBlock: ({
    blockId,
    blockType,
    content,
    courseId,
    studioEndpointUrl,
    title,
  }) => post(
    urls.block({ studioEndpointUrl, blockId }),
    module.apiMethods.normalizeContent({
      blockType,
      content,
      blockId,
      courseId,
      title,
    }),
  ),
};

export const checkMockApi = (key) => {
  if (process.env.REACT_APP_DEVGALLERY) {
    console.log('use devgallery api methods');
    return mockApi[key];
  }
  return module.apiMethods[key];
};

export default Object.keys(apiMethods).reduce(
  (obj, key) => ({ ...obj, [key]: checkMockApi(key) }),
  {},
);
