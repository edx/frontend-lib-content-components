import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow, Dropdown, Form, Icon, IconButton,
} from '@edx/paragon';
import { Close, Search } from '@edx/paragon/icons';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import { sortKeys, sortMessages } from './utils';
import messages from './messages';

export const SearchSort = ({
  searchString,
  onSearchChange,
  clearSearchString,
  sortBy,
  onSortClick,
  // injected
  intl,
}) => (
  <ActionRow>
    <Form.Group style={{ margin: 0 }}>
      <Form.Control
        autoFocus
        onChange={onSearchChange}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        trailingElement={
            searchString
              ? (
                <IconButton
                  iconAs={Icon}
                  invertColors
                  isActive
                  onClick={clearSearchString}
                  size="sm"
                  src={Close}
                />
              )
              : <Icon src={Search} />
          }
        value={searchString}
      />
    </Form.Group>
    <ActionRow.Spacer />
    <Dropdown>
      <Dropdown.Toggle id="img-sort-button" variant="tertiary">
        <FormattedMessage {...sortMessages[sortBy]} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {Object.keys(sortKeys).map(key => (
          <Dropdown.Item key={key} onClick={onSortClick(key)}>
            <FormattedMessage {...sortMessages[key]} />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </ActionRow>
);

SearchSort.propTypes = {
  searchString: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  clearSearchString: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(SearchSort);
