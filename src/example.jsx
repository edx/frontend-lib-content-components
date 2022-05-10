/**
 * This is an example component for an xblock Editor
 * It uses pre-existing components to handle the saving of a the result of a function into the xblock's data.
 * To use run npm run-script addXblock <your>
 */

/* eslint-disable no-unused-vars */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Spinner } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import EditorContainer from './editors/containers/EditorContainer';
import * as module from '.';
import { actions, selectors } from './editors/data/redux';
import { RequestKeys } from './editors/data/constants/requests';

export const hooks = {
  getContent: () => ({
    some: 'content',
  }),
};

export const ExampleEditor = ({
  onClose,
  // redux
  blockValue,
  lmsEndpointUrl,
  blockFailed,
  blockFinished,
  initializeEditor,
  // inject
  intl,
}) => (
  <EditorContainer
    getContent={module.hooks.getContent}
    onClose={onClose}
  >
    <div className="editor-body h-75 overflow-auto">
      {!blockFinished
        ? (
          <div className="text-center p-6">
            <Spinner
              animation="border"
              className="m-3"
              // Use a messages.js file for intl messages.
              screenreadertext={intl.formatMessage('Loading Spinner')}
            />
          </div>
        )
        : (
          <p>
            Your Editor Goes here.
            You can get at the xblock data with the blockValue field.
            here is what is in your xblock:  {JSON.stringify(blockValue)}
          </p>
        )}
    </div>
  </EditorContainer>
);
ExampleEditor.defaultProps = {
  blockValue: null,
  lmsEndpointUrl: null,
};
ExampleEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  // redux
  blockValue: PropTypes.shape({
    data: PropTypes.shape({ data: PropTypes.string }),
  }),
  lmsEndpointUrl: PropTypes.string,
  blockFailed: PropTypes.bool.isRequired,
  blockFinished: PropTypes.bool.isRequired,
  initializeEditor: PropTypes.func.isRequired,
  // inject
  intl: intlShape.isRequired,
};

export const mapStateToProps = (state) => ({
  blockValue: selectors.app.blockValue(state),
  lmsEndpointUrl: selectors.app.lmsEndpointUrl(state),
  blockFailed: selectors.requests.isFailed(state, { requestKey: RequestKeys.fetchBlock }),
  blockFinished: selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchBlock }),
});

export const mapDispatchToProps = {
  initializeEditor: actions.app.initializeEditor,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ExampleEditor));