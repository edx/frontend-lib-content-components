import * as urls from './urls';

const mockPromise = (returnValue) => new Promise(resolve => resolve(returnValue));

export const fetchBlockById = ({ blockId, studioEndpointUrl }) => mockPromise({
  data: {
    data: '<p>Test prompt content</p>',
    display_name: 'My Text Prompt',
  },
});

export const fetchByUnitId = ({ blockId, studioEndpointUrl }) => mockPromise({
  data: { ancestors: [{ id: 'unitUrl' }] },
});

export const normalizeContent = ({
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
};

export const saveBlock = ({
  blockId,
  blockType,
  content,
  courseId,
  studioEndpointUrl,
  title,
}) => mockPromise({
  url: urls.block({ studioEndpointUrl, blockId }),
  content: normalizeContent({
    blockType,
    content,
    blockId,
    courseId,
    title,
  }),
});