import React from 'react';

import { Form } from '@edx/paragon';

import { EditorPage } from '@edx/frontend-lib-content-components';

export const EditorGallery = () => {
  const [blockType, setBlockType] = React.useState('html');
  const blockIds = {
    html: 'html-block-id',
    video: 'video-block-id',
    problem: 'problem-block-id',
  };
  const courseId = 'fake-course-id';
  const studioEndpointUrl = 'fake-studio-endpoint-url';
  const handleChange = (e) => setBlockType(e.target.value);
  return (
    <div className="gallery">
      <Form.Group>
        <Form.RadioSet
          name="blockTypes"
          onChange={handleChange}
          value={blockType}
        >
          <Form.Radio value="html">Text</Form.Radio>
          <Form.Radio value="video">Video</Form.Radio>
          <Form.Radio value="problem">Problem</Form.Radio>
        </Form.RadioSet>
      </Form.Group>
      <EditorPage
        {...{
          blockId: blockIds[blockType],
          blockType,
          courseId,
          studioEndpointUrl,
        }}
      />
    </div>
  );
};

export default EditorGallery;
